import { Button, Space, TextInput } from '@mantine/core'
import classes from './Search.module.css'
import { SearchContext, SearchContextType } from '../context/SearchContext.tsx'
import { infinity } from 'ldrs'

infinity.register()

export function Search() {
    const { loading, searchText, setSearchText, search } =
        useContext<SearchContextType>(SearchContext)

    return (
        <div>
            <div className={classes.searchContainer}>
                <TextInput
                    onChange={(event) =>
                        setSearchText(event.currentTarget.value)
                    }
                    value={searchText}
                    className={classes.searchInput}
                    placeholder="Search YouTube"
                />
                <Space w="md" />
                <Button
                    onClick={() => search()}
                    variant="filled"
                    color="teal"
                    loading={loading}
                >
                    Search
                </Button>
            </div>
            <div className={classes.searchContainer}>
                {loading ? (
                    <l-infinity
                        size="50"
                        stroke="5"
                        speed="1"
                        color="teal"
                    ></l-infinity>
                ) : <SearchResults/>}
            </div>
        </div>
    )
}

import { useContext } from 'react'
import SearchResults from "./SearchResults.tsx";
