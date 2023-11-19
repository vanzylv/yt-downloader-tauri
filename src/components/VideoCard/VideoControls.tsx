import { IconDownload, IconHeart, IconInfoCircle } from '@tabler/icons-react'
import { ActionIcon } from '@mantine/core'
import { invoke } from '@tauri-apps/api'

const VideoControls = () => {
    const startDownload = async () => {
        await invoke('download', {
            id: 'FZ8BxMU3BYc',
            downloadDir: '/Users/Viklass/Downloads',
        })
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
