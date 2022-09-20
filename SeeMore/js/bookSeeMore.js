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
  const urlQuery = new URLSearchParams(getID);
  const bookSection = urlQuery.get("sb");
  
  console.log(bookSection);
  
  
sectionLoader(".card-ul");

function sectionLoader(loaderSectionClass) {
  const contentLoader = document.querySelectorAll(loaderSectionClass);
  contentLoader.forEach((e) => {
    e.innerHTML = `
    <div class="loader loader--style6">
    <div class = "loader-wrapper">
    <lord-icon
    src="https://cdn.lordicon.com/wxnxiano.json"
    trigger="loop"
    colors="primary:#ffffff,secondary:#ffffff"
    stroke="47"
    style="width: 100%; height: 100%"
  ></lord-icon>
  </div>
</div>`
  })

}



  var ref = firebase.database().ref("movies");
  accType(bookSection);


  function accType(sectionType){
        ref.orderByChild("typeBook").equalTo(sectionType).once("value")
       
  .then(function(snapshot) {
    snapshot.forEach(function(Snapshot) {
        // const key = snapshot.key;
        const movieDescriptions = Snapshot.val().movieDescription;
        const bookName = Snapshot.val().relatedBookName;
        const type = Snapshot.val().typeBook;
        const movieID = Snapshot.key;
        const bookCardImage = Snapshot.val().bookCardImage;
        
        document.title = bookSection;
    
        displayBookCard(bookSection);

          // BookS See More

          const bookContent =  document.querySelector('.catg-name');
          bookContent.innerHTML = `           
          <h1 class="card-heading">${bookSection}</h1>
        `
          function displayBookCard(bookSectionName){
            const individualSection = document.querySelector(".card-ul");
            if(type == bookSectionName){
              individualSection.innerHTML += `
               <li> <div  class="individual-card">
          
               <div class="wishlist-main">
                 <div class="wishlist-container">
                   <div class="wishlist">
                     <i class="fas fa-bookmark"></i>
                   </div>
                   <div class="circle">
                     <div class="heart heart-active" role="button" aria-labelledby = ${movieID} aria-pressed = "false">
                       <i class="fas fa-heart" ></i>
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

wishlistIcon(document.querySelector('.search-bar'))