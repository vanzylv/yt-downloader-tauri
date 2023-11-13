import {Search} from "./components/Search.tsx";
import {Nav} from "./components/Nav.tsx";
import {AppShell} from "@mantine/core";

export function App() {
    return (
        <AppShell header={{height: 60}} navbar={{width: 80, breakpoint: 'xs'}}>
            <AppShell.Header>
                <div>Logo</div>
            </AppShell.Header>

            <AppShell.Navbar p="md">
                <Nav/>
            </AppShell.Navbar>

            <AppShell.Main><Search/></AppShell.Main>
        </AppShell>
    );
}