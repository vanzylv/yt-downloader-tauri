import { createContext, ReactNode, useState } from 'react'

export type SearchContextType = {
    searchText: string
    setSearchText: (search: string) => void
    loading: boolean
    setLoading: (loading: boolean) => void
    search: () => void
}

export const SearchContext = createContext<SearchContextType>({
    searchText: '',
    setSearchText: () => {},
    loading: false,
    setLoading: () => {},
    search: () => {},
})

type SearchContextProviderProps = {
    children: ReactNode
}

export const SearchContextProvider = ({
    children,
}: SearchContextProviderProps) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [searchText, setSearchText] = useState<string>('')

    const search = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }
    return (
        <SearchContext.Provider
            value={{ searchText, setSearchText, loading, setLoading, search }}
        >
            {children}
        </SearchContext.Provider>
    )
}
