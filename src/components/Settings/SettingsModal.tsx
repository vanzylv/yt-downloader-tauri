import {
    ActionIcon,
    Box,
    Button,
    Divider,
    Flex,
    Modal,
    Stack,
    TextInput,
} from '@mantine/core'
import { useContext, useEffect, useState } from 'react'
import { ModalContext, ModalContextType } from '../../context/ModalContext.tsx'
import { dialog } from '@tauri-apps/api'
import { IconFolder } from '@tabler/icons-react'
import { store } from '../../main.tsx'
import { StorageKey } from '../../types/app.ts'

export const SettingsModal = () => {
    const { settingsVisible, hideDialog } =
        useContext<ModalContextType>(ModalContext)

    const [localDownloadDirectory, setLocalDownloadDirectory] =
        useState<string>()

    const [persistedDownloadDirectory, setPersistedLocalDownloadDirectory] =
        useState<string>()

    useEffect(() => {
        store.get(StorageKey.DOWNLOAD_DIRECTORY).then((value) => {
            setPersistedLocalDownloadDirectory(value as string)
        })
    })

    useEffect(() => {
        setLocalDownloadDirectory(persistedDownloadDirectory)
    }, [persistedDownloadDirectory])

    useEffect(() => {
        if (!settingsVisible) return
        if (localDownloadDirectory !== persistedDownloadDirectory) {
            console.log('Saving download directory to storage')
            setLocalDownloadDirectory(persistedDownloadDirectory)
        }
    }, [settingsVisible])

    const openPathSelector = () => {
        dialog
            .open({
                title: 'Select a download directory',
                directory: true,
            })
            .then((response) => {
                setLocalDownloadDirectory(
                    (response as string) ?? persistedDownloadDirectory
                )
            })
            .catch((error) => {
                console.error('Error opening dialog box:', error)
            })
    }

    return (
        <Modal
            size="lg"
            opened={settingsVisible}
            radius="10"
            onClose={() => {
                hideDialog()
            }}
            title="App Settings"
        >
            <h2>Settings</h2>
            <Divider
                my="sm"
                label={
                    <>
                        <IconFolder />
                        <Box ml="5">Downloads</Box>
                    </>
                }
            />
            <Stack>
                <TextInput
                    autoFocus={false}
                    size="lg"
                    w={'100%'}
                    description="This is where your downloads will be saved."
                    label="Download Directory"
                    placeholder="No directory selected"
                    leftSection={
                        <ActionIcon
                            variant="subtle"
                            onClick={() => openPathSelector()}
                        >
                            <IconFolder />
                        </ActionIcon>
                    }
                    readOnly
                    style={{ cursor: 'pointer' }}
                    value={localDownloadDirectory}
                    variant="filled"
                />

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
                            await store.set(
                                StorageKey.DOWNLOAD_DIRECTORY,
                                localDownloadDirectory
                            )
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
