import { Box, Button, Divider, Flex, Modal, Stack } from '@mantine/core'
import { useContext } from 'react'
import { ModalContext, ModalContextType } from '../../context/ModalContext.tsx'
import { IconFolder } from '@tabler/icons-react'
import DownloadDirectory from './DownloadDirectory.tsx'

export const SettingsModal = () => {
    const { settingsVisible, hideDialog } =
        useContext<ModalContextType>(ModalContext)

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
            <DownloadDirectory />
            <Stack h="md" />
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
