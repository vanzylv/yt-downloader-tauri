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

export interface Video {
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

export enum Event {
    DOWNLOAD_PROGRESS = 'download_progress_',
}

export interface DownloadProgressEvent {
    id: string;
    progress: number;
}

