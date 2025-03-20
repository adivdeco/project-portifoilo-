

const  videocard = document.querySelector(".videocard")
const pro        = document.querySelector(".pro")

pro.addEventListener("mouseenter" , function(){
    videocard.style.display = "block"

})

pro.addEventListener("mouseleave" , function(){
    videocard.style.display = "none"
    videocard.innerHTML = ""
})


const showcase = document.querySelectorAll(".showcase")
showcase.forEach(function(elm1){
    elm1.addEventListener("mouseenter" , function(){

        let mediaSrc = elm1.getAttribute("data-image")
        videocard.innerHTML = "" ;

             // Check if the source is a video or an image
     if (mediaSrc.endsWith(".mp4")|| mediaSrc.endsWith(".webm") || mediaSrc.endsWith(".ogg")|| mediaSrc.endsWith(".mov")) {
                
        const video = document.createElement("video")
        video.src=mediaSrc
        video.autoplay = true
        video.muted=true
        video.loop=true
        video.style.width = "100%";
        video.style.height = "100%";
        video.style.objectFit = "cover";
    
           // Append the video to the videocard
        videocard.appendChild(video);
     }
     else if (mediaSrc.endsWith(".jpg") || mediaSrc.endsWith(".jpeg") || mediaSrc.endsWith(".png") || mediaSrc.endsWith(".gif")){
        const img = document.createElement("img");
        img.src = mediaSrc;
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = "cover";

        // Append the image to the videocard
        videocard.appendChild(img);
     }
    })
});
