import { createContext, ReactNode, useState } from 'react'

export enum Panel {
    Home,
    Settings,
}

export type NavigationContextType = {
    selectedPanel: Panel
    setSelectedPanel: (panel: Panel) => void
}

export const NavigationContext = createContext<NavigationContextType>({
    selectedPanel: Panel.Home,
    setSelectedPanel: () => {},
})


type NavigationContextProviderProps = {
    children: ReactNode
}

export function NavigationContextProvider({ children }: NavigationContextProviderProps) {
    const [selectedPanel, setSelectedPanel] = useState<Panel>(Panel.Home)

    return (
        <NavigationContext.Provider value={{ selectedPanel, setSelectedPanel }}>
            {children}
        </NavigationContext.Provider>
    )
}
