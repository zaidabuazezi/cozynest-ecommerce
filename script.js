import {formatPrice,capitalizeText} from "./utils.js";
import {getProductsData} from "./api.js";


let header=document.querySelector('[data-header]');
let data_navbar=document.querySelector('[data-navbar]');
let data_nav_toggler=document.querySelector('[data-nav-toggler]');
let data_nav_toggler_close=document.querySelector('[data-nav-toggler-close]');
let data_dropdown_toggler=document.querySelector('[data-dropdown-toggler]');
let  data_dropdown=document.querySelector('[ data-dropdown]');
let data_cart_toggler=document.querySelector('[data-cart-toggler]');
let data_cart_count=document.querySelector('[data-cart-count]');
let data_cart_modal=document.querySelector('[data-cart-modal]');
let cartlist=data_cart_modal.querySelector('ul');
let data_overlay=document.querySelector('[data-overlay]');
let data_cart_total=document.querySelector('[data-cart-total]');
let data_clear_cart=document.querySelector('[data-clear-cart]');
let data_search=document.querySelector('[data-search]');
let data_our_products=document.querySelector('[data-our-products]');
let data_new_arrival=document.querySelector('[data-new-arrival]');
let wishlistToggler=document.querySelector("[data-wishlist-toggler]");
let wishlistCount=document.querySelector("[data-wishlist-count]");


let dataWishlistModal=document.querySelector("[data-wishlist-modal]");
let dataWishlistList=document.querySelector("[data-wishlist-list]");


let productModal=document.querySelector("[data-product-modal]");
let productClose=document.querySelector("[data-product-close]");
let productDetailsContent=document.querySelector("[data-product-details-content]");



let paginationProduct=[];
let currentPage=1;
let productPerPage=4;


let data_pagination=document.querySelector("[data-pagination]");


let checkoutBtn=document.querySelector("[data-check-out]");


let checkoutModal=document.querySelector("[data-checkout-modal]");
let checkoutClose=document.querySelector("[data-checkout-close]");


/*console.log(dataWishlistModal);
console.log(dataWishlistList);*/

/*console.log(wishlistToggler);
console.log(wishlistCount);*/


let categoryButtons=document.querySelectorAll("[data-category]");

let data_sort=document.querySelector("[data-sort]");


let checkoutForm=document.querySelector("[data-checkout-form]");
let checkoutName=document.querySelector("[data-checkout-name]");
let checkoutEmail=document.querySelector("[data-checkout-email]");
let checkoutPhone=document.querySelector("[data-checkout-phone]");
let checkoutAddress=document.querySelector("[data-checkout-address]");



/*exports*/ 





data_nav_toggler.addEventListener('click',() => {
    data_navbar.classList.add('active');
    data_overlay.classList.add('active');
    document.body.classList.add('active');
}); 


data_nav_toggler_close.addEventListener('click',() => {
    data_navbar.classList.remove('active');
    data_overlay.classList.remove('active');
    document.body.classList.remove('active');
});


data_dropdown_toggler.addEventListener('click',() => {
      
    data_dropdown.classList.toggle('active');

});

data_overlay.addEventListener('click',() => {
    data_navbar.classList.remove('active');
    data_overlay.classList.remove('active');
    document.body.classList.remove('active');
});



data_cart_toggler.addEventListener('click',(e) => {
    e.preventDefault();
     data_cart_modal.classList.toggle('active');
});





window.addEventListener('scroll',() => {
    if (window.scrollY > 50) {
        header.classList.add('active');
    }
    else 
    {
        header.classList.remove('active');
    }
});




let data_slider_container=document.querySelectorAll('[data-slider-container]');


function sliderInitial(slider_container) {


    let data_slider=slider_container.querySelector('[data-slider]');
    let data_prev_btn=slider_container.querySelector('[data-prev-btn]');
    let data_next_btn=slider_container.querySelector('[data-next-btn]');
       
      function nextSlide() {
           
        if(!data_slider.firstElementChild) {
            return;
        }

         data_slider.appendChild(data_slider.firstElementChild);

      }
       
      data_next_btn.addEventListener('click',nextSlide);



       function prevSlide() {

          if(!data_slider.lastElementChild) {
            return;
          }

          data_slider.prepend(data_slider.lastElementChild);
       }

     data_prev_btn.addEventListener('click',prevSlide); 

        
     let autoslideelment;
       function autoslide() {
        autoslideelment=setInterval(function() {
            nextSlide();
        },1500);
       }    

     autoslide();


        
     function deleteAutoSlide() {
        clearInterval(autoslideelment);
     }

       
    data_slider.addEventListener('mouseover',deleteAutoSlide);
    data_prev_btn.addEventListener('mouseover',deleteAutoSlide);
    data_next_btn.addEventListener('mouseover',deleteAutoSlide);



    data_slider.addEventListener('mouseout',autoslide);
    data_prev_btn.addEventListener('mouseout',autoslide);
    data_next_btn.addEventListener('mouseout',autoslide);

}


for(let i=0;i<data_slider_container.length;i++) {
      sliderInitial(data_slider_container[i]);
}



function displayCart() {
    cartlist.innerHTML='';
    let total=0;

     if(cart.length === 0) {
        cartlist.innerHTML=`
        <li class="text-center font-bold text-caf-noir mb-3">Your cart is empty</li>
        `;
     }

    for(let i=0;i<cart.length;i++) {
        let li=document.createElement('li');
        let divider=document.createElement('div');
        divider.className='divider h-[1px] w-full bg-butterscotch my-3';

        li.className='flex gap-2 pr-2';
        li.innerHTML=`
                       
                       <figure class="img-holder w-20 h-20 rounded-md flex-shrink-0" style="--width:80;--height:80">
                                <img src="${cart[i].image}" width="80" height="80" loading="lazy" 
                                alt="${cart[i].title}" class="img-cover">
                            </figure>

                            <div class="flex-1">
                                <span class="font-bold text-sm text-caf-noir">${cart[i].title}</span>
                                <div class="flex items-center gap-1 text-[13px]">
                                    <p>${cart[i].quantity} x</p>
                                    <p>${cart[i].price}</p>
                                </div>
                            </div>

                            <button class="h-5 w-5 flex-shrink-0 mb-auto cursor-pointer" aria-label="remove product">
                                <span class="material-symbols-rounded" aria-hidden="true">close</span>
                            </button>
        `;
        

        let removebtn=li.querySelector('button');
        
        removebtn.addEventListener('click',() => {
            if(cart[i].quantity > 1) {
               cart[i].quantity--;
            } else {
                cart.splice(i,1);
            }
           displayCart();
           localStorage.setItem('cart',JSON.stringify(cart));
        });
            
        let price=Number(cart[i].price.replace('$',''));

        total+=price*cart[i].quantity;

        cartlist.appendChild(li);
        cartlist.appendChild(divider);

        data_clear_cart.addEventListener('click',() => {
            cart=[];
            displayCart();
            localStorage.setItem('cart',JSON.stringify(cart));  
        })

    }
    data_cart_count.textContent=cart.length;
    data_cart_total.textContent=`$${total.toFixed(2)}`;
}



let data_add_cart=document.querySelectorAll('[data-add-cart]');
let cart=JSON.parse(localStorage.getItem('cart')) || [];
displayCart();

for(let i=0;i<data_add_cart.length;i++) {
    data_add_cart[i].addEventListener('click',function(e) {
        e.preventDefault();
        let myproductclick=this.closest('li');
        let product_title=myproductclick.querySelector('.product-title');
        let pricee=myproductclick.querySelector('.price');
        let productImg=myproductclick.querySelector('img');
        /*console.log(product_title.textContent);
        console.log(pricee.textContent);
        console.log(productImg.src);*/

        let productInfo= {
            title:product_title.textContent,
            price:pricee.textContent,
            image:productImg.src,
            quantity:1,
        };

         addCart(productInfo);
    });
}


let products = [];



let filteredProducts=[];

let wishlist=JSON.parse(localStorage.getItem("wishlist")) || [];

let currentProducts=[...products];


function displayOurProducts(item) {

    data_our_products.innerHTML="";


     if(item.length === 0) {
        data_our_products.innerHTML=`
        <li class="text-center font-bold text-caf-noir">No Products found</li>
        `;
     }


   for(let i=0;i<item.length;i++) {

    let {title,price,category,image}=item[i]; //destructuring

       let iswishlist=false;

       for(let j=0;j<wishlist.length;j++) {
        if(wishlist[j].title === item[i].title) {
            iswishlist=true;
        }

       }

      data_our_products.innerHTML+= `
         <li class="slider-item w-64 space-y-5 rounded-lg pb-6 group">

                            <div class="relative overflow-hidden">
                                <figure class="img-holder rounded-lg h-80" style="--width:265px; --height:320px">
                                   <img src="${image}" width="265" height="320" loading="lazy"
                                    alt="sweater" class="img-cover duration-[0.5s] ease-linear group-hover:scale-105">
                                </figure>

                                <div class="product-action-btn bg-[#d89245c7] flex items-center px-3 py-1 absolute 
                                        top-2/4 left-2/4 -translate-x-2/4 text-white opacity-0 duration-200 ease-linear
                                        group-hover:opacity-100 group-hover:-translate-y-2/4">
                                    <a href="#" class="h-9 w-9 grid place-items-center py-1" data-add-cart>
                                         <ion-icon name="bag-outline" aria-hidden="true" class="text-[22px] block"></ion-icon>
                                    </a>
                                    <a href="#" class="h-9 w-9 grid place-items-center py-1" data-wishlist data-index="${products.indexOf(item[i])}">
                                         <ion-icon name="${iswishlist ? "heart" : "heart-outline"}" aria-hidden="true" class="text-[22px] block"></ion-icon>
                                    </a>
                                    <a href="#" class="h-9 w-9 grid place-items-center py-1" data-product-details data-index="${products.indexOf(item[i])}">
                                         <ion-icon name="eye-outline" aria-hidden="true" class="text-[22px] block"></ion-icon>
                                    </a>
                                </div>
                            </div>

                           <div class="card-content space-y-2">
                                <div class="flex justify-between items-start">
                                    <p class="product-title text-jet font-bold text-lg">${title}</p>
                                    <span class="price bg-butterscotch px-2 py-1 text-papaya-whip font-bold text-sm">${formatPrice(price)}</span>
                                </div>
                                <p class="product-detail">Artisanal designs that make every day a feast</p>
                           </div>

                        </li>
      `; 
}

}


data_search.addEventListener('input',() => {

    let searchValue=data_search.value.toLowerCase();

    let currnetPage=1;

     filteredProducts=[];

     for(let i=0;i<currentProducts.length;i++) {

         if(currentProducts[i].title.toLowerCase().includes(searchValue)) {
            filteredProducts.push(currentProducts[i]);
         }
     }

      paginationProduct=[...filteredProducts];
      displayPage();
      displayPagination();

});



for(let i=0;i < categoryButtons.length;i++) {
    categoryButtons[i].addEventListener('click', () => {
       /*console.log(categoryButtons[i]);*/

       let category=categoryButtons[i].dataset.category;
       currentPage=1;

       for(let j=0;j < categoryButtons.length;j++) {
        categoryButtons[j].classList.remove("active");
       }
       categoryButtons[i].classList.add("active");
       /*console.log(category);*/

       if(category === "all") {
         
        currentProducts=[...products];
        paginationProduct=[...products];
        displayOurProducts(products);
        displayPage();
        displayPagination();
        return;
       }

       filteredProducts=[];


       for(let j=0;j < products.length;j++) {
        if(products[j].category === category) {
            filteredProducts.push(products[j]);
        }
       }
       /*console.log(filteredProducts);*/
       currentProducts=[...filteredProducts];
        paginationProduct=[...filteredProducts];

       displayPage();
       displayPagination();

       displayOurProducts(filteredProducts);
    });
}

/*console.log(data_sort);*/



data_sort.addEventListener('change',() => {
   /*console.log(data_sort.value);*/


   let sortvalue=data_sort.value;
   /*let sortedProductsCopy=[...currentProducts];*/ // copy
   let sortedProductsCopy=[...paginationProduct];
   currentPage=1;
   /*console.log(sortedProductsCopy);*/

     if(sortvalue === "low-high") {
        sortedProductsCopy.sort((a,b) => {
             return a.price - b.price;
        });
     }
 
     if(sortvalue === "high-low") {
        sortedProductsCopy.sort((a,b) => {
           return b.price - a.price;
        });
     }

     /*console.log(sortedProductsCopy);*/

     paginationProduct=[...sortedProductsCopy];
     displayPage();
     displayPagination();
});



let wishlistButtons=document.querySelectorAll("[data-wishlist]");

/*console.log(wishlistButtons);*/

data_our_products.addEventListener('click',(e) => {
        let wishlistBtn=e.target.closest("[data-wishlist]");
        
        if(!wishlistBtn) {
            return;
        }

        let productIndex=wishlistBtn.dataset.index;
        /*console.log(productIndex);*/

        let product=products[productIndex];

        let wishlistIndex=-1;

        for(let j=0;j<wishlist.length;j++) {
            if(wishlist[j].title === product.title) {
                wishlistIndex=j;
            }
        }

        if(wishlistIndex=== -1) {
            wishlist.push(product);
            wishlistBtn.querySelector("ion-icon").name="heart";
        }
        else {
            wishlist.splice(wishlistIndex,1);
            wishlistBtn.querySelector("ion-icon").name="heart-outline";
        }

        localStorage.setItem("wishlist",JSON.stringify(wishlist));
         updateWishlistCount();
         displayWishlist();
 });



 function updateWishlistCount() {
    wishlistCount.textContent=wishlist.length;
 }

 updateWishlistCount();



 function displayWishlist() {
    dataWishlistList.innerHTML='';

    if(wishlist.length === 0) {
        dataWishlistList.innerHTML=`
        <li class="text-center font-bold text-caf-noir">Your Wishlist is empty</li>
        `;
    }

    for(let i=0;i<wishlist.length;i++) {
        
        dataWishlistList.innerHTML += `
    <li class="flex gap-2 pr-2 pb-3 mb-3 border-b border-butterscotch">

        <figure class="img-holder w-20 h-20 rounded-md flex-shrink-0"
                style="--width:80;--height:80">

            <img src="${wishlist[i].image}"
                 width="80"
                 height="80"
                 loading="lazy"
                 alt="${wishlist[i].title}"
                 class="img-cover">
        </figure>

        <div>
            <span class="font-bold text-sm text-caf-noir">
                ${wishlist[i].title}
            </span>

            <p class="text-[13px]">
                $${wishlist[i].price}
            </p>
        </div>

        <button class="h-5 w-5 flex-shrink-0 mb-auto cursor-pointer" data-remove-wishlist data-index="${i}" aria-label="remove product">
        <span class="material-symbols-rounded" aria-hidden="true">close</span>
         </button>

    </li>

`;
    }
 }


displayWishlist();

 wishlistToggler.addEventListener('click',() => {
    dataWishlistModal.classList.toggle("active");
 });

 dataWishlistList.addEventListener('click',(e) => {
     
     let removeBtn=e.target.closest("[data-remove-wishlist]");

     /*console.log(removeBtn);*/
     
   if(!removeBtn) {
    return;
   }
   let index=removeBtn.dataset.index;

   wishlist.splice(index,1);

   localStorage.setItem("wishlist",JSON.stringify(wishlist));
   updateWishlistCount();
   displayWishlist();

   displayOurProducts(currentProducts);

 });


data_our_products.addEventListener('click',(e) => {
    
   let detailsBtn=e.target.closest("[data-product-details]");
   
   if(!detailsBtn) {
    return;
   }

   let productIndex=detailsBtn.dataset.index;
   let product=products[productIndex];

   /*console.log(products[productIndex]);*/

    productDetailsContent.innerHTML = `
    <div class="grid gap-6 md:grid-cols-2 md:items-center">

        <div>
            <img src="${product.image}"
                 alt="${product.title}"
                 class="w-full rounded-lg">
        </div>

        <div>
            <h2 class="text-3xl font-bold text-caf-noir">
                ${product.title}
            </h2>

            <p class="text-2xl font-bold text-butterscotch mt-3">
                $${product.price}
            </p>

            <p class="mt-3 text-sm">
                Category:
                <span class="font-bold">
                    ${capitalizeText(product.category)}
                </span>
            </p>

            <p class="mt-4 text-jet">
                Artisanal designs that make every day a feast.
            </p>

           <button class="btn bg-butterscotch px-6 py-3 mt-5 cursor-pointer" data-details-add-cart data-index="${productIndex}">
              Add to Cart
           </button>

        </div>

    </div>
`;

   productModal.classList.add("active");
    


});

productClose.addEventListener('click',() => {
   
     productModal.classList.remove("active");

});


productModal.addEventListener("click",(e) => {

   if(e.target === productModal) {
    productModal.classList.remove("active");
   }

});


productDetailsContent.addEventListener('click',(e) => {
  
   let addBtn=e.target.closest("[data-details-add-cart]");

   if(!addBtn) {
    return;
   }

   let productIndex=addBtn.dataset.index;

   /*console.log(products[productIndex]);*/


   let product=products[productIndex];

   let productInfo= {
       
     title:product.title,
     price:`$${product.price}`,
     image:product.image,
     quantity:1,

   };

   addCart(productInfo);
   

});




function addCart(productInfo) {

   let found=false;

   for(let i=0;i<cart.length;i++) {
    if(cart[i].title === productInfo.title) {
         cart[i].quantity++;
         found=true;
    }
   }

   if(!found) {
        cart.push(productInfo);
    }


    displayCart();
    localStorage.setItem("cart",JSON.stringify(cart));

}


async function getProducts() {
    
    try {
     let data=await getProductsData();

     products=data;

     currentProducts=[...products];
     paginationProduct=[...products];
     displayPage();
    displayPagination();

    }catch(error) {
        console.log(error); // for developer 
        data_our_products.innerHTML=`
         <li class="text-center font-bold text-red">Failed to load products</li> // for users
        `;
    }
}


 getProducts();


function displayPage() {
    let start=(currentPage -1) * productPerPage;
    let end=start + productPerPage;


    let pageProducts=paginationProduct.slice(start,end);

    displayOurProducts(pageProducts);
}




function displayPagination() {
    let totalPage=Math.ceil(paginationProduct.length / productPerPage);
    
    data_pagination.innerHTML="";

    for(let i=1;i<=totalPage;i++) {
        data_pagination.innerHTML+=`
        <button class="cursor-pointer w-10 h-10 bg-butterscotch text-white font-semibold rounded-lg
          ${i===currentPage ? "bg-butterscotch-light transition text-white" : ""}" data-page="${i}">
          ${i}
        </button>
        `;
    }
}

data_pagination.addEventListener('click',(e) => {

   let pageBtn=e.target.closest("[data-page]");

   if(!pageBtn) {
    return;
   }

   currentPage=Number(pageBtn.dataset.page);
   displayPage();
   displayPagination();
});


checkoutBtn.addEventListener('click',(e) => {

   e.preventDefault();
   if(cart.length === 0) {
    alert("Your cart is Empty");
    return;
   }

   checkoutModal.classList.add("active");

});

checkoutClose.addEventListener('click',() => {
  
  checkoutModal.classList.remove("active");

});

checkoutModal.addEventListener("click",(e) => {

   if(e.target === checkoutModal) {
    checkoutModal.classList.remove("active");
   }

});


checkoutForm.addEventListener("submit",(e) => {
  
  e.preventDefault();

  let nameValue=checkoutName.value.trim(); 
  let emailValue=checkoutEmail.value.trim();
  let phoneValue=checkoutPhone.value.trim();
  let addressValue=checkoutAddress.value.trim();

  if(nameValue === "" || emailValue ==="" || phoneValue ==="" || addressValue === "") {  
    alert("Please fill in all fields");
    return;
  }

  /*Email validation*/

  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(!emailPattern.test(emailValue)) {
    alert("Please enter a valid email");
    return;
}

 /*Phone Validation*/

 let phonePattern=/^[0-9]{7,15}$/;

 if(!phonePattern.test(phoneValue)) {
    alert("Please enter a valid phone number")
    return;
 }


 /*Name Validation*/
 
 if(nameValue.length < 3) {

   alert("Name must be at least 3 characters")
   return;

 }

/*Address Validation*/

 if(addressValue.length < 5) {
    alert("Address must be at least 5 characters")
    return;
 }

  let ordertotal=0;

  for(let i=0;i<cart.length;i++) {
    let price=Number(cart[i].price.replace("$",""));
    ordertotal+=price * cart[i].quantity;
  }


  let orderInfo= {
     name:nameValue,
     email:emailValue,
     phone:phoneValue,
     address:addressValue,
     products:cart,
     total:ordertotal.toFixed(2)
  };

  let orders=JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(orderInfo);
  localStorage.setItem("orders",JSON.stringify(orders));
  alert("Order placed successfully");

  cart=[];
  localStorage.setItem("cart",JSON.stringify(cart));
  displayCart();

    checkoutForm.reset();
    checkoutModal.classList.remove("active");
});



document.addEventListener("keydown",(e) => {

    if(e.key === "Escape") {

      productModal.classList.remove("active");  
      checkoutModal.classList.remove("active");
    }

});
