import classes from '../Search/SearchResults.module.css'
import {
    Card,
    Flex,
    Group,
    Image,
    Space,
    Text,
    Transition,
} from '@mantine/core'
import { useEffect, useState } from 'react'
import VideoControls from './VideoControls.tsx'
import { IconClock, IconEye } from '@tabler/icons-react'

const VideoCard = ({ video }: { video: Video }) => {
    const [opened, setOpened] = useState(false)

    useEffect(() => {
        setOpened(true)
    },[])

    const d = new Date(Date.UTC(0, 0, 0, 0, 0, 0, video.duration)),
        parts = [d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds()],
        formatted = parts.map((s) => String(s).padStart(2, '0')).join(':')

    const compactViewCount = Intl.NumberFormat('en', {
        notation: 'compact',
        maximumSignificantDigits: 3,
    })

    return (
        <Transition
            mounted={opened}
            transition="slide-up"
            duration={400}
            timingFunction="ease"
        >
            {(styles) => (
                <Card
                    shadow="sm"
                    radius="sm"
                    withBorder
                    style={{ ...styles }}
                    className={classes.card}
                >
                    <Card.Section>
                        <Image
                            src={video.thumbnails[0].url}
                            alt={video.title}
                        />
                    </Card.Section>

                    <Card.Section p="10">
                        <Group justify="start" align="top">
                            <Text lineClamp={2} fw={600}>
                                {video.title}
                            </Text>
                            <Text lineClamp={2} fw={400}>
                                {video.description}
                            </Text>
                        </Group>
                    </Card.Section>

                    <Card.Section p="10">
                        <Group align="center" justify="space-between">
                            <Flex>
                                <Text>{formatted}</Text>
                                <IconClock />
                                <Space w="xs" />
                                <Text>
                                    {compactViewCount.format(video.views)}
                                </Text>
                                <IconEye />
                            </Flex>
                            <VideoControls video={video} />
                        </Group>
                    </Card.Section>
                </Card>
            )}
        </Transition>
    )
}

export default VideoCard
