import { createContext, ReactNode, useEffect, useState } from 'react'
import { store } from '../main.tsx'
import { Settings, StorageKey } from '../types/app.ts'
import { VideoQualityType } from '../components/Settings/VideoQuality.tsx'
import { downloadDir as fetchDefaultDownloadDirectory } from '@tauri-apps/api/path'

export type SettingsContextType = {
    settingsVisible: boolean
    showSettingsModal: () => void
    hideSettingsModal: () => void
    downloadDirectory: string
    videoQuality: VideoQualityType
    saveAllSettings: (settings: Settings) => void
}

export const SettingsContext = createContext<SettingsContextType>({
    settingsVisible: false,
    showSettingsModal: () => {},
    hideSettingsModal: () => {},
    downloadDirectory: '',
    videoQuality: VideoQualityType.Highest,
    saveAllSettings: () => {},
})

export const SettingsContextProvider = ({
    children,
}: {
    children: ReactNode
}) => {
    const [settingsVisible, setSettingsVisible] = useState<boolean>(false)
    const showSettingsModal = () => setSettingsVisible(true)
    const hideSettingsModal = () => setSettingsVisible(false)
    const [downloadDirectory, setDownloadDirectory] = useState<string>('')
    const [videoQuality, setVideoQuality] = useState<VideoQualityType>(
        VideoQualityType.Highest
    )

    useEffect(() => {
        store.get(StorageKey.DOWNLOAD_DIRECTORY).then((value) => {
            if (!!value) {
                setDownloadDirectory(value as string)
            } else {
                fetchDefaultDownloadDirectory().then((dir) => {
                    setDownloadDirectory(dir as string)
                })
            }
        })

        store.get(StorageKey.VIDEO_QUALITY).then((value) => {
            setVideoQuality(
                (value as VideoQualityType) ?? VideoQualityType.Highest
            )
        })
    }, [])

    const saveAllSettings = async (setting: Settings) => {
        console.log('Saving settings', setting)
        await store.set(
            StorageKey.DOWNLOAD_DIRECTORY,
            setting.downloadDirectory
        )
        await store.set(StorageKey.VIDEO_QUALITY, setting.videoQuality)
        setDownloadDirectory(setting.downloadDirectory)
        setVideoQuality(setting.videoQuality as VideoQualityType)
    }

    return (
        <SettingsContext.Provider
            value={{
                settingsVisible,
                showSettingsModal,
                hideSettingsModal,
                downloadDirectory,
                videoQuality,
                saveAllSettings,
            }}
        >
            {children}
        </SettingsContext.Provider>
    )
}
