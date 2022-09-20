const searchBtn = document.querySelector('.search-btn');
const searchInput = document.querySelector('#myinput');
const searchForm = document.querySelector('#form');

const microphone = document.querySelector(".search-using-microphone");
const closeMicrophone = document.querySelector(".close");
const microphoneIcon = document.querySelector(".microphone-icon");
const HTMLDom = document.querySelector(".MnVnmUYHKKPU");
const searchBar = document.querySelector('.search-bar');

let navList = document.querySelector('.list-item');

//Search Button Event Listener
searchBtn.addEventListener('click',(e)=>{
    if(searchInput.value != ''){
  const searchInputValue = searchInput.value;
  const filteredValue = searchInputValue.replace(/\s/g , '+');
  searchForm.action = `../Search/search.html?search=${filteredValue}`;
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
window.addEventListener('load',()=>{
    
    window.addEventListener('scroll', scrollHide);
    const slashHelpContainer = document.createElement('div');
    slashHelpContainer.setAttribute('class','help-box');
    slashHelpContainer.textContent = "'Press Slash (/) to search or to move to Top'";
    const helpElement = document.body.appendChild(slashHelpContainer);


    function scrollHide(){
        if (document.documentElement.scrollTop > 350 && document.body.clientWidth > 810) {
            helpElement.style.top = "15px";
        }
        if (document.documentElement.scrollTop < 200 && document.body.clientWidth > 810) {
            helpElement.style.top = "-50%";
        }
        
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

// color picker for background color and font;

searchBar.insertAdjacentHTML('beforebegin',`
<button class="color-picker">
<img class = "color-picker-image" src="/images/color-picker.png" alt="color-picker">

<div class="choose-colors">
  <h2>Choose background color and font color according to you🤗:</h2>
  <hr>
  <div class="color background-choose">
    <label for="background-color">Choose Background Color:</label>
    
    <input type="color" autocomplete="off" value="#141e30" name="color" id="background-color-1">
    <input type="color" autocomplete="off" value="#411F9E" name="color" id="background-color-2">
    
  </div>
  <hr>
  <div class=" color font-choose">
    <label for="font-color">Choose Body Font Color:</label>
    <input type="color" value="#bf3178" name="font-color" id="font-color">
  </div>
  <hr>
  <div class=" color font-nav-choose">
    <label for="font-color">Choose Nav Font Color:</label>
    <input type="color" value="#bf3178" name="font-nav-color" id="font-nav-color">
  </div>
  <div class = "reset-colors">Reset</div>
</div>
</button>`);


// background color picker and font Color and Nav font color start

const backgroundColor1Picker = document.querySelector('#background-color-1');
const backgroundColor2Picker = document.querySelector('#background-color-2');
const fontColor = document.querySelector('#font-color');
const fontNavColor = document.querySelector('#font-nav-color');
const resetColors = document.querySelector('.reset-colors'); 

// function for gradient background
function gradient(){
    const backgroundColor1 = backgroundColor1Picker.value;
    const backgroundColor2 = backgroundColor2Picker.value;
    document.body.style.background = `linear-gradient(to top , ${backgroundColor1} ,${backgroundColor2})`;
    document.body.style.backgroundAttachment = "fixed";
    localStorage.setItem('BACKGROUND_COLOR_1', backgroundColor1);
    localStorage.setItem('BACKGROUND_COLOR_2', backgroundColor2);
}

function defaultFontColor(className,color){
    document.querySelectorAll(className).forEach((e)=>{
        e.style.color = color;
    })
}

// event Listner on all inputs
backgroundColor1Picker.addEventListener('input',gradient);
backgroundColor2Picker.addEventListener('input',gradient);

fontColor.addEventListener('input',(e)=>{
    const choosedFontColor = e.target.value;
    function chooseFontColor(className){
        document.querySelectorAll(className).forEach((e)=>{
            e.style.color = choosedFontColor;
            
        })
    }
    chooseFontColor('.card-heading');
    localStorage.setItem('FONT_COLOR', choosedFontColor);
})
fontNavColor.addEventListener('input',(e)=>{
    const choosedNavFontColor = e.target.value;
    function chooseFontColor(className){
        document.querySelectorAll(className).forEach((e)=>{
            e.style.color = choosedNavFontColor;
        })
    }
    chooseFontColor('.font-color');
    localStorage.setItem('FONT_NAV_COLOR', choosedNavFontColor);
})

//Event Listener on reset button to reset property
resetColors.addEventListener('click',()=>{

    document.body.style.background = `linear-gradient(to top , #243b55 ,#141e30)`;
    document.body.style.backgroundAttachment = "fixed";
    localStorage.removeItem('BACKGROUND_COLOR_1');
    localStorage.removeItem('BACKGROUND_COLOR_2');
    localStorage.removeItem('FONT_COLOR');
    localStorage.removeItem('FONT_NAV_COLOR');
    defaultFontColor('.card-heading',"#ffffff");
    defaultFontColor('.font-color',"#c1c4ca");

})

// Property to get item from local Storage and set that to background
const backgroundColor1Storage = localStorage.getItem('BACKGROUND_COLOR_1');
const backgroundColor2Storage = localStorage.getItem('BACKGROUND_COLOR_2');
const fontColorStorage = localStorage.getItem('FONT_COLOR');
const fontNavColorStorage = localStorage.getItem('FONT_NAV_COLOR');

//Set background color and fixed its position and set the value of background color input according to local storage value;
document.body.style.background = `linear-gradient(to top , ${backgroundColor1Storage} ,${backgroundColor2Storage})`;
defaultFontColor('.font-color',fontNavColorStorage);
defaultFontColor('.card-heading',fontColorStorage);
document.body.style.backgroundAttachment = "fixed";

backgroundColor1Picker.value = backgroundColor1Storage;
backgroundColor2Picker.value = backgroundColor2Storage;
fontColor.value = fontColorStorage;
fontNavColor.value = fontNavColorStorage;



// if the local storage doesnt have any value;
if(!(backgroundColor1Storage && backgroundColor2Storage)) {
    backgroundColor1Picker.value = "#990000";
    backgroundColor2Picker.value = "#1C1C1C";
}

if(!fontColorStorage){
    fontColor.value = "#C7C7C7";
}

if(!fontNavColorStorage){
    fontNavColor.value = "#EBF28D";
}


//color picker js ends😉


// if(document.body.clientWidth <= 810){
//     document.querySelector('.color-picker').style.display = "none";
// }