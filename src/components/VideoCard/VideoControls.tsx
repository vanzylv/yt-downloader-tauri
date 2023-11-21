import { IconDownload, IconHeart, IconInfoCircle } from '@tabler/icons-react'
import { ActionIcon } from '@mantine/core'
import { invoke } from '@tauri-apps/api'

const VideoControls = ({ id }: { id: string }) => {
    const startDownload = async (id: string) => {
        await invoke('download', {
            id,
        })
    }

    return (
        <div className="video-controls">
            <ActionIcon variant="subtle" size="md">
                <IconHeart />
            </ActionIcon>
            <ActionIcon
                onClick={() => startDownload(id)}
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
