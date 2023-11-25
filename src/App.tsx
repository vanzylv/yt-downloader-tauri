import { Search } from './components/Search/Search.tsx'
import { ActionIcon, AppShell, Flex, Image, Space } from '@mantine/core'
import ThemeToggle from './components/Theme/ThemeToggle.tsx'
import SearchInput from './components/Search/SearchInput.tsx'
import { IconFolderOpen, IconSettings } from '@tabler/icons-react'
import { ModalContext, ModalContextType } from './context/ModalContext.tsx'
import { useContext } from 'react'
import SettingsModal from './components/Settings/SettingsModal.tsx'
import logo from './assets/header-image.png'

export function App() {
    const { showSettingsModal, settingsVisible } =
        useContext<ModalContextType>(ModalContext)

    return (
        <AppShell header={{ height: 80 }}>
            <AppShell.Header>
                <Flex
                    align="center"
                    justify="space-between"
                    style={{ height: '100%', padding: '20px' }}
                >

                    <Image
                        height={30}
                        radius="md"
                        w="auto"
                        fit="contain"
                        src={logo}
                    />
                    <Space w="sm" />
                    <h2>YT Downloader</h2>

                    <SearchInput />

                    <Flex>
                        <ActionIcon
                            variant="default"
                            size="xl"
                            aria-label="App Settings"
                            onClick={() => showSettingsModal()}
                        >
                            <IconFolderOpen />
                        </ActionIcon>
                        <Space w="xs" />
                        <ActionIcon
                            variant="default"
                            size="xl"
                            aria-label="App Settings"
                            onClick={() => showSettingsModal()}
                        >
                            <IconSettings />
                        </ActionIcon>
                        <Space w="xs" />
                        <ThemeToggle />
                    </Flex>
                </Flex>
            </AppShell.Header>

            <AppShell.Main>
                <Search />
                {settingsVisible && <SettingsModal />}
            </AppShell.Main>
        </AppShell>
    )
}
