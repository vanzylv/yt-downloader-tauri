import { Divider, SegmentedControl } from '@mantine/core'

export enum VideoQualityType {
    Highest = 'Highest',
    Lowest = 'Lowest',
}

const VideoQuality = ({
    videoQuality,
    setVideoQuality,
}: {
    videoQuality: string
    setVideoQuality: (videoQuality: VideoQualityType) => void
}) => {

    return (
        <>
            <Divider
                my="sm"
                label="Video Quality"
            />
            <SegmentedControl
                style={{ marginTop: 2 }}
                size="md"
                w={'100%'}
                value={videoQuality}
                onChange={(event) => setVideoQuality(event as VideoQualityType)}
                data={[
                    {
                        label: VideoQualityType.Highest,
                        value: VideoQualityType.Highest,
                    },
                    {
                        label: VideoQualityType.Lowest,
                        value: VideoQualityType.Lowest,
                    },
                ]}
            />
        </>
    )
}
export default VideoQuality
