import { invoke } from '@tauri-apps/api'
import filenamify from 'filenamify'

export const downloadVideo = async (video: Video) => {
    const { id } = video
    await invoke('download', {
        id,
        fileName: `${filenamify(video.title)}.mp4`,
    })
}
