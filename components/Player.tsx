"use client";
import usePlayer from '@/hooks/usePlayer';
import useGetSongById from '@/hooks/useGetSongById';
import useLoadSongUrl from '@/hooks/useLoadSongUrl';
import PlayerContent from './PlayerContent';

const Player = () => {
    const player = usePlayer();
    const {song} = useGetSongById(player.activeId);
    const songUrl = useLoadSongUrl(song!);

    if(!song || !songUrl || !player.activeId){
        return null;
    }
    return (
        <div className='fixed bottom-0 py-2 w-full h-[80px] px-4 rounded-full
         bg-gradient-to-t from-emerald-900 p-6'>
            <PlayerContent
            key={songUrl}
            song={song}
            songUrl={songUrl}/>
        </div>
     );
}
 
export default Player;