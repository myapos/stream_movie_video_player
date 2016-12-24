let movies={
"1": "https://bigcdn.ia3el9bj6x2jcckb4mr8.com/cdnfast1/luq4w7gru3ixexzw6vqlpiuir2r24tumzdb4lxrs36hlp3i4dz7mkft6bvia/low.mp4",
"2": "https://bigcdn.ia3el9bj6x2jcckb4mr8.com/cdnfast1/luq4wpfai7ixexzw6vs3f7u6rbcl2icqtiouyi7g5bijbcsnotv7isrrp5qq/normal.mp4",
"3": "https://bigcdn.ia3el9bj6x2jcckb4mr8.com/cdnfast1/luq4qyjhghixexzw6uw3fj4g26jrpvezpnhpl5uj6lzko3vmy3ulb5jay5ba/normal.mp4"
};
//console.log(movies);
let videoplayer =  this.document.getElementById("myMoviePlayer");
var paused = 0;
var subsAlreadyLoaded = 0;
const init = () => {
	let videoplayer =  this.document.getElementById("myMoviePlayer");

	videoplayer.addEventListener("loadstart", () => {
	    let vidplayer = document.getElementById("myMoviePlayer");
	    vidplayer.style.backgroundImage = "url('../../stream_movie_video_player/images/loading2.gif')";
	});

	videoplayer.addEventListener("canplay", () => {
	    let vidplayer = document.getElementById("myMoviePlayer");
	    vidplayer.style.backgroundImage = "url('')";
	});
	
	videoplayer.src = movies["1"];

}

const selectMovie =() => {
	let selection = this.document.getElementById("selectBox").value;
	console.log(selection);
	let videoplayer =  this.document.getElementById("myMoviePlayer");
	loadsubs(videoplayer,selection);
	videoplayer.src = movies[selection];
}

const pauseMovie = () => {
	let videoplayer =  this.document.getElementById("myMoviePlayer");
	if(!paused){
		videoplayer.pause(); 
		paused = 1;
	}
	else{
		videoplayer.play(); 
		paused = 0;
	}
}

const loadsubs = (videoplayer,selection) => {

	if(selection === "2"){
			   if(videoplayer.childNodes[3]){
			   	console.log("removing previous subs from.....",videoplayer);
				videoplayer.removeChild(videoplayer.childNodes[3]);
			   }

			   console.log("hey subs are loading in",videoplayer);
			   let track = document.createElement("track"); 
			   track.kind = "subtitles"; 
			   track.label = "Greek"; 
			   track.srclang = "gr"; 
			   track.src = "./subs/The_Desolation_of_Smaug.vvt"; 
			   videoplayer.appendChild(track);
	}

	else if(selection === "3"){
		       
			   if(videoplayer.childNodes[3]){
			   	console.log("removing previous subs from.....",videoplayer);
				videoplayer.removeChild(videoplayer.childNodes[3]);
			   }
			   console.log("hey subs are loading in",videoplayer);
			   let track = document.createElement("track"); 
			   track.kind = "subtitles"; 
			   track.label = "Greek"; 
			   track.srclang = "gr"; 
			   track.src = "./subs/Battle_of_the_Five_Armies.vvt"; 
			   videoplayer.appendChild(track);
	}

	else {
			//remove subs track for the other movies
			if(videoplayer.childNodes[3])
				videoplayer.removeChild(videoplayer.childNodes[3]);

	}

	return videoplayer;
}

