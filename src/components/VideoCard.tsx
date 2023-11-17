import classes from './SearchResults.module.css'
import { Card, Image, Text, Transition } from '@mantine/core'
import { useEffect, useState } from 'react'

const VideoCard = ({ video }: { video: Video }) => {
    const [opened, setOpened] = useState(false)
    useEffect(() => {
        setOpened(true)
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
                    style={{ ...styles }}
                    withBorder
                    padding="lg"
                    className={classes.card}
                >
                    <Card.Section>
                        <Image
                            src={video.thumbnails[0].url}
                            alt={video.title}
                        />
                    </Card.Section>
                    <Text mt="sm" mb="md" c="dimmed" fz="xs">
                        {video.title}
                    </Text>
                    <Card.Section className={classes.footer}>
                        Components
                    </Card.Section>
                </Card>
            )}
        </Transition>
    )
}

export default VideoCard
