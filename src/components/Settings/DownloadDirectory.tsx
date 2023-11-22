import {ActionIcon, TextInput} from "@mantine/core";
import {IconFolder} from "@tabler/icons-react";
import {dialog} from "@tauri-apps/api";
import {useContext, useEffect, useState} from "react";
import {ModalContext, ModalContextType} from "../../context/ModalContext.tsx";
import {store} from "../../main.tsx";
import {StorageKey} from "../../types/app.ts";

const DownloadDirectory = () => {

    const { settingsVisible } =
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
            value={localDownloadDirectory}
            variant="filled"
        />
    )
}
export default DownloadDirectory