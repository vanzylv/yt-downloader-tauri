import { createContext, ReactNode, useContext } from 'react'
import { downloadVideo as downloadVideCommand } from '../tauri/commands.ts'
import {
    NotificationContext,
    NotificationContextType,
    NotificationType,
} from './NotificationContext.tsx'

export type VideoContextType = {
    downloadVideo: (video: Video, loadingCallback: (b: boolean) => void) => void
}
export const VideoContext = createContext<VideoContextType>({
    downloadVideo: () => {},
})

export const VideoContextProvider = ({ children }: { children: ReactNode }) => {
    const { displayNotification } =
        useContext<NotificationContextType>(NotificationContext)
    const downloadVideo = async (
        video: Video,
        loadingCallback: (b: boolean) => void
    ) => {
        try {
            loadingCallback(true)
            displayNotification(
                NotificationType.notice,
                `Downloading ${video.title}...`
            )
            await downloadVideCommand(video)
        } catch (e) {
            console.error(e)
            displayNotification(NotificationType.error, 'Downloading video')
        } finally {
            loadingCallback(false)
            displayNotification(
                NotificationType.success,
                `Downloading complete ${video.title}...`
            )
        }
    }

    return (
        <VideoContext.Provider
            value={{
                downloadVideo,
            }}
        >
            {children}
        </VideoContext.Provider>
    )
}
