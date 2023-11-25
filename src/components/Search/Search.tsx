import classes from './Search.module.css'
import {
    SearchContext,
    SearchContextType,
} from '../../context/SearchContext.tsx'
import { useContext } from 'react'
import SearchResults from './SearchResults.tsx'
import {Center, Loader} from '@mantine/core'

export function Search() {
    const { loading } = useContext<SearchContextType>(SearchContext)

    return (
        <>
            <div className={classes.searchResultsContainer}>
                {loading ? (
                    <Center
                        style={{
                            height: 'calc(100vh - 200px)',
                        }}
                    >
                        <Loader color="blue" type="bars" />
                    </Center>
                ) : (
                    <SearchResults />
                )}
            </div>
        </>
    )
}
