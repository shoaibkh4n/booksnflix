import { getItem , bookListItems , movieListItems } from "../wishlist.js";
import { deleteItem } from "./deleteWishlist.js";

const firebaseConfig = {
    apiKey: "AIzaSyBW1gvponknATBhmaclEIYXh6bdVPJZs78",
    authDomain: "booksandflix-82d60.firebaseapp.com",
    projectId: "booksandflix-82d60",
    storageBucket: "booksandflix-82d60.appspot.com",
    messagingSenderId: "871600227959",
    appId: "1:871600227959:web:46b96bb69c6fe64d03a872",
    measurementId: "G-1BB1S350KS"
  };

  const numberOfResults = document.querySelector(".search-results-numbers");
  const noresult =  document.querySelector(".no-result")

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  sectionLoader(".card-ul");
  const virtualContainer = document.createElement('div');
  virtualContainer.classList.add('virtual-box');
  document.body.appendChild(virtualContainer);


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

  ref.once("value")

  .then(function searchData(snapShot){
    
    
    const snap = snapShot.val();
    const object = Object.entries(snap);
    const bookwishlistData = bookListItems();
    const moviewishlistData = movieListItems();
    const wishlistData = bookListItems().length + movieListItems().length;

    searchLength(wishlistData);
    movieItemsLength(moviewishlistData);
    bookItemsLength(bookwishlistData)

    object.forEach(entry=>{

      const movieID = entry[0];
      const movieData = entry[1];
      const cardImage = movieData.cardImage;
      const movieDescriptions = movieData.movieDescription;
      const movieName = movieData.movieName;
      const bookCardImage = movieData.bookCardImage;
      const bookName = movieData.relatedBookName;

      moviewishlistData.forEach(data => {

        if(data.id == movieID){

        displayCard(".searchresults");

              function displayCard(classID){
                  const individualSection = document.querySelector(classID);
                  individualSection.innerHTML += `
                  
                  <li> <div  class="individual-card">
                  <div class="wishlist-main">
                      <div class="wishlist-container">
                      <div class="wishlist">
                      <i class="fas fa-trash"></i>
                      </div>
                      <div class="circle">
                          <div class="heart heart-active" role="button" aria-labelledby = ${movieID} aria-pressed = "false">
                          <i class="fas fa-eraser"></i>
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
          };
      })

      bookwishlistData.forEach(data => {

        if(data.id == movieID){

        displaybooksCard(".books-wishlist-display");

            function displaybooksCard(classID){
              const individualSection = document.querySelector(classID);
              individualSection.innerHTML += `
              
              <li> <div  class="individual-card">
          
               <div class="wishlist-main">
                 <div class="wishlist-container">
                   <div class="wishlist">
                     <i class="fas fa-trash"></i>
                   </div>
                   <div class="circle">
                     <div class="heart heart-active" role="button" aria-labelledby = ${movieID} aria-pressed = "false">
                       <i class="fas fa-eraser"></i>
                     </div>
                   </div>
                 </div>
               </div>
             <a href="../books/books.html?bookID=${movieID}" class="card-redirect">
          
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
          };
      })


    })
    document.querySelector('.book-items').addEventListener('click',()=>{
      document.querySelector('.movie-items').classList.remove('btn-active-list')
      document.querySelector('.book-items').classList.add('btn-active-list');
      document.querySelector('.books-wishlist').style.display = "flex";
      document.querySelector('.movies-wishlist').style.display = "none";
      history.pushState({page: 1}, "title 1", "?books")
    })
    document.querySelector('.movie-items').addEventListener('click',()=>{
        document.querySelector('.book-items').classList.remove('btn-active-list');
        document.querySelector('.movie-items').classList.add('btn-active-list');
      
      document.querySelector('.books-wishlist').style.display = "none";
      document.querySelector('.movies-wishlist').style.display = "flex";
      history.pushState({page: 1}, "title 1", "?movies")
    })
  })
  
  .then(() => {
    const loader = document.querySelectorAll('.loader');
    loader.forEach(function (e) {
      e.style.display = "none";
    })
    const deleteBookmark = document.querySelectorAll('.fa-trash');
    const circle = document.querySelectorAll('.circle');
    const heart = document.querySelectorAll('.heart');
    const listItems = document.querySelectorAll('.card-ul li')

    deleteItem(deleteBookmark,heart,listItems);
    deleteItem(circle,heart,listItems);
  
  })

  function searchLength(results){
    if(results == 0){
     numberOfResults.innerHTML = ''
     noresult.style.display = "flex"
     document.querySelector('.options').style.display = "none";
     document.querySelector('.card-ul').innerHTML = "";
     document.querySelector('.books-wishlist-display').innerHTML = "";
     noresult.innerHTML = `
     <img src="../images/notfound.svg" alt="Nothing in your wishlist">
     `;
    }else if(results == 1){
      document.querySelector('.options').style.display = "flex";
      numberOfResults.innerHTML = `(Only ${results} item in your wishlist )`
    }else {
      document.querySelector('.options').style.display = "flex";
      numberOfResults.innerHTML = `(${results} items in your wishlist )`
    }
  }

  function movieItemsLength(results){
    if(results.length == 0){
      document.querySelector('.movie-items').style.display = "none";
      setTimeout(()=>{
        document.querySelector('.book-items').click();
      },100)
    }
  }

  function bookItemsLength(results){
    if(results.length == 0){
      document.querySelector('.book-items').style.display = "none";
      setTimeout(()=>{
        document.querySelector('.movie-items').click();
      },100)
    }
  }



if(window.location.search == "?books"){
  document.querySelector('.movie-items').classList.remove('btn-active-list')
  document.querySelector('.book-items').classList.add('btn-active-list');
  document.querySelector('.books-wishlist').style.display = "flex";
  document.querySelector('.movies-wishlist').style.display = "none";
}else{
  document.querySelector('.book-items').classList.remove('btn-active-list');
  document.querySelector('.movie-items').classList.add('btn-active-list');
  document.querySelector('.books-wishlist').style.display = "none";
  document.querySelector('.movies-wishlist').style.display = "flex";
}

export {searchLength}
