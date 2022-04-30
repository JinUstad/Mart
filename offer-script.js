let allProduct;
allProduct=[
     {
        id:1,
        rating:5,
        name : "Canon",
        image : "./image/c1.png",
        price : 50,
        add_to_cart:false
     },
     {
        id:2,
        rating:5,
        name : "Canon1500D",
        image : "./image/c2.jpg",
        price : 80,
        add_to_cart:false
     },
     {
        id:3,
        rating:5,
        name : "Nikkon300D",
        image : "./image/c3.jpg",
        price : 70,
        add_to_cart:false
     },
     {
        id:4,
        rating:4,
        name : "Soney",
        image : "./image/h1.jpg",
        price : 55,
        add_to_cart:false
     },
     {
        id:2,
        rating:5,
        name : "Toreto",
        image : "./image/h2.jpg",
        price : 60,
        add_to_cart:false
     },
     {
        id:6,
        rating:3,
        name : "Boat",
        image : "./image/h3.jpg",
        price : 60,
        add_to_cart:false
     },
     {
        id:7,
        rating:5,
        name : "Chaina",
        image : "./image/b1.jpg",
        price : 10,
        add_to_cart:false
     },
     {
        id:8,
        rating:3,
        name : "Rassian",
        image : "./image/b2.jpg",
        price : 20,
        add_to_cart:false
     },
     {
        id:9,
        rating:5,
        name : "Indian",
        image : "./image/b3.jpg",
        price : 20,
        add_to_cart:false
     },

]
 
let cart = [];
console.log(cart);
function fetchAllProduct(){
     document.getElementById("products").innerHTML = "";
     
     allProduct.forEach((el,index)=>{
          let btn = `<button class="btn btn-success text-center" onclick="addCart(${index})">Add to cart</button>`;
           if(el.add_to_cart){
                  btn = `<button class="btn btn-warning text-center text-white" onclick="addCart()">Add to cart</button>`;
           }
          document.getElementById("products").innerHTML+=`
             <div class="col-md-4 mb-3 p-3">
             <div class="border card shadow mb-3 p-3">
             <img class="img-fluid img-pro" src="${el.image}">
             <h3 class="text-center">$${el.price}</h3>
             <h5 class="text-center">${el.name}</h5>
             ${btn}
             </div>
             </div>
          `;
     })
}


function refreshCart(){
   document.getElementById("add_cart_count").innerHTML = cart.length;
}

function addCart(index){
   allProduct[index].add_to_cart = true;
   cart.unshift(allProduct[index]);
   
   refreshCart();
   fetchAllProduct();
}



function componentMount(){
     fetchAllProduct();
     refreshCart();
     handleRemoveItemFromCart();
}

function handleCart(){
     if (cart.length === 0) {
          swal("Empty Cart!", "Your cart is empty. Please add some products to checkout!", "error");
          return;
      }
      refreshCarts()
      refreshTotalAmount();
      document.getElementById("open_cart").click();
}

function refreshCarts(){
   document.getElementById("cart-items").innerHTML = "";
   cart.forEach((el,index)=>{
      document.getElementById("cart-items").innerHTML +=`
      <li style="list-style-type:none;" >
      <img class="img-fluid cart-img" src="${el.image}" />
      <span class="ml-3">${el.price}</span>
      <span class="float-right" style="display:inline-block;">$ ${el.name}
      <i class="fa fa-times-circle text-danger" onclick="handleRemoveItemFromCart(${index})"></i> 
      </span>
      </li>
      `;
   })
}

function refreshTotalAmount(){
   let total_amount = 0;
   if(cart.length != 0) total_amount = cart.map((x)=>x.price).reduce((a,b)=>a+b)
   document.getElementById("price").innerHTML = "$"+total_amount;
}


function handleRemoveItemFromCart(index){
   let removing_product = cart[index];
   allProduct.forEach((el,index)=>{
      if(el.id =  removing_product){
         allProduct[index].add_to_cart = false;
      }
   })
   cart.splice(index,1);
   refreshCarts();
   refreshTotalAmount();
   refreshCart();
   fetchAllProduct()
}

function handleCheckout(){
   if(cart.length === 0)
   return;
   cart=[];
   allProduct.map((el)=>el.add_to_cart =false)
   document.getElementById("close_cart").click();
   swal("Good job!", "Your order booked successfully!", "success");
   refreshCarts();
   refreshTotalAmount();
   refreshCart();
   fetchAllProduct()
}

function logout(){
     location.href = "signin.html"     
}