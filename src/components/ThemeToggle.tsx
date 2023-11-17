import {
    ActionIcon,
    useMantineColorScheme,
    useComputedColorScheme,
} from '@mantine/core'
import { IconSun, IconMoon } from '@tabler/icons-react'
import cx from 'clsx'
import classes from './ThemeToggle.module.css'

const ThemeToggle = () => {
    const { setColorScheme } = useMantineColorScheme()
    const computedColorScheme = useComputedColorScheme('light', {
        getInitialValueInEffect: true,
    })

    return (
        <ActionIcon
            onClick={() =>
                setColorScheme(
                    computedColorScheme === 'light' ? 'dark' : 'light'
                )
            }
            variant="default"
            size="xl"
            aria-label="Toggle color scheme"
        >
            <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
            <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
        </ActionIcon>
    )
}

export default ThemeToggle
