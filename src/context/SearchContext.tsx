import { createContext, ReactNode, useContext, useState } from 'react'
import {
    NotificationContext,
    NotificationContextType,
    NotificationType,
} from './NotificationContext.tsx'
import { searchVideos } from '../tauri/commands.ts'
import {Video} from "../types/api.ts";

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
    setSearchText: () => {
    },
    loading: false,
    setLoading: () => {
    },
    search: () => {
    },
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

    const {displayNotification} =
        useContext<NotificationContextType>(NotificationContext)
    const search = async () => {
        setLoading(true)
        try {
            const result = await searchVideos(searchText)
            setSearchResult(result as Video[]);
        } catch (error) {
            console.log('error', error)
            displayNotification(NotificationType.error, error as string)
        } finally {
            setLoading(false)
        }
    }

    return (
        <SearchContext.Provider
            value={{searchText, setSearchText, loading, setLoading, search, searchResult}}
        >
            {children}
        </SearchContext.Provider>
    )
}
