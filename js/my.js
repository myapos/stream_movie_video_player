let movies={
"1": "https://bigcdn.ia3el9bj6x2jcckb4mr8.com/cdnfast1/luq4w7gru3ixexzw6vqlpiuir2r24tumzdb4lxrs36hlo4kaum3n2jifvoxq/low.mp4",
"2": "https://bigcdn.ia3el9bj6x2jcckb4mr8.com/cdnfast1/luq4wmbhghixexzw6vs3f7u6rcsy3kzpgyyb3jnqh3apqrlwre77r3u2zt2a/normal.mp4",
"3": "https://bigcdn.ia3el9bj6x2jcckb4mr8.com/cdnfast1/luq4qyjhghixexzw6uw3fj4g26jrpvezpnhpl5uj6lzkp4xqpoqnsmb5vjwq/normal.mp4",
"4": "https://bigcdn.ia3el9bj6x2jcckb4mr8.com/cdn01/luq5zx4hn7ixexzw6v43dzmate7nm4dnosckynylazor2bc2hitprx3tcydq/normal.mp4"
};
//console.log(movies);
var videoplayer =  document.getElementById("myMoviePlayer");
var paused = 0;
var subsAlreadyLoaded = 0;
var stateFC = false;
var browser;
let nav = navigator.userAgent;
browser = nav.match(/Chromium/g) || nav.match(/Chrome/g) || nav.match(/Firefox/g);
console.log(browser);


/*AJAX request example*/
loadDoc = (url) => {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     document.getElementById("status").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

const init = () => {
	styleStatus();

	let videoplayer =  document.getElementById("myMoviePlayer");
	let status = document.getElementById('status');

	videoplayer.addEventListener("loadstart", () => {
	    let vidplayer = document.getElementById("myMoviePlayer");
	    let status = document.getElementById('status');
	    vidplayer.style.backgroundImage = "url('../../stream_movie_video_player/images/loading2.gif')";
	    status.innerHTML = "Loading movie.................";
	});

	videoplayer.addEventListener("canplay", () => {
	    let vidplayer = document.getElementById("myMoviePlayer");
	    let status = document.getElementById('status');
	    vidplayer.style.backgroundImage = "url('')";
	    status.innerHTML = "Playing now.................";
	});
	
	let loadFullScreenEvent="fullscreenchange";
	if(browser[0] == "Chromium" || browser[0] == "Chrome"){
		loadFullScreenEvent = "webkitfullscreenchange";
		videoplayer.addEventListener(loadFullScreenEvent, () => {
		stateFC = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;

		if (stateFC) {
		  //alert("Full screen enabled");
		  console.log("Full screen enabled");
		  styleStatus();
		}
	});
	}
	else if(browser[0] == "Firefox"){
		loadFullScreenEvent = "mozfullscreenchange";
		//Fix for firefox http://stackoverflow.com/questions/12284198/javascript-mozfullscreenchange-on-firefox
		//adding event listener to document not to the element
		document.addEventListener(loadFullScreenEvent, ()=> {
			console.log("added mozfullscreenchange to document");
			stateFC = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;

			if (stateFC) {
			  //alert("Full screen enabled");
			  console.log("Full screen enabled");
			}
		})
	}
videoplayer.src = movies["1"];

}

const setFullScreen = () => {
	//document.fullScreen = true;
	//debugger;
	let videoplayer = document.getElementById("myMoviePlayer");
	if(!stateFC){
		if(browser[0] == "Chromium" || browser[0] == "Chrome"){
			videoplayer.webkitRequestFullScreen();
			console.log("moving to fullScreen in Chrome");
			stateFC = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
		}
		else if(browser[0] == "Firefox"){
			videoplayer.mozRequestFullScreen();
			console.log("moving to fullScreen in Mozilla");
			stateFC = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
		}
	}
	else{
		
		if(browser[0] == "Chromium" || browser[0] == "Chrome"){
			videoplayer.webkitExitFullscreen();
			//document.ExitFullscreen();
			console.log("leaving fullScreen in Chrome");
			stateFC = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
		}
		else if(browser[0] == "Firefox"){
			videoplayer.mozExitFullscreen();
			//document.ExitFullscreen();
			console.log("leaving fullScreen in Mozilla");
			stateFC = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
		}
	}
		
	
}
const styleStatus = () => {
	//debugger;
	let videoplayer = document.getElementById("myMoviePlayer");
	let status = document.getElementById('status');
	/*Style dynamically status info*/
	let rect = videoplayer.getBoundingClientRect();
	let offsetTop = 0;
	let offsetLeft = 0;
	console.log("styling status:", rect.top, rect.right, rect.bottom, rect.left);
	//let status = document.getElementById('status');
	status.style.position = "absolute";
	status.style.left = rect.left + offsetLeft+"px";
	status.style.top = rect.top + offsetTop+"px";
	status.style.zIndex = "10000";
	
}

const selectMovie =() => {
	let selection = document.getElementById("selectBox").value;
	console.log(selection);
	let videoplayer =  document.getElementById("myMoviePlayer");
	loadsubs(videoplayer,selection);
	videoplayer.src = movies[selection];
}

const pauseMovie = () => {
	//debugger;
	let videoplayer =  document.getElementById("myMoviePlayer");
	let status = document.getElementById('status');

	if(!paused){
		videoplayer.pause(); 
		paused = 1;
		//videoplayer.style.backgroundImage = "url('../../stream_movie_video_player/images/pause.png')"
		status.innerHTML = "Paused.................";
/*		setTimeout( () => 
			{ 
				status.innerHTML = "";
		}, 3000);*/
	}
	else{
		videoplayer.play(); 
		paused = 0;
		//videoplayer.style.backgroundImage = "url('../../stream_movie_video_player/images/loading2.gif')";
		status.innerHTML = "Playing now.................";
/*		setTimeout( () => 
			{ 
				status.innerHTML = "";
		}, 3000);*/

	}
}

const loadsubs = (videoplayer,selection) => {
	//debugger;
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
	else if(selection === "4"){
		       
			   if(videoplayer.childNodes[3]){
			   	console.log("removing previous subs from.....",videoplayer);
				videoplayer.removeChild(videoplayer.childNodes[3]);
			   }
			   console.log("hey subs are loading in",videoplayer);
			   let track = document.createElement("track"); 
			   track.kind = "subtitles"; 
			   track.label = "Greek"; 
			   track.srclang = "gr"; 
			   track.src = "./subs/The_fellowship_of_the_ring .vvt"; 
			   videoplayer.appendChild(track);
	}
	else {
			//remove subs track for the other movies
			if(videoplayer.childNodes[3])
				videoplayer.removeChild(videoplayer.childNodes[3]);

	}

	return videoplayer;
}

