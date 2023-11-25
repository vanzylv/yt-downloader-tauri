import { Button, Flex, Modal, Space, Stack } from '@mantine/core'
import { useContext, useEffect, useState } from 'react'
import { ModalContext, ModalContextType } from '../../context/ModalContext.tsx'
import DownloadDirectory from './DownloadDirectory.tsx'
import { store } from '../../main.tsx'
import { StorageKey } from '../../types/app.ts'
import VideoQuality, { VideoQualityType } from './VideoQuality.tsx'

export const SettingsModal = () => {
    const { hideDialog } = useContext<ModalContextType>(ModalContext)
    const noDirectorySelected = 'No download directory selected!'
    const [downloadDirectory, setDownloadDirectory] =
        useState<string>(noDirectorySelected)
    const [videoQuality, setVideoQuality] = useState<VideoQualityType>(
        VideoQualityType.Highest
    )

    useEffect(() => {
        store.get(StorageKey.DOWNLOAD_DIRECTORY).then((value) => {
            setDownloadDirectory((value as string) ?? noDirectorySelected)
        })

        store.get(StorageKey.VIDEO_QUALITY).then((value) => {
            setVideoQuality(
                (value as VideoQualityType) ?? VideoQualityType.Highest
            )
        })
    }, [])

    const saveSettings = async () => {
        await store.set(StorageKey.DOWNLOAD_DIRECTORY, downloadDirectory)
        await store.set(StorageKey.VIDEO_QUALITY, videoQuality)
    }

    return (
        <Modal
            opened
            size="lg"
            radius="10"
            onClose={() => {
                hideDialog()
            }}
            title="App Settings"
        >
            <DownloadDirectory
                setDownloadDirectory={setDownloadDirectory}
                downloadDirectory={downloadDirectory}
            />
            <Space h="md" />
            <VideoQuality
                videoQuality={videoQuality}
                setVideoQuality={setVideoQuality}
            />
            <Space h="xl" />
            <Stack>
                <Flex justify="end" align="end">
                    <Button
                        onClick={() => hideDialog()}
                        variant="subtle"
                        color="red"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="subtle"
                        onClick={async () => {
                            await saveSettings()
                            hideDialog()
                        }}
                    >
                        Save
                    </Button>
                </Flex>
            </Stack>
        </Modal>
    )
}

export default SettingsModal
