import { IconDownload, IconHeart, IconInfoCircle } from '@tabler/icons-react'
import { ActionIcon } from '@mantine/core'
import { useContext, useState } from 'react'
import { VideoContext, VideoContextType } from '../../context/VideoContext.tsx'

const VideoControls = ({ video }: { video: Video }) => {
    const [loading, setLoading] = useState(false)
    const { downloadVideo } = useContext<VideoContextType>(VideoContext)
    return (
        <div className="video-controls">
            <ActionIcon variant="subtle" size="md">
                <IconHeart />
            </ActionIcon>
            <ActionIcon
                onClick={() => downloadVideo(video, setLoading)}
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
