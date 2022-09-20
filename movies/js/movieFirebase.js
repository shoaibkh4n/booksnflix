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
  const movieIDs = urlQuery.get("movieID");;
  
  firebaseDB(movieIDs);

function firebaseDB(movieID){
  var ref = firebase.database().ref("movies/"+movieID);
    ref.once("value")
  .then(function(Snapshot) {
      // const key = snapshot.key;
      const movieDescriptions = Snapshot.val().movieDescription;
      const movieName = Snapshot.val().movieName;
      const movieFullImage = Snapshot.val().movieFullImage;
      const ottLink = Snapshot.val().ottLink;
      const platform = Snapshot.val().platform;
      const eBook = Snapshot.val().linkOnlineBook;
      const yearRelease = Snapshot.val().yearRelease;
      const watchTime = Snapshot.val().watchTime;
      const genre = Snapshot.val().genre;
      const rating = Snapshot.val().movieRating; 
      const youtubeLink = Snapshot.val().youtubeLink ;



      document.title = movieName;


      const content =  document.querySelector('.container');

        content.innerHTML = `    
        <div class = "youtube">
        <div class = "close-youtube"><i class="far fa-times-circle"></i></div>
        <div class="youtube-frame">
        <div class="loader loader--style6">
        <div class = "loader-wrapper" style = "  width: 17%;
        min-width: 40px;
        max-width: 60px;">
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
    </div>
        
        </div>
        </div>        
     <img src="${movieFullImage}" alt="Snow">
     <div class="wraper-container">
     
     <p class="desc1 ">${movieName}</p>
     <p class="desc2">
       ${yearRelease}&nbsp•&nbsp${watchTime} min&nbsp•&nbsp${genre}&nbsp•&nbsp<span class="star"><i class="fas fa-star"></i></span> ${rating}
       <br><br>${movieDescriptions}</p>
     <h2 class="h-secondary">Available On:</h2>
     <div class="button-wrap">
    <a href="${ottLink}" target="_blank" class="btn2 btn-resp"><i class="far fa-play-circle"></i>&nbsp${platform} </a>
     <a href="${eBook}" target="_blank" class="btn btn-resp"><i class="fas fa-book-open"></i>&nbsp&nbspEBook </a>
     <button title="${movieName} trailer" class="btn2 btn3 btn-resp"><i class="fab fa-youtube"></i>&nbspTrailer </button>
   </div>
   </div>
      `


      const yt = document.querySelector('.btn3');
      const ytFrame = document.querySelector('.youtube');
      const closeYoutube = document.querySelector('.close-youtube');
      const youtubeFrame = document.querySelector('.youtube-frame');

      yt.addEventListener('click',()=>{
      ytFrame.style.display = "flex";
      // document.body.style.overflowY = "hidden";
      document.documentElement.style.overflowY = "hidden";
      setTimeout(()=>{
        youtubeFrame.innerHTML = `
      <iframe class ="frame" width="50%" height="55%" src="${youtubeLink}?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay ;    clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
      },1000)
      
    })

    closeYoutube.addEventListener('click',(e)=>{
      e.preventDefault();
      ytFrame.style.display = "none";
      document.documentElement.style.overflowY = "visible";
      youtubeFrame.innerHTML = `
      <div class="loader loader--style6">
        <div class = "loader-wrapper" style = "  width: 17%;
        min-width: 40px;
        max-width: 60px;">
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
    </div>
      `
    })
    
  })
}

// Search Redirect
