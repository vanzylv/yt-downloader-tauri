import { IconDownload, IconHeart, IconInfoCircle } from '@tabler/icons-react'
import { ActionIcon } from '@mantine/core'
import { downloadVideo } from '../../tauri/commands.ts'
import { useContext, useState } from 'react'
import {
    NotificationContext,
    NotificationContextType,
    NotificationType,
} from '../../context/NotificationContext.tsx'

const VideoControls = ({ video }: { video: Video }) => {
    const { displayNotification } =
        useContext<NotificationContextType>(NotificationContext)
    const [loading, setLoading] = useState(false)
    const startDownload = async () => {
        //convert to hook
        try {
            displayNotification(
                NotificationType.notice,
                `${video.title} is downloading...`
            )
            setLoading(true)
            await downloadVideo(video)
            displayNotification(NotificationType.success, `Download complete`)
        } catch (ex) {
            displayNotification(
                NotificationType.error,
                `Error downloading ${video.title}`
            )
            console.error(ex)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="video-controls">
            <ActionIcon variant="subtle" size="md">
                <IconHeart />
            </ActionIcon>
            <ActionIcon
                onClick={() => startDownload()}
                variant="subtle"
                size="md"
                loading={loading}
            >
                <IconDownload />
            </ActionIcon>
            <ActionIcon variant="subtle" size="md">
                <IconInfoCircle />
            </ActionIcon>
        </div>
    )
}

export default VideoControls
