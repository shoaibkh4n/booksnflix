const searchBtn = document.querySelector('.search-btn');
const searchInput = document.querySelector('#myinput');
const searchForm = document.querySelector('#form');

const microphone = document.querySelector(".search-using-microphone");
const closeMicrophone = document.querySelector(".close");
const microphoneIcon = document.querySelector(".microphone-icon");
const HTMLDom = document.documentElement;

//Search Button Event Listener
searchBtn.addEventListener('click',(e)=>{
    if(searchInput.value != ''){
  const searchInputValue = searchInput.value;
  const filteredValue = searchInputValue.replace(/\s/g , '+');
  searchForm.action = `/Search/search.html?search=${filteredValue}`;
    }
    else{
        e.preventDefault();
    }
})
//Search Input Event Listener
searchInput.addEventListener("keydown", e=> {
    if(e.code=="Enter"){
        searchBtn.click();       
    }
})

window.addEventListener("keyup", e=>{
    // Press / Slash to focus on input (Search Bar)
    if(e.keyCode == 191){
        searchInput.focus();
    }
})

// Speech/ Voice Search using web speech Api

const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition ;

if(speechRecognition){
    console.log("Browser Supports VoiceSearch");
    searchForm.insertAdjacentHTML('afterbegin','<div class = "microphone"><img src="https://img.icons8.com/material-rounded/24/000000/microphone.png"/></div>');

    const voiceSearch = new webkitSpeechRecognition() || new SpeechRecognition();

    const microphoneBtn = document.querySelector('.microphone');

    closeMicrophone.addEventListener('click',stopMicrophone);
    microphoneIcon.addEventListener('click',stopMicrophone);

    microphoneBtn.addEventListener('click', ()=>{
        voiceSearch.start();
    
    })


    function stopMicrophone(){
            voiceSearch.stop();
    }

    voiceSearch.addEventListener('start',()=>{
        microphone.style.display = "flex";
        HTMLDom.style.overflowY = "hidden";
        console.log("SpeechRecognition is listening...");
    })

    voiceSearch.addEventListener('end',()=>{
        microphone.style.display = "none";
        HTMLDom.style.overflowY = "visible";
        console.log("SpeechRecognition is stoped...");
    })
    
voiceSearch.addEventListener('result',(result)=>{
    console.log(result);
    const resultValue = result.results[0][0].transcript;
    searchInput.value = resultValue ;
    searchInput.focus();
    setTimeout(() => {
        searchBtn.click();
    }, 900);

})

}else{
    console.log("Browser Doesnt support VoiceSearch");
}

