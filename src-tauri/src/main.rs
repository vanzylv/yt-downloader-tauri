use rusty_ytdl::{Video, VideoDetails};
use rusty_ytdl::search::YouTube;
use rusty_ytdl::search::Video as SearchVideo;
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

#[tauri::command]
async fn download() -> VideoDetails {
    let video_url = "https://www.youtube.com/watch?v=FZ8BxMU3BYc"; // FZ8BxMU3BYc works too!
    let video = Video::new(video_url).unwrap();
    let video_info = video.get_info().await.unwrap();
    println!("{:#?}", video_info);
    return video_info.video_details;
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
