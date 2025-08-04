import { $, $$ } from "./main.js";

let addedProduct = JSON.parse(localStorage.getItem("cart")) || [];

// Them san pham vao gio hang
// 1. Lay id, mau, src anh, size san pham dang chon => done
// 2. Gan vao 1 array, luu vao localstorage => done
// 3. render ra giỏ hàng, nếu trùng thì +1 => done

// Ham render cart:
// Chua co san pham thi render gio hang trong
// Co san pham thi render tung san pham bang ham renderCartProduct
// Nhan nut X de xoa san pham khoi gio hang
// Nhan + de tang so luong, - de giam so luong
const renderCart = (productList) => {
  const cartBox = $(".cart__box");
  const totalQuantity = productList.reduce(
    (sum, product) => sum + product.quantity,
    0
  );
  const priceArr = productList.map((product) => {
    return Number(product.price.replace("₫", "").replaceAll(".", "").trim());
  });
  const totalPrice = () => {
    let total = 0;
    for (let i = 0; i < productList.length; i++) {
      total += productList[i].quantity * priceArr[i];
    }
    return total;
  };
  const formattedPrice = totalPrice().toLocaleString("vi-VN");

  if (productList.length == 0) {
    cartBox.innerHTML = `
<div class="cart__title">
  <span>Giỏ hàng (0)</span>
  <label for="display_cart"><i class="fa-solid fa-x"></i></label>
</div>
<div class="cart__img">
  <img src="./assets/img/cart/cart-empty.png" alt="" />
</div>
<div class="cart__text">
  <span>Hiện chưa có sản phẩm trong giỏ hàng</span>
</div>
<label for="display_cart">
  <div class="cart__button">
    <span>Tiếp tục mua sắm</span>
  </div>
</label>`;
  } else {
    cartBox.innerHTML = `
    <div class="cart__title">
      <span>Giỏ hàng (${totalQuantity})</span>
      <label for="display_cart"
        ><i class="fa-solid fa-x"></i
      ></label>
    </div>
    <div class="cart-product__list">
    ${renderCartProduct(productList)}
    </div>
    <div class="cart-pay">
      <div class="cart-price">Tổng cộng: <span>${formattedPrice} ₫</span> </div>
      <div class="cart-pay-btn">Thanh toán</div>
    </div>`;
  }
  handleEditCart();
  displayPayment();

  const info = {
    name: "Nguyễn Nhật Hưng",
    number: "0369215306",
    price: formattedPrice,
  };
  handlePayment(info);
};

const renderCartProduct = (productList) => {
  return productList
    .map((product, index) => {
      return `
    <div class="cart-product" >
      <div class="cart-product__img">
        <img src="${product.img}" alt="" />
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${product.title}</div>
        <div class="cart-product__price">${product.price}</div>
        <div class="cart-product__color">Màu: ${product.color}</div>
        <div class="cart-product__size">Size: ${product.size}</div>
      </div>
      <div class="cart-product__btn">
        <div class="cart-product__close-btn"><i class="fa-regular fa-trash-can"></i></div>
        <div class="cart-product__quantity-btn">
          <button class="decrease" data-index = ${index}>-</button>
          <span>${product.quantity}</span>
          <button class="increase" data-index = ${index}>+</button>
        </div>
      </div>
    </div>`;
    })
    .join("");
};

const handleEditCart = () => {
  const deleteBtns = $$(".cart-product__close-btn");
  const increaseBtns = $$(".increase");
  const decreaseBtns = $$(".decrease");

  deleteBtns.forEach((btn, index) => {
    btn.onclick = () => {
      addedProduct.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(addedProduct));
      renderCart(addedProduct);
    };
  });

  increaseBtns.forEach((btn, index) => {
    btn.onclick = () => {
      addedProduct[index].quantity += 1;
      localStorage.setItem("cart", JSON.stringify(addedProduct));
      renderCart(addedProduct);
    };
  });

  decreaseBtns.forEach((btn, index) => {
    btn.onclick = () => {
      addedProduct[index].quantity -= 1;
      localStorage.setItem("cart", JSON.stringify(addedProduct));
      renderCart(addedProduct);
      if (addedProduct[index].quantity == 0) {
        addedProduct.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(addedProduct));
        renderCart(addedProduct);
      }
    };
  });
};

const displayPayment = () => {
  const payBtn = $(".cart-pay-btn");
  const payBox = $(".confirm-pay-wrapper");
  if (payBox && payBtn) {
    payBtn.onclick = () => {
      payBox.classList.add("active");
    };
  }
};

const handlePayment = (info) => {
  const payBox = $(".confirm-pay-wrapper");
  const payInfo = $(".confirm-info");
  const payBtn = $(".confirm-pay");
  const closeBtn = $(".confirm-close");
  const isLogin = JSON.parse(localStorage.getItem("isLogin"));
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const signInBox = $("#display_user-box");
  const cartBox = $("#display_cart");

  if (isLogin && currentUser) {
    payInfo.innerHTML = `
  <div>Tài khoản: <span>${currentUser.user}</span></div>
  <div>SĐT: <span>${currentUser.number}</span></div>
  <div>Số tiền: <span>${info.price} đồng</span></div>`;
    payBtn.textContent = `Thanh toán`;

    payBtn.onclick = () => {
      addedProduct = [];
      localStorage.setItem("cart", JSON.stringify(addedProduct));
      renderCart(addedProduct);
      payBtn.classList.remove("active");
    };
    if (addedProduct.length == 0) {
      payInfo.innerHTML = `<div class="pay-success">
            <span>Thanh toán thành công</span> <br>
            <span>Cảm ơn bạn đã lựa chọn Canifa!</span>
          </div>`;
    }
  } else {
    payInfo.innerHTML = `
  <div>Bạn phải <span>đăng nhập tài khoản</span> để thanh toán</div>`;
    payBtn.textContent = `Đăng nhập`;
    payBtn.onclick = () => {
      signInBox.checked = true;
      cartBox.checked = false;
      payBox.classList.remove("active");
    };
  }

  closeBtn.onclick = () => {
    payBox.classList.remove("active");
  };

  payBtn.classList.add("active");
};

renderCart(addedProduct);

export { renderCart, addedProduct };
