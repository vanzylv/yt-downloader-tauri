import { createContext, ReactNode, useContext, useState } from 'react'
import { invoke } from '@tauri-apps/api'
import {
    NotificationContext,
    NotificationContextType, NotificationType,
} from './NotificationContext.tsx'

export type SearchContextType = {
    searchText: string
    setSearchText: (search: string) => void
    loading: boolean
    setLoading: (loading: boolean) => void
    search: () => void
    searchResult: Video[]
}

export const SearchContext = createContext<SearchContextType>({
    searchText: '',
    setSearchText: () => {},
    loading: false,
    setLoading: () => {},
    search: () => {},
    searchResult: [],
})

type SearchContextProviderProps = {
    children: ReactNode
}

export const SearchContextProvider = ({
    children,
}: SearchContextProviderProps) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [searchText, setSearchText] = useState<string>('')
    const [searchResult, setSearchResult] = useState<Video[]>([])

    const { displayNotification } =
        useContext<NotificationContextType>(NotificationContext)
    const search = () => {
        setLoading(true)

        invoke('search', { query: searchText })
            .then((result) => {
                console.log('result', result)
                setSearchResult(result as Video[]);
            })
            .catch((error) => {
                console.log('error', error)
                displayNotification(NotificationType.error, error)
            })
            .finally(() => {
                setLoading(false)
            })
    }
    return (
        <SearchContext.Provider
            value={{ searchText, setSearchText, loading, setLoading, search, searchResult }}
        >
            {children}
        </SearchContext.Provider>
    )
}
