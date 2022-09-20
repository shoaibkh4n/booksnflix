function getItem(){
    if(window.location.pathname == "/SeeMore/bookseemore.html" || window.location.pathname == "/seemore/bookseemore"  || window.location.pathname == "/seemore/bookseemore.html" || window.location.pathname ==  "/Search/searchbook.html" || window.location.pathname ==  "/search/searchbook" || window.location.pathname ==  "/search/searchbook.html" || window.location.pathname == "/books/booksmain.html"){
        const bookList = JSON.parse(localStorage.getItem("bookmark-list-books") || "[]");
        return bookList
    }
    else{
        const yourList = JSON.parse(localStorage.getItem("bookmark-list") || "[]");
        return yourList;
    }
    
}

function bookListItems(){
    const bookList = JSON.parse(localStorage.getItem("bookmark-list-books") || "[]");
    return bookList
}

function movieListItems(){
    const yourList = JSON.parse(localStorage.getItem("bookmark-list") || "[]");
    return yourList;
}

function totalItems(){
    const totalWishlistItems = JSON.parse(localStorage.getItem("bookmark-list-books") || "[]").length + JSON.parse(localStorage.getItem("bookmark-list") || "[]").length;

    return totalWishlistItems
}

function itemCount() {
    if(totalItems() > 9){
        return '9+';
    }
    else if(totalItems() <= 9){
        return totalItems();
    }
}

const wishlistIcon = (component) => {
    const virtualContainer = document.createElement('div');
    virtualContainer.classList.add('virtual-box');

    document.body.appendChild(virtualContainer);
    if (totalItems() != 0){
    component.insertAdjacentHTML('afterend','<a class="wishlist-bag-link" href="/wishlist/wishlistDisplay.html" style="color: inherit;"><div class="wishlist-bag"><i class=" fas fa-clipboard-list"><div class="item-count">'+ itemCount() +'</div> </i></div></a>');
    }
} 

let containerTime;
function toggleHeart(targetElement,heart,component) {

  targetElement.forEach(function (i) {
    i.addEventListener('click', function (e) {
      const clickedBtnIndex = [...targetElement].indexOf(e.target);
      let ariaHeart = heart[clickedBtnIndex].getAttribute('aria-pressed');
      let ariaLabelHeart = heart[clickedBtnIndex].getAttribute('aria-labelledby');
      
      if (!document.querySelector('.wishlist-bag')){
       component.insertAdjacentHTML('afterend','<a class="wishlist-bag-link" href="/wishlist/wishlistDisplay.html" style="color: inherit;"><div class="wishlist-bag"><i class=" fas fa-clipboard-list"><div class="item-count">'+ itemCount() +'</div> </i></div></a>');
        }


      if(ariaHeart == "false"){
        heart[clickedBtnIndex].classList.add('added-to-wishlist');
        ariaHeart = "true";
        heart[clickedBtnIndex].setAttribute('aria-pressed',ariaHeart);
        const yourList = getItem();
        const listobj = {
          added : ariaHeart,
          id : ariaLabelHeart
        };

   

        if(window.location.pathname == "/SeeMore/bookseemore.html" || window.location.pathname == "/seemore/bookseemore.html" || window.location.pathname == "/seemore/bookseemore" || window.location.pathname ==  "/Search/searchbook.html" || window.location.pathname ==  "/search/searchbook" || window.location.pathname ==  "/search/searchbook.html" || window.location.pathname == "/books/booksmain.html"){
            yourList.push(listobj);
            localStorage.setItem("bookmark-list-books",JSON.stringify(yourList))
        }
        else{
            yourList.push(listobj);
            localStorage.setItem("bookmark-list",JSON.stringify(yourList))
        }

        
        clearTimeout(containerTime);
        if(!document.querySelector('.bookmark-message')){
            document.querySelector('.virtual-box').innerHTML = `
                <div class = "bookmark-message">
                    <svg class = "bookmark-added-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                    <circle class="path circle" fill="none" stroke="#ffff" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
                    <polyline class="path check" fill="none" stroke="#ffff" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
                    </svg>
                    <p class="success">Added to wishlist</p>
                </div>
            
            `
        }
        containerTime = setTimeout(()=>{
            document.querySelector('.bookmark-message').remove();
        },1500)
        

     }
     else if(ariaHeart == "true" ){
       heart[clickedBtnIndex].classList.remove('added-to-wishlist');
       ariaHeart = "false";
       heart[clickedBtnIndex].setAttribute('aria-pressed',ariaHeart);
       const yourList = getItem();
       
       const newList = yourList.filter(list => list.id != ariaLabelHeart);

       if(window.location.pathname == "/SeeMore/bookseemore.html" || window.location.pathname == "/seemore/bookseemore.html" || window.location.pathname == "/seemore/bookseemore" || window.location.pathname ==  "/Search/searchbook.html" || window.location.pathname ==  "/search/searchbook.html" || window.location.pathname ==  "/search/searchbook" || window.location.pathname == "/books/booksmain.html"){
        localStorage.setItem("bookmark-list-books",JSON.stringify(newList));
        }
        else{
            localStorage.setItem("bookmark-list",JSON.stringify(newList));
        }
       
       clearTimeout(containerTime);
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
    
    containerTime = setTimeout(()=>{
        document.querySelector('.bookmark-message').remove();
    },1500)

     }
     
     if(document.querySelector('.item-count')){
        if(totalItems() != 0){
        document.querySelector('.item-count').innerHTML = itemCount();
        }else if(totalItems() == 0){
            document.querySelector('.wishlist-bag-link').remove();
        }
      }
    })
  }); 

    const your_wishlist = getItem();
    heart.forEach(hearts =>{
    const labelID = hearts.getAttribute("aria-labelledby");

    your_wishlist.forEach(e=>{
        
        if(e.id == labelID){
        hearts.setAttribute('aria-pressed',e.added);
        hearts.classList.add('added-to-wishlist');
        }
    })
    })

}


export {bookListItems,totalItems, movieListItems ,getItem, toggleHeart , wishlistIcon}