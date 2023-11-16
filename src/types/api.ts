interface Thumbnail {
    width: number;
    height: number;
    url: string;
}

interface Channel {
    id: string;
    name: string;
    url: string;
    icon: Thumbnail[];
    verified: boolean;
    subscribers: number;
}

interface Video {
    id: string;
    url: string;
    title: string;
    description: string;
    duration: number;
    duration_raw: string;
    thumbnails: Thumbnail[];
    channel: Channel;
    uploaded_at?: string;
    views: number;
}

