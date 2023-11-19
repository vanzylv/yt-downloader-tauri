import { createContext, ReactNode, useState } from 'react'

export type ModalContextType = {
    showSettingsModal: () => void
    showVideDetailsModel: (video: Video) => void
    hideDialog: () => void
    settingsVisible: boolean
    videoDetailsVisible: boolean
}

export const ModalContext = createContext<ModalContextType>({
    showSettingsModal: () => {},
    showVideDetailsModel: () => {},
    hideDialog: () => {},
    settingsVisible: false,
    videoDetailsVisible: false,
})

export const ModalContextProvider = ({ children }: { children: ReactNode }) => {
    const [settingsVisible, setSettingsVisible] = useState<boolean>(false)
    const [videoDetailsVisible, setVideoDetailsVisible] = useState<boolean>(false)
    const showSettingsModal = () => {
        setSettingsVisible(true)
        setVideoDetailsVisible(false)
    }
    const showVideDetailsModel = () => {
        setSettingsVisible(false)
        setVideoDetailsVisible(true)
    }
    const hideDialog = () => {
        setSettingsVisible(false)
        setVideoDetailsVisible(false)
    }
    return (
        <ModalContext.Provider
            value={{
                showSettingsModal,
                showVideDetailsModel,
                hideDialog,
                settingsVisible,
                videoDetailsVisible,
            }}
        >
            {children}
        </ModalContext.Provider>
    )
}
