import classes from "./SearchResults.module.css";
import {Card, Image, Text} from "@mantine/core";

const VideoCard = ({ video }: { video: Video }) => {
    return (
        <Card withBorder padding="lg" className={classes.card}>
            <Card.Section>
                <Image
                    src={video.thumbnails[0].url}
                    alt={video.title}

                />
            </Card.Section>
            <Text mt="sm" mb="md" c="dimmed" fz="xs">
                {video.title}
            </Text>
            <Card.Section className={classes.footer}>Components</Card.Section>
        </Card>
    )
}

export default VideoCard;