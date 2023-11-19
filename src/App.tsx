import { Search } from './components/Search/Search.tsx'
import { ActionIcon, AppShell, Flex, Space } from '@mantine/core'
import ThemeToggle from './components/Theme/ThemeToggle.tsx'
import SearchInput from './components/Search/SearchInput.tsx'
import { IconSettings } from '@tabler/icons-react'
import { ModalContext, ModalContextType } from './context/ModalContext.tsx'
import { useContext } from 'react'

export function App() {
    const { showSettingsModal } = useContext<ModalContextType>(ModalContext)

    return (
        <AppShell header={{ height: 80 }}>
            <AppShell.Header>
                <Flex
                    align="center"
                    justify="space-between"
                    style={{ height: '100%', padding: '20px' }}
                >
                    <h2>YT Downloader 📺</h2>
                    <SearchInput />

                    <Flex>
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
            </AppShell.Main>
        </AppShell>
    )
}
