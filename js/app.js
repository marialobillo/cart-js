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
    const product = e.target.parantElement.parentElement;
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
}
