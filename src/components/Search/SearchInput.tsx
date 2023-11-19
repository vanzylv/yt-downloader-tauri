import classes from './SearchInput.module.css'
import { ActionIcon, TextInput } from '@mantine/core'
import { useContext } from 'react'
import {
    SearchContext,
    SearchContextType,
} from '../../context/SearchContext.tsx'
import { IconSearch, IconX } from '@tabler/icons-react'

const SearchInput = () => {
    const { loading, searchText, setSearchText, search } =
        useContext<SearchContextType>(SearchContext)
    return (
        <div className={classes.searchContainer}>
            <TextInput
                disabled={loading}
                size="lg"
                radius="md"
                leftSection={<IconSearch />}
                rightSection={
                    <ActionIcon onClick={() => setSearchText('')} variant="subtle">
                        <IconX />
                    </ActionIcon>
                }
                onChange={(event) => setSearchText(event.currentTarget.value)}
                value={searchText}
                className={classes.searchInput}
                placeholder="Search YouTube"
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        search()
                    }
                }}
            />
            {/*<Space w="md" />*/}
            {/*<Button*/}
            {/*    onClick={() => search()}*/}
            {/*    variant="filled"*/}
            {/*    color="teal"*/}
            {/*    loading={loading}*/}
            {/*>*/}
            {/*    Search*/}
            {/*</Button>*/}
        </div>
    )
}

export default SearchInput
