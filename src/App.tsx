import { Search } from './components/Search.tsx'
import { Nav } from './components/Nav.tsx'
import { AppShell } from '@mantine/core'
import {
    NavigationContext,
    NavigationContextType,
    Panel,
} from './context/NavigationContext.tsx'
import { useContext } from 'react'
import Settings from './components/Settings.tsx'
import Notify from './components/Notify.tsx'

export function App() {
    const { selectedPanel } =
        useContext<NavigationContextType>(NavigationContext)

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 80, breakpoint: 'xs' }}
        >
            <AppShell.Header>
                <div>
                    <Notify />
                </div>
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
