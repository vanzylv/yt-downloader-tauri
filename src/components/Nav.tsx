import classes from './Nav.module.css'
import { useContext } from 'react'
import { rem, Stack, Tooltip, UnstyledButton } from '@mantine/core'
import { IconHome2, IconSettings } from '@tabler/icons-react'
import {
    NavigationContext,
    NavigationContextType,
} from '../context/NavigationContext.tsx'

interface NavbarLinkProps {
    icon: any
    label: string
    active?: boolean
    onClick: () => void
}

function NavbarLink({icon: Icon, label, active, onClick}: NavbarLinkProps) {
    return (
        <Tooltip label={label} position="right" transitionProps={{duration: 0}}>
            <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
                <Icon style={{width: rem(20), height: rem(20)}} stroke={1.5}/>
            </UnstyledButton>
        </Tooltip>
    );
}


const NavLinks = [
    {icon: IconHome2, label: 'Home'},
    {icon: IconSettings, label: 'Settings'},
];

export function Nav() {

    const { selectedPanel, setSelectedPanel  } = useContext<NavigationContextType>(NavigationContext);

    const links = NavLinks.map((link, index) => (
        <NavbarLink
            {...link}
            key={link.label}
            active={index === selectedPanel}
            onClick={() => setSelectedPanel(index)}
        />
    ));

    return (
        <nav className={classes.navbar}>
            <div className={classes.navbarMain}>
                <Stack justify="center" gap={0}>
                    {links}
                </Stack>
            </div>
        </nav>
    )
}