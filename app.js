console.log("This is my Music Player"); 

//Initializing Variables
let gif = document.getElementById("gif");
let songIndex = 0;
let audioElement = new Audio("Songs/0.mp3");
let masterPlay = document.getElementById("masterPlay");
let masterForward = document.getElementById("masterForward");
let masterBackward = document.getElementById("masterBackward");
let myProgressBar = document.getElementById("myProgressBar");
let songItem = Array.from(document.getElementsByClassName("songContainer"));
let masterSongName = document.getElementById("songName");
let masterSongImg = document.getElementsByClassName("img");
let masterSong = document.getElementById("Current");
let Volume = document.getElementById("myVolumeBar");
let songs = [
    {songName: "Moon Deity - Neon-Blade", filePath: "Songs/0.mp3", coverPath: "Cover/0.jpg"},
    {songName: "After dark x Sweeter Weather", filePath: "Songs/1.mp3", coverPath: "Cover/1.jpg"},
    {songName: "Life in rio - Phonk", filePath: "Songs/2.mp3", coverPath: "Cover/2.jpg"},
    {songName: "Death is no more - Phonk", filePath: "Songs/3.mp3", coverPath: "Cover/3.jpg"},
    {songName: "Murder in my mind - Kordhell", filePath: "Songs/4.mp3", coverPath: "Cover/4.jpg"},
    {songName: "Poor Phonk", filePath: "Songs/5.mp3", coverPath: "Cover/5.jpg"},
    {songName: "Tuca Donka - Phonk", filePath: "Songs/6.mp3", coverPath: "Cover/6.jpg"},
    {songName: "Sleepwalker - Phonk", filePath: "Songs/7.mp3", coverPath: "Cover/7.jpg"},
    {songName: "Kerosene - Crystal Castle", filePath: "Songs/8.mp3", coverPath: "Cover/8.jpg"},
    {songName: "Empathy - Crystal Castle", filePath: "Songs/9.mp3", coverPath: "Cover/9.jpg"},
    {songName: "Lost down soul x Lost soul", filePath: "Songs/10.mp3", coverPath: "Cover/10.jpg"},
]

var makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName("songPlay")).forEach((element)=>{
        element.classList.remove("fa-pause-circle")
        element.classList.add("fa-play-circle")
        gif.style.visibility = "visible"
    })
}


songItem.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByTagName("span")[0].innerHTML= songs[i].songName;
})



//audio.play();

//Play/Pause
masterPlay.addEventListener("click", ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove("fa-play");
        masterPlay.classList.add("fa-pause");
        masterSongName.innerText = songs[songIndex].songName; 
        masterSongImg[0].src = songs[songIndex].coverPath;
        masterSong.style.opacity = 1
        gif.style.visibility = "visible"

        
    }else{
        audioElement.pause();
        masterPlay.classList.remove("fa-pause");
        masterPlay.classList.add("fa-play");
        gif.style.visibility = "hidden"
    }
})  


//Listen to events =>
audioElement.addEventListener("timeupdate",()=>{
    //Update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100)
    myProgressBar.value = progress;

})

//Volume Changer

Volume.addEventListener("change",()=>{
    audioElement.volume = Volume.value / 100;
    if (Volume.value > 50) {
        document.getElementById("volume-icon").classList.remove("fa-volume-xmark")
        document.getElementById("volume-icon").classList.remove("fa-volume-low")
        document.getElementById("volume-icon").classList.add("fa-volume-high")
    }
    else if (Volume.value > 0) {
    document.getElementById("volume-icon").classList.remove("fa-volume-high")
    document.getElementById("volume-icon").classList.remove("fa-volume-xmark")
    document.getElementById("volume-icon").classList.add("fa-volume-low")
    }
    else if (Volume.value <= 0) {
        audioElement.muted
        document.getElementById("volume-icon").classList.remove("fa-volume-high")
        document.getElementById("volume-icon").classList.remove("fa-volume-low")
        document.getElementById("volume-icon").classList.add("fa-volume-xmark")
    }
})

//Muted or Unmuted
document.getElementById("volume-icon").addEventListener("click", ()=>{
    audioElement.muted = !audioElement.muted;
    if (audioElement.muted) {
        audioElement.volume = parseInt(0)
        Volume.value = parseInt(0)
        document.getElementById("volume-icon").classList.replace("fa-volume-high", "fa-volume-xmark")
        document.getElementById("volume-icon").classList.replace("fa-volume-low", "fa-volume-xmark")
    }else{
        audioElement.volume = parseInt(1)
        Volume.value = parseInt(100)
        document.getElementById("volume-icon").classList.replace("fa-volume-xmark", "fa-volume-high")
    }
})  

//AutoPlay Next
audioElement.addEventListener("ended",()=>{
    if (songIndex >= 9) {
        songIndex = 0;
    }else{
        songIndex += 1;
    }
    masterSongName.innerText = songs[songIndex].songName;
    masterSongImg[0].src = songs[songIndex].coverPath;
    masterSong.style.opacity = 1
    audioElement.src = `Songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play()
})

myProgressBar.addEventListener("change",()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})


Array.from(document.getElementsByClassName("songPlay")).forEach((element)=>{
    element.addEventListener("click",(e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-play-circle")
        e.target.classList.add("fa-pause-circle")
        masterSongName.innerText = songs[songIndex].songName;
        masterSongImg[0].src = songs[songIndex].coverPath;
        gif.style.visibility = "visible"
        masterSong.style.opacity = 1
        masterPlay.classList.remove("fa-play");
        masterPlay.classList.add("fa-pause");
        audioElement.src = `Songs/${songIndex}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play()
    })
})

masterForward.addEventListener("click",(e)=>{
    if (songIndex >= 10) {
        songIndex = 0;
    }else{
        songIndex += 1;
    }
    gif.style.visibility = "visible"
    masterSongName.innerText = songs[songIndex].songName;
    masterSongImg[0].src = songs[songIndex].coverPath;
    masterSong.style.opacity = 1
    audioElement.src = `Songs/${songIndex}.mp3`;
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
    audioElement.currentTime = 0;
    audioElement.play()
})

masterBackward.addEventListener("click",()=>{
    if (songIndex <= 0) {
        songIndex = 10;
    }else{
        songIndex -= 1;
    }
    gif.style.visibility = "visible"
    masterSongName.innerText = songs[songIndex].songName;
    masterSongImg[0].src = songs[songIndex].coverPath;
    masterSong.style.opacity = 1
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
    audioElement.src = `Songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play()
})
