import { Search } from './components/Search.tsx'
import { Nav } from './components/Nav.tsx'
import { AppShell, Flex } from '@mantine/core'
import {
    NavigationContext,
    NavigationContextType,
    Panel,
} from './context/NavigationContext.tsx'
import { useContext } from 'react'
import Settings from './components/Settings.tsx'
import ThemeToggle from './components/ThemeToggle.tsx'
import SearchInput from "./components/SearchInput.tsx";

export function App() {
    const { selectedPanel } =
        useContext<NavigationContextType>(NavigationContext)

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 80, breakpoint: 'xs' }}
        >
            <AppShell.Header>
                <Flex
                    p={{ xs: 'xs', md: 'md' }}
                    align="center"
                    justify="space-between"
                    style={{ height: '100%' }}
                >
                    <h2>YT Downloader 📺</h2>
                    <SearchInput/>
                    <ThemeToggle />
                </Flex>
            </AppShell.Header>

            <AppShell.Navbar p="md">
                <Nav />
            </AppShell.Navbar>

            <AppShell.Main>
                {selectedPanel === Panel.Home ? <Search /> : <Settings />}
            </AppShell.Main>
        </AppShell>
    )
}
