import classes from './Search.module.css'
import {
    SearchContext,
    SearchContextType,
} from '../../context/SearchContext.tsx'
import { useContext, useEffect } from 'react'
import SearchResults from './SearchResults.tsx'
import { Center, Loader } from '@mantine/core'
import { store } from '../../main.tsx'
import { StorageKey } from '../../types/app.ts'
import { downloadDir } from '@tauri-apps/api/path'
import { VideoQualityType } from '../Settings/VideoQuality.tsx'

export function Search() {
    const { loading } = useContext<SearchContextType>(SearchContext)

    useEffect(() => {
        ;(async function () {
            try {
                const storeDownloadDir = await store.get(
                    StorageKey.DOWNLOAD_DIRECTORY
                )

                const defaultQuality = await store.get(StorageKey.VIDEO_QUALITY)

                if (!defaultQuality) {
                    await store.set(
                        StorageKey.VIDEO_QUALITY,
                        VideoQualityType.Highest
                    )
                    console.log(
                        'Default video quality set to',
                        VideoQualityType.Highest
                    )
                }

                if (!storeDownloadDir) {
                    const dir = await downloadDir()
                    await store.set(StorageKey.DOWNLOAD_DIRECTORY, dir)
                    console.log('Default download directory set to', dir)
                }
            } catch (e) {
                console.error(e)
            }
        })()
    }, [])

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
