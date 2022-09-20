import { toggleHeart } from "../../wishlist.js";
import { wishlistIcon } from "../../wishlist.js";

const searchForm = document.querySelector('.search-bar');
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


  sectionLoader(".card-ul");

  function sectionLoader(loaderSectionClass) {
    const contentLoader = document.querySelectorAll(loaderSectionClass);
    contentLoader.forEach((e) => {
      e.innerHTML = `
      <div class="loader loader--style6">
      <div class = "loader-wrapper">
      <svg version="1.1" id="L7" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
   <path fill="#fff" d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3
    c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z">
        <animateTransform 
           attributeName="transform" 
           attributeType="XML" 
           type="rotate"
           dur="2s" 
           from="0 50 50"
           to="360 50 50" 
           repeatCount="indefinite" />
    </path>
   <path fill="#fff" d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7
    c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z">
        <animateTransform 
           attributeName="transform" 
           attributeType="XML" 
           type="rotate"
           dur="1s" 
           from="0 50 50"
           to="-360 50 50" 
           repeatCount="indefinite" />
    </path>
   <path fill="#fff" d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5
    L82,35.7z">
        <animateTransform 
           attributeName="transform" 
           attributeType="XML" 
           type="rotate"
           dur="2s" 
           from="0 50 50"
           to="360 50 50" 
           repeatCount="indefinite" />
    </path>
  </svg>
    </div>
  </div>`
    })
  
  }
  var ref = firebase.database().ref("movies");




  async function referenceSection(types,limitTill){
    await ref.orderByChild("typeBook").equalTo(types).limitToFirst(limitTill).once("value")
    
  .then(function(snapshot) {
    snapshot.forEach(function(Snapshot) {
      const type = Snapshot.val().typeBook;
      // const key = snapshot.key;
      const bookCardImage = Snapshot.val().bookCardImage;
      const movieID = Snapshot.key;
      const movieDescriptions = Snapshot.val().movieDescription;
      const bookName = Snapshot.val().relatedBookName;

      displayCard(".classicsSeemore",".classics","Classics");
      displayCard(".bestsellerSeemore",".bestseller", "BestSeller");
      displayCard(".dramaSeemore",".drama", "Drama" );
      displayCard(".crimeSeemore",".crime", "Crime" );
      displayCard(".horrorSeemore",".horror", "Horror" );
      displayCard(".adventureSeemore", ".adventure", "Adventure");
      displayCard(".scifiSeemore",".scifi", "Sci-Fi" );
      displayCard(".biographySeemore", ".biography", "Biography");
      displayCard(".comedySeemore",".comedy", "Comedy" );
      displayCard(".thrillerSeemore",".thriller", "Thriller" );
      displayCard(".fictionSeemore",".fiction", "Fiction" );

      function displayCard(seeMore,classID,sectionName){
        const seeMoreSection = document.querySelector(seeMore);
        seeMoreSection.innerHTML= `<a href="../SeeMore/bookseemore.html?sb=${sectionName}" ><span class="show-more">See more <i class="fas fa-angle-double-right show-more-arrow"></i></span></a>`

        const individualSection = document.querySelector(classID);
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
         <a href="books.html?bookID=${movieID}" class="card-redirect">
      
         <div class="cards trans">
           <img loading ="lazy" src="${bookCardImage}" alt="image" class="card-img">
           <div class="card-content">
           <h2 class="card-title">${bookName}</h2>
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

});
  }


let promises = [];
// for loop to render multiple card accoring to section name
let category = ["Classics","BestSeller","Drama","Crime","Biography","Fiction","Adventure","Sci-Fi","Horror","Thriller","Comedy"];
for (let section = 0; section < category.length; section++) {
  promises.push(referenceSection(category[section], 10));

}

//Self CAlling asyn function that executes after all the promises is done
const afterAllDone = async function(){
  await Promise.all(promises);
      const bookmark = document.querySelectorAll('.fa-bookmark');
      const circle = document.querySelectorAll('.circle');
      const heart = document.querySelectorAll('.heart');
      await toggleHeart(circle,heart,searchForm);
      await toggleHeart(bookmark,heart,searchForm);
}();

// end
wishlistIcon(document.querySelector('.search-bar'))