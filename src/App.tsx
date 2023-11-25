import { Search } from './components/Search/Search.tsx'
import {
    ActionIcon,
    AppShell,
    Flex,
    Image,
    Space,
    Tooltip,
} from '@mantine/core'
import ThemeToggle from './components/Theme/ThemeToggle.tsx'
import SearchInput from './components/Search/SearchInput.tsx'
import { IconFolderOpen, IconSettings } from '@tabler/icons-react'
import { useContext } from 'react'
import SettingsModal from './components/Settings/SettingsModal.tsx'
import logo from './assets/header-image.png'
import { openFolder } from './tauri/commands.ts'
import {
    SettingsContext,
    SettingsContextType,
} from './context/SettingsContext.tsx'

export function App() {
    const { settingsVisible, showSettingsModal, downloadDirectory } =
        useContext<SettingsContextType>(SettingsContext)

    return (
        <AppShell header={{ height: 80 }}>
            <AppShell.Header>
                <Flex align="center" justify="space-between" h="100%" p="20">
                    <Image height={30} src={logo} />
                    <Space w="sm" />
                    <h2>YT Downloader</h2>
                    <SearchInput />
                    <Flex>
                        <Tooltip
                            label={'Open download directory'}
                            position="left"
                        >
                            <ActionIcon
                                variant="default"
                                size="xl"
                                aria-label="App Settings"
                                onClick={async () => {
                                    console.log(
                                        'Opening download directory',
                                        downloadDirectory
                                    );
                                    await openFolder(downloadDirectory)
                                }}
                            >
                                <IconFolderOpen />
                            </ActionIcon>
                        </Tooltip>
                        <Space w="xs" />
                        <Tooltip label={'App settings'} position="left">
                            <ActionIcon
                                variant="default"
                                size="xl"
                                aria-label="App Settings"
                                onClick={() => showSettingsModal()}
                            >
                                <IconSettings />
                            </ActionIcon>
                        </Tooltip>
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
