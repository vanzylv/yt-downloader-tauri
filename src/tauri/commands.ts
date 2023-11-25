import { invoke } from '@tauri-apps/api'
import filenamify from 'filenamify'
import { Video } from '../types/api.ts'

export const downloadVideo = async (video: Video) => {
    const { id } = video
    await invoke('download', {
        id,
        fileName: `${filenamify(video.title)}.mp4`,
    })
}

export const searchVideos = async (searchText: string): Promise<Video[]> => {
    return await invoke('search', { query: searchText })
}

export const openFolder = async (path: string) => {
    return await invoke('show_in_folder', {path})
}
