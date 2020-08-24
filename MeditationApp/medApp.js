const app=()=>{
  const song = document.querySelector('.song');
  const play = document.querySelector('.play');
  const outline= document.querySelector('.moving-outline circle');
  const video = document.querySelector('.vid-container video');
  const theme1=document.querySelector('.sound-picker');
  const time1=document.querySelector('.time-select');

  //sounds
  const sounds = document.querySelectorAll('.sound-picker button');
  const timeDisplay = document.querySelector('.time-display');

  const timeSelect = document.querySelectorAll('.time-select button');
  const time = document.querySelector('.time');
  const theme = document.querySelector('.theme');
  //length of outline
  const outlineLength = outline.getTotalLength();
  //duration
  let fakeDuration =60;
  let timeFlag=0;
  let themeFlag=0;
  outline.style.strokeDasharray=outlineLength;
  outline.style.strokeDashoffset=outlineLength;

  //play sounds
  play.addEventListener('click', ()=>{
    checkPlaying(song);
  });

  time.addEventListener('click',()=>{


    if(timeFlag==0){
      if(themeFlag==1){
        theme1.style.display="none";
        themeFlag=0;
      }
      time1.style.display="inline-block";
      timeFlag=1;
    }else{
      time1.style.display="none";
      timeFlag=0;
    }
  });

  theme.addEventListener('click',()=>{

    if(themeFlag==0){
      if(timeFlag==1){
        time1.style.display="none";
        timeFlag=0;
      }
      theme1.style.display="inline-block";
      themeFlag=1;
    }else{
      theme1.style.display="none";
      themeFlag=0;
    }
  })

  timeSelect.forEach(option =>{
    option.addEventListener('click', function(){
      if(this.id=='custom'){
        var time = prompt("Enter the desired timing in minutes");
        this.setAttribute("data-time",time*60);
      }
      fakeDuration = this.getAttribute("data-time");
      song.currentTime=0;
      timeDisplay.innerHTML = Math.floor(fakeDuration/60)+":"+Math.floor(fakeDuration%60);
    });
  });

  sounds.forEach(sound=>{
    sound.addEventListener('click',function() {
      song.src=this.getAttribute("data-sound");
      video.src=this.getAttribute("data-video");
      song.currentTime=0;
      song.pause();
      play.src="svg/play.svg";
      // checkPlaying(song);
    })
  })

  const checkPlaying= song =>{
    if(song.paused){
      song.play();
      video.play();
      play.src="svg/pause.svg";
    }
    else{
      song.pause();
      video.pause();
      play.src="svg/play.svg";
    }
  }

  //animating the circle
  song.ontimeupdate = () =>{
    let currentTime= song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed%60);
    let minutes = Math.floor(elapsed/60);

    //animation
    let progress = outlineLength - (currentTime/fakeDuration)*outlineLength;
    outline.style.strokeDashoffset=progress;
    //animate text
    timeDisplay.innerHTML = minutes+':'+seconds;

    if(currentTime>=fakeDuration){

      song.pause();
      song.currentTime=0;
      video.pause();
      play.src = "svg/play.svg";

    }
  }

};

app();
