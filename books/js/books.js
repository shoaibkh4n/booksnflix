var firebaseConfig = {
    apiKey: "AIzaSyBW1gvponknATBhmaclEIYXh6bdVPJZs78",
    authDomain: "booksandflix-82d60.firebaseapp.com",
    projectId: "booksandflix-82d60",
    storageBucket: "booksandflix-82d60.appspot.com",
    messagingSenderId: "871600227959",
    appId: "1:871600227959:web:46b96bb69c6fe64d03a872",
    measurementId: "G-1BB1S350KS"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const getID = location.search;
  const urlQuery = new URLSearchParams(getID);
  const movieIDs = parseInt(urlQuery.get("bookID"));
  
  firebaseDB(movieIDs);

function firebaseDB(movieID){
  var ref = firebase.database().ref("movies/"+movieID);
    ref.once("value")
  .then(function(Snapshot) {
      // const key = snapshot.key;
      const movieDescriptions = Snapshot.val().movieDescription;
      const bookName = Snapshot.val().relatedBookName;
      const movieFullImage = Snapshot.val().movieFullImage;
      const ottLink = Snapshot.val().ottLink;
      const platform = Snapshot.val().platform;
      const eBook = Snapshot.val().linkOnlineBook;
      const yearOfPublication= Snapshot.val().yearOfPublication;      ;
      const totalPages = Snapshot.val().totalPages;      ;
      const genre = Snapshot.val().genre;
      const bookAuthor = Snapshot.val().bookAuthor;
      const rating = Snapshot.val().movieRating;
      document.title = bookName;

      const content =  document.querySelector('.container');

        content.innerHTML = `           
     <img src="${movieFullImage}" alt="Snow">
     <div class="wraper-container">
     
     <p class="desc1 ">${bookName}</p>
     <p class="desc2">
     ${bookAuthor}&nbsp•&nbsp${yearOfPublication}&nbsp•&nbsp${totalPages}&nbsppages&nbsp•&nbsp${genre}&nbsp•&nbsp<span class="star"><i class="fas fa-star"></i></span> ${rating}
       <br><br>${movieDescriptions}</p>
     <h2 class="h-secondary">Available On:</h2>
     <div class="button-wrap">
    <a href="${ottLink}" target="_blank" class="btn2"><i class="far fa-play-circle"></i>&nbsp${platform} </a>
     <a href="${eBook}" target="_blank" class="btn"><i class="fas fa-book-open"></i>&nbsp&nbspEBook </a>
   </div>
   </div>
      `
});
}

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
  searchForm.action = `../Search/searchbook.html?searchbook=${filteredValue}`;
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