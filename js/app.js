// Variables
const cart = document.getElementById('carrito');
const products = document.getElementById('lista-cursos');
const productsList = document.querySelector('#lista-carrito tbody');
const emptyCartBtn = document.getElementById('vaciar-carrito');


// Listeners
loadEventListeners();

function loadEventListeners(){

  products.addEventListener('click', buyProduct);

  cart.addEventListener('click', emptyCart);

  document.addEventListener('DOMContentLoaded', getLocalStorage);
}

// Functions
// add a new product
function buyProduct(e){
  e.preventDefault();

  if(e.target.classList.contains('agregar-carrito')){
    const product = e.target.parentElement.parentElement;
    getProductData(product);
  }
}


// get product data
function getProductData(product){
  const infoProduct = {
      image: product.querySelector('img').src,
      title: product.querySelector('h4').textContent,
      price: product.querySelector('.precio span').textContent,
      id: product.querySelector('a').getAttribute('data-it')
  }
  addCart(infoProduct);
}

// show the product selected on cart
function addCart(product){
  const row = document.createElement('tr');
  row.innerHTML = `
      <td>
           <img src="${product.image}" width=100>
      </td>
      <td>${product.title}</td>
      <td>${product.price}</td>
      <td>
           <a href="#" class="borrar-curso" data-id="${product.id}">X</a>
      </td>
 `;

  productsList.appendChild(row);
  saveProductLocalStorage(product);
}

// delete the product from cart and DOM
function deleteProduct(e){
  e.preventDefault();

  let product, productId;
  if(e.target.classList.contains('borrar-curso')){
    e.target.parentElement.parentElement.remove();
    product = e.target.parentElement.parentElement;
    productId = product.querySelector('a').getAttribute('data-id');
  }
  deleteProductLocalStorage(productId);
}

// delete all products form cart and DOM
function emptyCart(){
  while(productsList.firstChild){
    productsList.removeChild(productsList.firstChild);
  }

  // empty local storage
  emptyLocalStorage();

  return false;
}

// save products on cart and local storage
function saveProductLocalStorage(product){
  let products;

  products = getProdutcsLocalStorage();

  products.push(product);

  localStorage.setItem('products', JSON.stringify(products);
}

// check local storage elements
function getProductsLocalStorage(){
  let productsLS;

  if(localStorage.getItem('products') === null){
    productsLS = [];
  } else {
    productsLS = JSON.parse(localStorage.getItem('products'));
  }
}

// show products from Local Storage on cart
function getLocalStorage(){
  let productsLS;

  productsLS = getProductsLocalStorage();

  productsLS.forEach(function(product){
    // build template
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>
              <img src="${product.image}" width=100>
         </td>
         <td>${product.title}</td>
         <td>${product.price}</td>
         <td>
              <a href="#" class="borrar-curso" data-id="${product.id}">X</a>
         </td>
    `;
    productsList.appendChild(row);
  });
}
