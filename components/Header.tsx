"use client";

import { useRouter } from "next/navigation";
import {twMerge} from 'tailwind-merge';
import {RxCaretLeft, RxCaretRight} from 'react-icons/rx';
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import usePlayer from "@/hooks/usePlayer";

interface HeaderProps {
    children: React.ReactNode;
    className?:string;
}

const Header:React.FC<HeaderProps> = ({
    children,
    className
}) => {
    const authModal = useAuthModal();
    const router = useRouter();
    const player = usePlayer();

    const supabaseClient = useSupabaseClient();
    const { user } = useUser();

    const handleLogout = async ()=> {
        const {error} = await supabaseClient.auth.signOut();
        player.reset();
        router.refresh();

        if(error){
            toast.error(error.message);
        }else{
            toast.success('Logged out successfully!')
        }
    }

    return ( 
        <div className={twMerge(`
        h-fit bg-gradient-to-b from-emerald-800 p-6`, className)} >
            <div className="w-full flex mb-4 items-center justify-between">
                <div
                className="hidden md:flex gap-x-2 items-center">
                    <motion.button onClick={()=> router.back()} whileHover={{scale:1.1}}
                    className="rounded-full bg-black flex items-center justify-center 
                    hover:opacity-75 transition">
                        <RxCaretLeft className="text-white" size={30} />
                    </motion.button>
                    <motion.button onClick={()=> router.forward()} whileHover={{scale:1.1}}
                    className="rounded-full bg-black flex items-center justify-center 
                    hover:opacity-75 transition">
                        <RxCaretRight className="text-white" size={30} />
                    </motion.button>
                </div>
                <div className="flex md:hidden gap-x-2 items-center">
                    <button className="rounded-full p-2 bg-white flex items-center justify-center
                hover:opacity-75 transition">
                    <HiHome className="text-black" size={20}/>
                    </button>
                    <button className="rounded-full p-2 bg-white flex items-center justify-center
                hover:opacity-75 transition">
                    <BiSearch className="text-black" size={20}/>
                    </button>
                </div>
                <div className="flex justify-between items-center gap-x-4">    
                        <motion.img src="/images/mysite.ico" alt="my site" height={40} width={40} 
                        drag dragSnapToOrigin
                        whileDrag={{scale:1.8}}
                        whileHover={{scale:1.2}}
                        className="rounded-full cursor-pointer"
                        onDoubleClick={()=> window.open("https://portfolio-ndt.vercel.app/", "_blank")}/>     
                    {user? ( 
                        <div className="flex gap-x-4 items-center">
                            <Button onClick={handleLogout} 
                            className="bg-white px-5 py-2 hover:opacity-75"> 
                                Logout
                            </Button>
                            <motion.div whileHover={{scale:1.1}}>
                            <Button onClick={() => router.push('/account')} className="bg-white">
                                <FaUserAlt/>
                            </Button>
                            </motion.div>
                            
                        </div>
                    ) : (
                    <>
                        <div>
                            <Button onClick={authModal.onOpen}
                            className="bg-transpartent text-neutral-300 font-medium">
                                Sign up
                            </Button>
                        </div>
                        <div>
                            <Button onClick={authModal.onOpen}
                            className="bg-white px-2 py-1">
                                Log in
                            </Button>
                        </div>
                    </>
                    )}
                </div>
            </div>
            {children}
        </div>
     );
}
 
export default Header;