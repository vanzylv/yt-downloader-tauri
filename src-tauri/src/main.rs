use rusty_ytdl::{Video, VideoOptions, VideoQuality, VideoSearchOptions};
use rusty_ytdl::search::Video as SearchVideo;
use rusty_ytdl::search::YouTube;
use tauri::Window;

/*
    while let Some(chunk) = stream.try_next().await? {
        file.write_all(&chunk).await?;
        let _ = window.emit(
            "download://progress",
            ProgressPayload {
                id,
                progress: chunk.len() as u64,
                total,
            },
        );
    }

    Ok(id)
 */

#[derive(Clone, serde::Serialize)]
struct Payload {
    message: String,
}

#[derive(Clone, serde::Serialize)]
struct ProgressPayload {
    id: String,
    progress: u64,
    total: u64,
}

#[tauri::command]
async fn download(id: String, download_dir: String, window: Window) {
    println!("id: {}", id);
    println!("download_dir: {}", download_dir);
    //println!("window: {}", window);

    let video_options = VideoOptions {
        quality: VideoQuality::Lowest,
        filter: VideoSearchOptions::Video,
        ..Default::default()
    };

    let video = Video::new_with_options(&id, video_options).unwrap();

    let stream = video.stream().await.unwrap();

    let total = stream.content_length();
    println!("total: {}", total);

    while let Some(chunk) = stream.chunk().await.unwrap() {
        // Do what you want with chunks
        println!("{:#?}", chunk);
        let _ = window.emit(
            "download://progress",
            ProgressPayload {
                id:"234".to_string(),
                progress: 123,
                total: 123,
            },
        ).unwrap();
    }


    //}

    println!("done");

    // Or direct download to path
    let path = std::path::Path::new("/Users/viklass/Downloads/test.mp4");

    video.download(path).await.unwrap();
}

#[tauri::command]
async fn search(query: &str) -> Result<Vec<SearchVideo>, ()> {
    let youtube = YouTube::new().unwrap();
    let res = youtube.search(r#query, None).await.unwrap();

    let mut video_results: Vec<SearchVideo> = Vec::new();
    for search_result in res {
        if let rusty_ytdl::search::SearchResult::Video(video) = search_result {
            video_results.push(video)
        }
    }

    return Ok(video_results);
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![download,search])
        .plugin(tauri_plugin_store::Builder::default().build())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
