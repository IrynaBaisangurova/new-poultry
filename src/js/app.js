let products = [
    {
        "id": 1,
        "image": "./images/1eggs-faverol.jpg",
        "name": "Яйця інкубаційні Фавероль",
        "price": 60,
        "unit": "шт",
        "desc": "шт",
        "desc": "Кількість обмежена"

    },

    {
        "id": 5,
        "image": "./images/5quail-eggs.jpg",
        "name": "Яйця перепілки",
        "price": 5,
        "unit": "шт",
        "desc": "В наявності"

    },
    {
        "id": 6,
        "image": "./images/6quail.jpg",
        "name": "М'ясо перепілки",
        "price": 250,
        "unit": "кг",
        "desc": "В наявності"

    },
    {
        "id": 7,
        "image": "./images/7chicken.jpg",
        "name": "М'ясо бойлера",
        "price": 0,
        "unit": "кг",
        "desc": "Очікується"

    },
    {
        "id": 8,
        "image": "./images/8turk.jpg",
        "name": "М'ясо індика",
        "price": 0,
        "unit": "кг",
        "desc": "Очікується"

    },
    {
        "id": 9,
        "image": "./images/9duck.jpg",
        "name": "М'ясо вутки",
        "price": 0,
        "unit": "кг",
        "desc": "Очікується"

    }

];


let iconCart = document.querySelector('.iconCart');
let cart = document.querySelector('.cart');
let container = document.querySelector('.container');
let close = document.querySelector('.close');

iconCart.addEventListener('click', function(){
    if(cart.style.right == '-100%'){
        cart.style.right = '0';
        container.style.transform = 'translateX(-400px)';
    }else{
        cart.style.right = '-100%';
        container.style.transform = 'translateX(0)';
    }
})
close.addEventListener('click', function (){
    cart.style.right = '-100%';
    container.style.transform = 'translateX(0)';
})


addDataToHTML(); // Викликаємо функцію для додавання товарів у список

//show datas product in list
function addDataToHTML(){
    let listProductHTML = document.querySelector('.listProduct');
    listProductHTML.innerHTML = '';

    if(products != null) // if has data
    {
        products.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.innerHTML =
            `<img src="${product.image}" alt="product name">
            <h2>${product.name}</h2>
            <div class="desc">${product.desc}</div>
            <div class="price">₴${product.price}  / 1 ${product.unit}</div>
            <button onclick="addCart(${product.id})">Додати до кошика</button>`;

            listProductHTML.appendChild(newProduct);
        });
    }
}

//use cookie so the cart doesn't get lost on refresh page


let listCart = [];
function checkCart(){
    var cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('listCart='));
    if(cookieValue){
        listCart = JSON.parse(cookieValue.split('=')[1]);
    }else{
        listCart = [];
    }
}
checkCart();

function addCart($idProduct){
    let productsCopy = JSON.parse(JSON.stringify(products));
    //// If this product is not in the cart
    if(!listCart[$idProduct])
    {
        listCart[$idProduct] = productsCopy.filter(product => product.id == $idProduct)[0];
        listCart[$idProduct].quantity = 1;
    }else{
        //If this product is already in the cart.
        //I just increased the quantity
        listCart[$idProduct].quantity++;
    }
    document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";

    addCartToHTML();
}
addCartToHTML();

function addCartToHTML(){
    // clear data default
    let listCartHTML = document.querySelector('.listCart');
    listCartHTML.innerHTML = '';

    let totalHTML = document.querySelector('.totalQuantity');
    let totalQuantity = 0;
    // if has product in Cart
    if(listCart){
        listCart.forEach(product => {
            if(product){
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.innerHTML =
                    `<img src="${product.image}">
                    <div class="content">
                        <div class="name">${product.name}</div>
                        <div class="price">$${product.price} / 1 product</div>
                    </div>
                    <div class="quantity">
                        <button onclick="changeQuantity(${product.id}, '-')">-</button>
                        <span class="value">${product.quantity}</span>
                        <button onclick="changeQuantity(${product.id}, '+')">+</button>
                    </div>`;
                listCartHTML.appendChild(newCart);
                totalQuantity = totalQuantity + product.quantity;
            }
        })
    }
    totalHTML.innerText = totalQuantity;
}
function changeQuantity($idProduct, $type){
    switch ($type) {
        case '+':
            listCart[$idProduct].quantity++;
            break;
        case '-':
            listCart[$idProduct].quantity--;

            // if quantity <= 0 then remove product in cart
            if(listCart[$idProduct].quantity <= 0){
                delete listCart[$idProduct];
            }
            break;

        default:
            break;
    }
    // save new data in cookie
    document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";
    // reload html view cart
    addCartToHTML();
}
