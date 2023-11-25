import { invoke } from '@tauri-apps/api'
import filenamify from 'filenamify'

export const downloadVideo = async (video: Video) => {
    const { id } = video
    await invoke('download', {
        id,
        fileName: `${filenamify(video.title)}.mp4`,
    })
}

export const searchVideos = async (searchText: string) : Promise<Video[]> => {
    return await invoke('search', { query: searchText })
}
