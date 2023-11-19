import { SearchContext, SearchContextType } from '../../context/SearchContext.tsx'
import { useContext } from 'react'

import { SimpleGrid } from '@mantine/core'
import VideoCard from '../VideoCard/VideoCard.tsx'

const SearchResults = () => {
    const { searchResult } = useContext<SearchContextType>(SearchContext)

    return (
        <SimpleGrid
            cols={{ base: 2, sm: 3, lg: 4 }}
            spacing={{ base: 10, sm: 'xl' }}
            verticalSpacing={{ base: 'md', sm: 'xl' }}
        >
            {searchResult.map((video) => (
                <VideoCard video={video} key={video.id} />
            ))}
        </SimpleGrid>
    )
}

export default SearchResults
