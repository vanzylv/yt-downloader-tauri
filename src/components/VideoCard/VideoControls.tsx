import {
    IconCheck,
    IconCopy,
    IconDownload,
    IconInfoCircle,
} from '@tabler/icons-react'
import {
    ActionIcon,
    CopyButton,
    Flex,
    Progress,
    Text,
    Tooltip,
} from '@mantine/core'
import { useContext, useEffect, useState } from 'react'
import { VideoContext, VideoContextType } from '../../context/VideoContext.tsx'
import { listen } from '@tauri-apps/api/event'
import { DownloadProgressEvent, Event, Video } from '../../types/api.ts'

const VideoControls = ({ video }: { video: Video }) => {
    const [loading, setLoading] = useState(false)
    const { downloadVideo } = useContext<VideoContextType>(VideoContext)
    const [progress, setProgress] = useState(0)
    const [progressText, setProgressText] = useState('')

    useEffect(() => {
        listen(`${Event.DOWNLOAD_PROGRESS}${video.id}`, (event) => {
            const { progress } = event.payload as DownloadProgressEvent
            setProgress(Math.round(progress))
        }).finally()
    }, [])

    useEffect(() => {
        if (progress === 0) {
            setProgressText('Starting...')
        }else if(progress === 100){
            setProgressText('Writing...')
        }else {
            setProgressText('')
        }

    }, [progress])

    useEffect(() => {
        if(!loading){
            setProgress(0)
        }
    }, [loading]);

    return (
        <Flex>
            {loading ? (
                !!progressText ? (
                    <Text fs="italic" c="dimmed">
                        {progressText}
                    </Text>
                ) : (
                    <Progress
                        w="100"
                        size="lg"
                        value={progress === 0 ? 1 : progress}
                    />
                )
            ) : (
                <>
                    <CopyButton value={video.url}>
                        {({ copied, copy }) => (
                            <ActionIcon
                                color={copied ? 'teal' : 'blue'}
                                onClick={copy}
                                variant="subtle"
                                size="md"
                            >
                                {copied ? <IconCheck /> : <IconCopy />}
                            </ActionIcon>
                        )}
                    </CopyButton>

                    <Tooltip label="Download" position="bottom">
                        <ActionIcon
                            onClick={() => downloadVideo(video, setLoading)}
                            variant="subtle"
                            size="md"
                            loading={loading}
                        >
                            <IconDownload />
                        </ActionIcon>
                    </Tooltip>
                    <ActionIcon variant="subtle" size="md">
                        <IconInfoCircle />
                    </ActionIcon>
                </>
            )}
        </Flex>
    )
}

export default VideoControls
