import { Button, Space, TextInput } from '@mantine/core'
import classes from './Search.module.css'

export function Search() {
    return (
        <div className={classes.searchContainer}>
            <TextInput
                className={classes.searchInput}
                placeholder="Input placeholder"
            />
            <Space w="md" />
            <Button variant="filled" color="teal">
                Search
            </Button>
        </div>
    )
}
