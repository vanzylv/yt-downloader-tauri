export const enum StorageKey {
    DOWNLOAD_DIRECTORY = 'downloadDirectory',
    VIDEO_QUALITY = 'videoQuality',
}

export type Settings = {
    downloadDirectory: string
    videoQuality: string
}