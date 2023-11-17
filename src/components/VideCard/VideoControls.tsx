import { IconDownload, IconHeart, IconInfoCircle } from '@tabler/icons-react'
import { ActionIcon } from '@mantine/core'

const VideoControls = () => {
    return (
        <div className="video-controls">
            <ActionIcon variant="subtle" size="md">
                <IconHeart />
            </ActionIcon>
            <ActionIcon variant="subtle" size="md">
                <IconDownload />
            </ActionIcon>
            <ActionIcon variant="subtle" size="md">
                <IconInfoCircle />
            </ActionIcon>
        </div>
    )
}

export default VideoControls
