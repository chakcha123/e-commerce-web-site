let mc_products_list = [];

if (localStorage.getItem('mc_products')) {
  mc_products_list = JSON.parse(localStorage.getItem('mc_products'));
} else {
  localStorage.setItem('mc_products', JSON.stringify(mc_products_list));
}

function add_to_cart(name, price, im_indx) {
  let imges = document.querySelectorAll('.p-imges');

  let new_p = {
    img: imges[im_indx].src,
    name: name,
    price: parseFloat(price),
    quantity: 1,
  };

  let existingProduct = mc_products_list.find(product => product.name === new_p.name);

  if (existingProduct) {
    existingProduct.quantity += 1;
    localStorage.setItem('mc_products', JSON.stringify(mc_products_list));
    alert('Product quantity updated in the cart!');
  } else {
    mc_products_list.push(new_p);
    localStorage.setItem('mc_products', JSON.stringify(mc_products_list));
    alert('Product added to cart successfully!');
  }

  updateCartBody();
  updateCartQuantity();
  calc_total();
}


function plus(index) {
  if (index >= 0 && index < mc_products_list.length) {
    mc_products_list[index].quantity += 1;
    let q = document.getElementById(`count${index}`);
    q.innerHTML = mc_products_list[index].quantity;

    localStorage.setItem('mc_products', JSON.stringify(mc_products_list));
    calc_total();
  }
}

function moin(index) {
  if (index >= 0 && index < mc_products_list.length) {
    if (mc_products_list[index].quantity > 1) {
      mc_products_list[index].quantity -= 1;
      let q = document.getElementById(`count${index}`);
      q.innerHTML = mc_products_list[index].quantity;
      localStorage.setItem('mc_products', JSON.stringify(mc_products_list));
    } else {
      mc_products_list.splice(index, 1); // Remove the product from the cart
      localStorage.setItem('mc_products', JSON.stringify(mc_products_list));
      alert('Product removed from cart successfully!');
    }
  }
  updateCartBody();
  updateCartQuantity();
  calc_total();
}

function removeFromCart(index) {
  if (index >= 0 && index < mc_products_list.length) {
    mc_products_list.splice(index, 1);
    localStorage.setItem('mc_products', JSON.stringify(mc_products_list));
    alert('Product removed from cart successfully!');
  }

  updateCartBody();
  updateCartQuantity();
  calc_total();
}

function updateCartBody() {
  let cart_f = document.getElementById('cart-f');
  let code_l_1 = [];

  for (let i = 0; i < mc_products_list.length; i++) {
    code_l_1.push(`
      <tr>
        <td rowspan="2"><img src="${mc_products_list[i].img}" width="100px"></td>
        <td>${mc_products_list[i].name}</td> 
        <td>${mc_products_list[i].price} DH</td>        
        <td>
          <button class="n" onclick="moin(${i})">-</button>
          <span id="count${i}">${mc_products_list[i].quantity}</span>
          <button class="z" onclick="plus(${i})">+</button>
        </td>
        <td><button id="remove" onclick="removeFromCart(${i})">remove</button></td>
      </tr>
      <tr class="separator-row">
        <td colspan="3"><hr class="separator"></td>
      </tr>
    `);
  }

  localStorage.setItem('cart_body', JSON.stringify(code_l_1));
  cart_f.innerHTML = `
  <div class="container">
      <div class="table-responsive">
        <table class="table-borderless">
          <tr>
            <th>Product</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
          ${code_l_1.join('')}
        </table>
      </div>
    </div>
  </div>`;
}


function clear_cart() {
  localStorage.removeItem('mc_products');
  localStorage.removeItem('cart_body');
  window.location.reload();
}

function calc_total() {
  let total = 0;

  for (let i = 0; i < mc_products_list.length; i++) {
    total += mc_products_list[i].quantity * mc_products_list[i].price;
  }

  let s_total = document.getElementById('s_total');
  s_total.innerHTML = total;
}

window.onload = function() {
  updateCartBody();
  // updateCartQuantity();
  calc_total();
};

// function updateCartQuantity() {
//   for (let i = 0; i < mc_products_list.length; i++) {
//     let q = document.getElementById(`count${i}`);
//     q.innerHTML = mc_products_list[i].quantity;
//   }
// }
