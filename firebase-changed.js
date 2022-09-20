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
    

    // console.log(snap);
    // const set = new Set([snapshot.val()]);
    // const array = Array.from(set);
    // // console.log(array);
    // const indivArray= array[0];

    // // console.log(indivArray);
    // const object = Object.entries(indivArray);
    // // console.log(object)
    // const reversedArray = object.reverse();
    // // console.log(reversedArray);
    // const reversedObject = Object.fromEntries(reversedArray);
    // console.log(reversedObject);
        // console.log(objectDataToArray);
    // const filteredArray = objectDataToArray.filter(function(notNullValue){   // Basically it removes all not null values like undefined from newArray
    //         return notNullValue != null ;
    //       })
    

    
    // const reversedArray = object.reverse();
    // // console.log(reversedArray);
    // const reversedObject = Object.fromEntries(reversedArray);
    // console.log(reversedObject);
    
//     const objectDataToArray = Object.assign([], snap); // copy all the object in an empty array

//     const newArray  = [...objectDataToArray]; // NOw copy that array into a new array to see exactly that is happening !!
//                                               // Like it fetches the required data according to their respective index/Type from DB and let remain indexes undefined means like trending section it fetches all the data for trending section and let all the indexes /undefined.
    
    
//     const filteredArray = objectDataToArray.filter(function(notNullValue){   // Basically it removes all not null values like undefined from newArray
//       return notNullValue != null ;
//     })
//     const reversedData = objectDataToArray;
//     console.log(reversedData);

//     var sources = [{a: "A"}, {b: "B"}, {c: "C"}];
// options = Object.assign.apply(Object, [{}].concat(sources));
// console.log(options);
// // or
// options1 = Object.assign({}, ...sources);
// console.log(options1);
    const snap = snapshot.val();
    const objectDataToArray = Object.assign([], snap); // copy all the object in an empty array

    const newArray  = [...objectDataToArray]; // NOw copy that array into a new array to see exactly that is happening !!
                                              // Like it fetches the required data according to their respective index/Type from DB and let remain indexes undefined means like trending section it fetches all the data for trending section and let all the indexes /undefined.
      
    
    const filteredArray = newArray.filter(function(notNullValue){   // Basically it removes all not null values like undefined from newArray
      return notNullValue ;
    })
    const reversedData = filteredArray.reverse();
    console.log(reversedData);

    // console.log(arr1);

    reversedData.forEach(function(Snapshot) {
      const type = Snapshot.type;
      const timeStamp = Snapshot.timeStamp;
      // const key = snapshot.key;
      const cardImage = Snapshot.cardImage;
      const movieID = Snapshot.key;
      const movieDescriptions = Snapshot.movieDescription;
      const movieName = Snapshot.movieName;
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
         <a href="movies/html/index.html?movieID=${movieName}" class="card-redirect">
      
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
  // To add a list contaitner in an array;
  // .then(()=>{
  //   const list = document.querySelectorAll('.list');
  //   const previousWatched = document.querySelector(".previous-watched");
  //   const previousUl = document.querySelector('.previous');
  //   let listArray = [];
  
  //   list.forEach(function(i) {
  //       i.addEventListener('click', function() {
  //         previousWatched.style.display = "block";
  
  //       listArray.push(i);
  //       const latestArray = [...listArray]
  //       const finalPreviousWatch = [...new Set(latestArray)];
  //       const recommendsHeading = document.querySelector(".recommends");
  
  //       recommendsHeading.innerHTML = "Previously Watched:";
  //       const newArray = [...finalPreviousWatch]
  //       newArray.forEach((card)=>{
  //         previousUl.innerHTML += card.innerHTML;
  //       })
  //       })
  //    });
  
  // })