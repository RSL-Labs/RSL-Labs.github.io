//MUSIC LOADER TO GET ALBUM INFO FROM SEPARATE ALBUM DATABASES

function loadMusicData(){
	//this must contain the shorthand name of each album in the order you want it to load
	//names of actual indices are NAME+"_data.js"
	let album_data_index = ["cv","tbs","s_teou","bitwise"]
	let parsed_data = []

	for(let entry of album_data_index){
		let album_directory = window[entry+"_data"].directory
		let new_album = {
			name: window[entry+"_data"].name,
			trackHtml: window[entry+"_data"].trackHtml,
			art:album_directory+"songs/art/"+window[entry+"_data"].art,
			directory:album_directory,
			data:[],
		}

		window[entry+"_data"].data.forEach((e,index) =>
			{
				let new_track = {
						track: index+1, 
						name: e.name, 
						songPath: new_album.directory+"songs/mp3/"+e.songPath, 
						artPath: new_album.directory+"songs/art/"+e.artPath,
						lyricPath: new_album.directory+"songs/"+e.lyricPath,
						tracklistData: [],
					}

				e.tracklistData.forEach((f) => new_track.tracklistData.push(f))

				new_album.data.push(new_track)
			}
		)

		parsed_data.push(new_album)	
	}

	return parsed_data

}

