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
  firebase.analytics();

  var ref = firebase.database().ref("movies");

  function referenceSection(types,limitTill){
    ref.orderByChild("type").equalTo(types).limitToLast(limitTill).once("value")
    
  .then(function(snapshot) {
    snapshot.forEach(function(Snapshot) {
      const type = Snapshot.val().type;
      const timeStamp = Snapshot.val().timeStamp;
      // const key = snapshot.key;
      const cardImage = Snapshot.val().cardImage;
      const movieID = Snapshot.key;
      const movieDescriptions = Snapshot.val().movieDescription;
      const movieName = Snapshot.val().movieName;
      const carousel = document.querySelector('.carousel-images');

      displayCard(".trendingSeemore",".trending","Trending");
      displayCard(".actionSeemore",".action", "Action");
      displayCard(".dramaSeemore",".drama", "Drama" );
      displayCard(".crimeSeemore",".crime", "Crime" );
      displayCard(".horrorSeemore",".horror", "Horror" );
      displayCard(".scifiSeemore",".scifi", "Sci-Fi" );
      displayCard(".comedySeemore",".comedy", "Comedy" );
      displayCard(".thrillerSeemore",".thriller", "Thriller" );

     function displayCard(seeMore,classID,sectionName){
        const seeMoreSection = document.querySelector(seeMore);
        seeMoreSection.innerHTML= `<a href="/SeeMore/seeMore.html?sm=${sectionName}" ><span class="show-more">See more <i class="fas fa-angle-double-right show-more-arrow"></i></span></a>`


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
                 <div class="heart heart-active">
                   <i class="fas fa-heart"></i>
                 </div>
               </div>
             </div>
           </div>
         <a href="movies/html/index.html?movieID=${movieID}" class="card-redirect">
      
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
  })
}).then(()=>{
    const bookmark = document.querySelectorAll('.fa-bookmark');
  const circle = document.querySelectorAll('.circle');
  const heart = document.querySelectorAll('.heart');
  function toggleHeart(targetElement){

    targetElement.forEach(function(i) {
     
        i.addEventListener('click', function(e) {
        const clickedBtnIndex = [...targetElement].indexOf(e.target);
        const he =heart[clickedBtnIndex].classList.add('added-to-wishlist');
        console.log(he)
        })
     });
}
toggleHeart(circle);
toggleHeart(bookmark);

}).then(()=>{
  const loader = document.querySelectorAll('.loader');
  loader.forEach(function(e){
    e.style.display = "none";
  })

})
  }



//Section Loader Function

sectionLoader(".card-ul");

  function sectionLoader(loaderSectionClass){
    const contentLoader = document.querySelectorAll(loaderSectionClass);
    contentLoader.forEach((e)=>{
      e.innerHTML = `
      <div class="loader loader--style2" title="1">
    <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    width="50px" height="50px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
    <path fill="#000" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
    <animateTransform attributeType="xml"
    attributeName="transform"
    type="rotate"
    from="0 25 25"
    to="360 25 25"
    dur="0.6s"
    repeatCount="indefinite"/>
    </path>
    </svg>
    </div>`
    })
    
  }
//End


  // for loop to render multiple card accoring to section name
  let category = ["Trending","Action","Drama","Crime","Sci-Fi","Horror","Thriller","Comedy"];
  for(let section = 0 ; section < category.length;section++){
    referenceSection(category[section],10);
    
  }
  // end
