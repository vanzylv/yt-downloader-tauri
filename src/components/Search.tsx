import classes from './Search.module.css'
import { SearchContext, SearchContextType } from '../context/SearchContext.tsx'
import { infinity } from 'ldrs'
import { useContext } from 'react'
import SearchResults from './SearchResults.tsx'

infinity.register()

export function Search() {
    const { loading } = useContext<SearchContextType>(SearchContext)

    return (
        <>
            <div className={classes.searchResultsContainer}>
                {loading ? (
                    <l-infinity
                        size="50"
                        stroke="5"
                        speed="1"
                        color="teal"
                    ></l-infinity>
                ) : (
                    <SearchResults />
                )}
            </div>
        </>
    )
}
