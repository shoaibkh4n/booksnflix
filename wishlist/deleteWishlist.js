import {totalItems, bookListItems , movieListItems } from "../wishlist.js";
import { searchLength } from "./wishlistDisplay.js";




function deleteItem(targetElement,heart,list) {

    targetElement.forEach(function (i) {
      i.addEventListener('click', function (e) {
        // console.log(e);
        const clickedBtnIndex = [...targetElement].indexOf(e.target);
        const listItem = list[clickedBtnIndex];
        let ariaLabelHeart = heart[clickedBtnIndex].getAttribute('aria-labelledby');
        
         const bookItems = bookListItems();
         const movieItems = movieListItems();
         
         if(window.location.search == "?books"){
            const newList = bookItems.filter(list => list.id != ariaLabelHeart);
            localStorage.setItem("bookmark-list-books",JSON.stringify(newList));
            document.querySelector('.books-wishlist-display').removeChild(listItem);
            
            if(document.querySelector('.books-wishlist-display').children.length == 1){
                document.querySelector('.book-items').style.display = "none";
                document.querySelector('.movie-items').click();
                
            }
         }
         else{
            const newList = movieItems.filter(list => list.id != ariaLabelHeart);
            localStorage.setItem("bookmark-list",JSON.stringify(newList));
            document.querySelector('.card-ul').removeChild(listItem);
            if(document.querySelector('.card-ul').children.length == 1){
                document.querySelector('.movie-items').style.display = "none";
                document.querySelector('.book-items').click();
            }
         }
         

         
         searchLength(totalItems());
         
  
         if(!document.querySelector('.bookmark-message')){
          document.querySelector('.virtual-box').innerHTML = `
          <div class="bookmark-message bookmark-removed">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
              <circle class="path circle" fill="none" stroke="#ffff" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
              <line class="path line" fill="none" stroke="#ffff" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="34.4" y1="37.9" x2="95.8" y2="92.3"/>
              <line class="path line" fill="none" stroke="#ffff" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="95.8" y1="38" x2="34.4" y2="92.2"/>
              </svg>
              <p class="error">Removed from wishlist</p>
          </div>
          
          `
      }
      setTimeout(()=>{
          document.querySelector('.bookmark-message').remove();
      },1500)
       
      
       
      })
    }); 
}

export{deleteItem}