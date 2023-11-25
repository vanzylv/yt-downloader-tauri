import { Button, Flex, Modal, Space, Stack } from '@mantine/core'
import { useContext, useEffect, useState } from 'react'
import DownloadDirectory from './DownloadDirectory.tsx'
import VideoQuality, { VideoQualityType } from './VideoQuality.tsx'
import {
    SettingsContext,
    SettingsContextType,
} from '../../context/SettingsContext.tsx'

export const SettingsModal = () => {
    const {
        downloadDirectory,
        videoQuality,
        saveAllSettings,
        hideSettingsModal,
    } = useContext<SettingsContextType>(SettingsContext)

    const [localDownloadDirectory, setLocalDownloadDirectory] =
        useState<string>(downloadDirectory)
    const [localVideoQuality, setLocalVideoQuality] =
        useState<VideoQualityType>(videoQuality)

    useEffect(() => {
        setLocalDownloadDirectory(downloadDirectory)
        setLocalVideoQuality(videoQuality)
    }, [])

    return (
        <Modal
            opened
            size="lg"
            radius="10"
            onClose={() => {
                hideSettingsModal()
            }}
            title="App Settings"
        >
            <DownloadDirectory
                setDownloadDirectory={setLocalDownloadDirectory}
                downloadDirectory={localDownloadDirectory}
            />
            <Space h="md" />
            <VideoQuality
                videoQuality={localVideoQuality}
                setVideoQuality={setLocalVideoQuality}
            />
            <Space h="xl" />
            <Stack>
                <Flex justify="end" align="end">
                    <Button
                        onClick={() => hideSettingsModal()}
                        variant="subtle"
                        color="red"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="subtle"
                        onClick={async () => {
                            saveAllSettings({
                                downloadDirectory: localDownloadDirectory,
                                videoQuality: localVideoQuality,
                            })
                            hideSettingsModal()
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
