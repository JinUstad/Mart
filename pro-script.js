
let productArray = [
    {
        id : 1,
        name : "watch",
        price : 30,
        image : "./image/pro1.jpg",
        category : "watch",
        add_to_cart : false
    },
    {
        id : 2,
        name : "watch",
        price : 60,
        image : "./image/pro2.jpg",
        category : "watch",
        add_to_cart : false
    },
    {
        id : 3,
        name : "watch",
        price : 40,
        image : "./image/pro3.jpg",
        category : "watch",
        add_to_cart : false
    },
]

let cart =[];
console.log(cart);


function fetchProducts(){
    document.getElementById("product").innerHTML ="";
    productArray.forEach((el,index)=>{
        let btn = `<button class="btn btn-sm btn-warning w-100" onclick="onAddcart(${index})" >Add to Card</button>`;
        if(el.add_to_cart){
            btn = `<button style="cursor:default;" class="btn btn-sm btn-light text-success w-100">Added</button>`
        }
        document.getElementById("product").innerHTML+=`
        <div class="col-md-4 p-3">
           <div class="border p-3 card shadow">
           <img class="img-fluid prod-img" src="${el.image}" />
           <h1 class="mt-3">${el.name}</h1>
           <p class="text-danger">$ ${el.price}</p> 
           <p class="text-dark badge badge-light text-success border">${el.category}</p>
           ${btn}  
           </div>
        </div>
        `;
    })
}

/* 
    REFRESH THE NUMBER OF PRODUCTS IN THE CART FUNCTION
    SO WE CAN CALL EVERYTIME WHENEVER WE WANT TO REFRESH THE CART
*/
function refreshCartNumber() {
    document.getElementById("cart-items-number").innerHTML = cart.length;
}


function onAddcart(index){
    productArray[index].add_to_cart=true;
    cart.unshift(productArray[index]);
    refreshCartNumber();
    fetchProducts();
}







function componentDidMount(){
    fetchProducts()
    refreshCartNumber();
    handleRemoveItemFromCart();
}

function handleOpenCart() {
    if (cart.length === 0) {
        swal("Empty Cart!", "Your cart is empty. Please add some products to checkout!", "error");
        return;
    }
    refreshCart();
    refreshTotalAmount();
    
    document.getElementById("open_cart").click();
}




// REFRESH CART ITEMS
function refreshCart() {
    document.getElementById("cart-items").innerHTML = "";
    cart.forEach((el, index) => {
        document.getElementById("cart-items").innerHTML += `
            <li style="list-style-type:none;" >
            <img class="img-fluid cart-img" src="${el.image}" />
            <span class="ml-3">${el.name}</span>
            <span class="float-right" style="display:inline-block;">$ ${el.price}
            <i class="fa fa-times-circle text-danger" onclick="handleRemoveItemFromCart(${index})"></i> 
            </span>
            </li>
        `;
    });
}


// REFRESH THE TOTAL AMOUNT OF PRODUCTS USER ADDED IN THE CART
function refreshTotalAmount() {
    let total_amount = 0
    if (cart.length != 0) total_amount = cart.map((x) => x.price).reduce((a, b) => a + b);
    document.getElementById("price").innerHTML = "$ " + total_amount;
}

// REMOVING ITEM FROM THE CART IF USER CLICK ON REMOVE BUTTON IN CART MODAL
function handleRemoveItemFromCart(index) {
    let removing_product_id = cart[index];
    productArray.forEach((el, index) => {
        if (el.id == removing_product_id) {
            productArray[index].add_to_cart = false;
        }
    })
    cart.splice(index, 1);
    refreshCartNumber();
    refreshCart();
    refreshTotalAmount();
    fetchProducts();
}

// CHECKOUT USER WHEN HE CLICKS ON CHECKOUT BUTTON IN CART MODAL
function handleCheckout() {
    if(cart.length === 0) 
    return;
    cart = [];
    productArray.map((el) => el.add_to_cart = false);
    document.getElementById("close_cart").click();
    swal("Good job!", "Your order booked successfully!", "success");
    refreshCartNumber();
    refreshCart();
    refreshTotalAmount();
    fetchProducts();
}