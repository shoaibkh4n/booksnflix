import { wishlistIcon , toggleHeart} from "../../wishlist.js";

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
  let urlQuery = new URLSearchParams(getID);
  const movieSection = urlQuery.get("sm");
  const platformSection = urlQuery.get("sp");

  sectionLoader(".card-ul");

  function sectionLoader(loaderSectionClass) {
    const contentLoader = document.querySelectorAll(loaderSectionClass);
    contentLoader.forEach((e) => {
      e.innerHTML = `
      <div class="loader loader--style6">
      <div class = "loader-wrapper">
      <lord-icon
      src="https://cdn.lordicon.com/rzrkjbrm.json"
      trigger="loop"
      stroke="47"
      colors="primary:#ffffff,secondary:#ffffff"
      style="width: 100%; height: 100%"
    >
    </lord-icon>
    </div>
  </div>`
    })
  
  }
  //End

  var ref = firebase.database().ref("movies");

  if(urlQuery.has("sm")){
    accType("type",movieSection);
    console.log(movieSection);
  }

  if(urlQuery.has("sp")){
    accPlatform("platform",platformSection);
    console.log(platformSection);
  }
  

// For Movie Section
  function accType(refType,sectionType){
        ref.orderByChild(refType).equalTo(sectionType).once("value")
       
  .then(function(snapshot) {
    snapshot.forEach(function(Snapshot) {
        // const key = snapshot.key;
        const movieDescriptions = Snapshot.val().movieDescription;
        const movieName = Snapshot.val().movieName;
        const type = Snapshot.val().type;
        const cardImage = Snapshot.val().cardImage;
        const movieID = Snapshot.key;

        document.title = movieSection;
      
        
        displayMovieCard(movieSection);


        const movieContent =  document.querySelector('.catg-name');
        movieContent.innerHTML = `           
        <h1 class="card-heading">${movieSection}</h1>
      `

        function displayMovieCard(sectionName){
          const individualSection = document.querySelector(".card-ul");
            if(type == sectionName){
              individualSection.innerHTML += `
               <li> <div  class="individual-card">
          
               <div class="wishlist-main">
                 <div class="wishlist-container">
                   <div class="wishlist">
                     <i class="fas fa-bookmark"></i>
                   </div>
                   <div class="circle">
                     <div class="heart heart-active" role="button" aria-labelledby = ${movieID} aria-pressed = "false">
                       <i class="fas fa-heart"></i>
                     </div>
                   </div>
                 </div>
               </div>
             <a href="../movies/html/index.html?movieID=${movieID}" class="card-redirect">
          
             <div class="cards trans">
               <img loading ="lazy" src="${cardImage}" alt="image" class="card-img">
               <div class="card-content">
               <h2 class="card-title">${movieName}</h2>
               <p class="card-desc">${movieDescriptions}</p>
             </div>
             </div>
           </a>
             </div>
           </li> 
               `
               }
          }


  });
}).then(() => {
  const loader = document.querySelectorAll('.loader');
  loader.forEach(function (e) {
    e.style.display = "none";
  })

  const bookmark = document.querySelectorAll('.fa-bookmark');
  const circle = document.querySelectorAll('.circle');
  const heart = document.querySelectorAll('.heart');
  
  toggleHeart(circle,heart,document.querySelector('.search-bar'));
  toggleHeart(bookmark,heart,document.querySelector('.search-bar'))

});
}

//Movie Sectin End


//For Platform Section

function accPlatform(refType,sectionType){
  ref.orderByChild(refType).equalTo(sectionType).once("value")
 
.then(function(snapshot) {
snapshot.forEach(function(Snapshot) {
  // const key = snapshot.key;
  const movieDescriptions = Snapshot.val().movieDescription;
  const movieName = Snapshot.val().movieName;
  const platform = Snapshot.val().platform;
  const cardImage = Snapshot.val().cardImage;
  const movieID = Snapshot.key;
  
  document.title = platformSection;


  displayPlatformCard(platformSection);


  //   //Platform Start
    const platformContent =  document.querySelector('.catg-name');
    platformContent.innerHTML = `           
    <h1 class="card-heading">${platformSection}</h1>
  `

    function displayPlatformCard(sectionName){
      const individualSection = document.querySelector(".card-ul");
        if(platform == sectionName){
          individualSection.innerHTML += `
           <li> <div  class="individual-card">
      
           <div class="wishlist-main">
             <div class="wishlist-container">
               <div class="wishlist">
                 <i class="fas fa-bookmark"></i>
               </div>
               <div class="circle">
                 <div class="heart heart-active" role="button" aria-labelledby = ${movieID} aria-pressed = "false">
                   <i class="fas fa-heart"></i>
                 </div>
               </div>
             </div>
           </div>
         <a href="../movies/html/index.html?movieID=${movieID}" class="card-redirect">
      
         <div class="cards trans">
           <img loading ="lazy" src="${cardImage}" alt="image" class="card-img">
           <div class="card-content">
           <h2 class="card-title">${movieName}</h2>
           <p class="card-desc">${movieDescriptions}</p>
         </div>
         </div>
       </a>
         </div>
       </li> 
           `
           }
      }
    // Platform End

});
}).then(() => {
  const loader = document.querySelectorAll('.loader');
  loader.forEach(function (e) {
    e.style.display = "none";
  })

  const bookmark = document.querySelectorAll('.fa-bookmark');
  const circle = document.querySelectorAll('.circle');
  const heart = document.querySelectorAll('.heart');
  
  toggleHeart(circle,heart,document.querySelector('.search-bar'));
  toggleHeart(bookmark,heart,document.querySelector('.search-bar'))
});
}

wishlistIcon(document.querySelector('.search-bar'))

