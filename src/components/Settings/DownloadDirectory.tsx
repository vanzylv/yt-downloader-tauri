import { ActionIcon, Divider, TextInput } from '@mantine/core'
import { IconFolder } from '@tabler/icons-react'
import { dialog } from '@tauri-apps/api'

const DownloadDirectory = ({
    downloadDirectory,
    setDownloadDirectory,
}: {
    downloadDirectory: string
    setDownloadDirectory: (downloadDirectory: string) => void
}) => {
    const openPathSelector = () => {
        dialog
            .open({
                title: 'Select a download directory',
                directory: true,
            })
            .then((response) => {
                setDownloadDirectory((response as string) ?? downloadDirectory)
            })
            .catch((error) => {
                console.error('Error opening dialog box:', error)
            })
    }

    return (
        <>
            <Divider my="sm" label="Download Directory" />
            <TextInput
                autoFocus={false}
                size="lg"
                w={'100%'}
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
                value={downloadDirectory}
                variant="filled"
            />
        </>
    )
}
export default DownloadDirectory
