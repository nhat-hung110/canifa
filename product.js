// 1. Click vào img-item ==> đổi main-img và thêm class active cho img đang click ==> DONE
// 2. Click vào button trên img ==> đổi main-img và thêm class active cho img đang click ==> done
// 3. Render ra color-list ==> done
// 4. Click vào color ==> đổi color-title và đổi ảnh sản phẩm  ==> done
// 5. Click vào size ==> đổi size-title ==> done
// 6. Click vào detail-icon ==> đổi icon sang '-' và hiện detail  ==> done
// 7. Click vào add-btn thì hiện toast "Thêm thành công"  ==> done

const productApi = "http://localhost:3000/";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const leftBtn = $(".img-left-btn");
const rightBtn = $(".img-right-btn");
const mainImg = $(".main-img img");
const productTitle = $(".product-title");
const productPrice = $(".product-price");
const productSizeTitle = $(".product-size__text span");
const colorBox = $(".product-color__list");
const colorTitle = $(".product-color__text span");
const toastWrapper = $(".toast-wrapper");

let currentIndex = 0;
let navImgList = [];
let addedProduct = JSON.parse(localStorage.getItem("cart")) || [];

const urlParams = new URLSearchParams(window.location.search);
const productType = urlParams.get("type");
const productId = urlParams.get("id");

// Render ảnh
const renderProductImg = (imgs) => {
  const html = imgs
    .map((img, index) => {
      return `<img class="nav-img-item ${
        index === 0 ? "active" : ""
      }" src="${img}" alt="" />`;
    })
    .join("");
  const navImg = $(".nav-img");
  navImg.innerHTML = html;

  mainImg.src = imgs[0]; // Ảnh đầu tiên làm ảnh chính
  currentIndex = 0;

  // Gán lại navImgList sau khi render
  navImgList = $$(".nav-img-item");
};

const renderProductInfo = (product) => {
  productTitle.textContent = product.title;
  productPrice.textContent = product.price;
  colorTitle.textContent = product.color[0].toUpperCase();
  productSizeTitle.textContent = product.size[0];
};

// Đổi ảnh chính dựa trên index nav-img
const changeMainImg = (index) => {
  mainImg.src = navImgList[index].src;
  navImgList.forEach((img) => img.classList.remove("active"));
  navImgList[index].classList.add("active");
  currentIndex = index;
};

// bắt sự kiện click vào ảnh nhỏ
const handleChangeImg = () => {
  navImgList.forEach((item, index) => {
    item.onclick = () => {
      changeMainImg(index);
    };
  });
};

// Bắt sự kiện click vào nút trái phải
const handleChangeImgOnBtn = () => {
  leftBtn.onclick = () => {
    const prevIndex =
      currentIndex <= 0 ? navImgList.length - 1 : currentIndex - 1;
    changeMainImg(prevIndex);
  };

  rightBtn.onclick = () => {
    const nextIndex =
      currentIndex >= navImgList.length - 1 ? 0 : currentIndex + 1;
    changeMainImg(nextIndex);
  };
};

//render product color
const renderProductColor = (colors) => {
  const html = colors
    .map((color, index) => {
      return `
        <div class="product__color-border ${
          index == 0 ? "product__color--current" : ""
        }">
          <div class="product__color-inside product-color--${color} "></div>
        </div>
    `;
    })
    .join("");
  colorBox.innerHTML = html;
};

const renderProductSize = (sizes) => {
  const html = sizes
    .map((size) => {
      return `<div class="product-size__item">${size}</div>`;
    })
    .join("");
  const productSizeList = $(".product-size__list");
  productSizeList.innerHTML = html;
};

// Hàm xử lý thay đổi màu và ảnh khi click vào color:
const handleChangeColor = (product) => {
  const colorList = $$(".product__color-border");

  colorList.forEach((color) => {
    color.onclick = () => {
      colorList.forEach((c) => c.classList.remove("product__color--current"));
      color.classList.add("product__color--current");

      // Đổi ảnh
      let colorIndex = [...colorList].indexOf(color);
      renderProductImg(product.img[colorIndex]);
      handleChangeImg();

      // Đổi color-title
      colorTitle.textContent = product.color[colorIndex].toUpperCase();
    };
  });
};

// Hàm xử lý thay đổi Size dựa trên sự kiện click
const handleChangeSize = (product) => {
  const sizeList = $$(".product-size__item");
  sizeList.forEach((size) => {
    size.onclick = () => {
      let sizeIndex = [...sizeList].indexOf(size);
      productSizeTitle.textContent = product.size[sizeIndex];
    };
  });
};

// Hàm xử lý ẩn hiện Product detail
const handleChangeDetail = () => {
  const productDetails = $$(".product-delail__desc");
  const productDetailBtn = $$(".product-delail__title i");
  const productDetailTitle = $$(".product-delail__title");

  productDetailTitle.forEach((btn) => {
    btn.onclick = () => {
      const detailIndex = [...productDetailTitle].indexOf(btn);
      const isExpand =
        productDetails[detailIndex].classList.contains("display");

      productDetails[detailIndex].classList.toggle("display");

      if (isExpand) {
        productDetailBtn[detailIndex].classList.replace("fa-minus", "fa-plus");
      } else {
        productDetailBtn[detailIndex].classList.replace("fa-plus", "fa-minus");
      }
    };
  });
};

// Hàm xử lý ẩn hiện toast
const handleAddProduct = () => {
  const addBtn = $(".add-product");

  addBtn.onclick = () => {
    const navImgs = $$(".nav-img img");
    const imgSrcArray = [...navImgs].map((img) => img.src);
    const size = productSizeTitle.textContent;
    const color = colorTitle.textContent;
    toastWrapper.innerHTML = `<div class="toast">
    <div class="toast-text">
    <div class="toast-title">Đã thêm vào giỏ hàng</div>
    <div class="toast-product">
    <div class="toast-img">
    <img src="${imgSrcArray[0]}" alt="">
    </div>
    <div class="toast-desc">
    <div class="toast-color">Màu: <span>${color}</span></div>
    <div class="toast-size">Size: <span>${size}</span></div>
    </div>
    <div class="toast-btn">
                <div>Xem giỏ hàng</div>
            </div>
    </div>
    </div>
    <div class="toast-icon"><i class="fa-solid fa-xmark"></i></div>
    </div>
    `;

    const closeToast = $(".toast-icon");
    closeToast.onclick = () => {
      toastWrapper.innerHTML = "";
    };

    $(".toast-btn").onclick = () => {
      const displayCartCheckbox = document.getElementById("display_cart");
      displayCartCheckbox.checked = true;
      toastWrapper.innerHTML = "";
    };

    const addProduct = {
      id: productId,
      title: productTitle.textContent,
      color: colorTitle.textContent,
      size: productSizeTitle.textContent,
      price: productPrice.textContent,
      img: imgSrcArray[0],
      quantity: 1,
    };

    const existingProduct = addedProduct.find(
      (product) =>
        product.id === addProduct.id &&
        product.color === addProduct.color &&
        product.size === addProduct.size
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      addedProduct.push(addProduct);
    }

    localStorage.setItem("cart", JSON.stringify(addedProduct));
    renderCart(addedProduct);
  };
};

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
  payBtn.onclick = () => {
    payBox.classList.add("active");
  };
};

const handlePayment = (info) => {
  const payBox = $(".confirm-pay-wrapper");
  const payInfo = $(".confirm-info");
  const payBtn = $(".confirm-pay");
  const closeBtn = $(".confirm-close");

  payInfo.innerHTML = `
  <div>Tài khoản: <span>${info.name}</span></div>
  <div>SĐT: <span>${info.number}</span></div>
  <div>Số tiền: <span>${info.price}</span></div>`;

  payBtn.onclick = () => {
    payInfo.innerHTML = `<div class="pay-success">
            <span>Thanh toán thành công</span> <br>
            <span>Cảm ơn bạn đã lựa chọn Canifa!</span>
          </div>`;
    payBtn.classList.remove("active");
    addedProduct = [];
    localStorage.setItem("cart", JSON.stringify(addedProduct));
    renderCart(addedProduct);
  };

  closeBtn.onclick = () => {
    payBox.classList.remove("active");
  };

  payBtn.classList.add("active");
};

const handleSignIn = () => {
  const signInBtn = $(".user-box-title .sign-in");
  const signUpBtn = $(".user-box-title .sign-up");
  const signInBox = $(".sign-in-wrapper");
  const signUpBox = $(".sign-up-wrapper");

  signInBtn.onclick = () => {
    signUpBtn.classList.remove("active");
    signUpBox.classList.remove("active");
    signInBtn.classList.add("active");
    signInBox.classList.add("active");
  };

  signUpBtn.onclick = () => {
    signInBtn.classList.remove("active");
    signInBox.classList.remove("active");
    signUpBtn.classList.add("active");
    signUpBox.classList.add("active");
  };
};

// Hàm valid form:
// Khi không có value thì show lỗi => done
// Kiểm tra SĐT => done
// Kiểm tra độ dài => done
// Kiểm tra mật khẩu nhập lại => done
const validSignUpForm = () => {
  const signUpInputs = $$(".sign-up-wrapper input");
  const numberInput = $("#number-sign-up-input");
  const nameInput = $('#fullname-input')
  const passwordInput = $("#sign-up-password-input");
  const confirmPasswordInput = $("#confirm-password-input");
  const signUpBtn = $(".sign-up-btn");

  const showError = (input, message) => {
    const parentElement = input.parentElement;
    const errorElement = parentElement.querySelector(".message");
    errorElement.innerHTML = message;
  };

  const isEmpty = (input) => {
    return input.value.trim() == "";
  };

  const isValidPhone = (value) => {
    const regex = /^(0|\+84)\d{9}$/;
    return regex.test(value.trim());
  };

  const minLength = (value, length) => {
    return value.length >= length;
  };

  const isConfirmPassword = (value, valueConfirm) => {
    return value == valueConfirm;
  };

  const validForm = (input) => {
    if (isEmpty(input)) {
      showError(input, "Bạn phải nhập trường này");
      input.classList.add("invalid");
    } else {
      showError(input, "");
      input.classList.remove("invalid");
      if (input == numberInput && !isValidPhone(input.value)) {
        showError(input, "Phải nhập đúng định dạng số điện thoại");
        input.classList.add("invalid");
      }
      if (input == passwordInput && !minLength(input.value, 6)) {
        showError(input, "Mật khẩu phải có tối thiểu 6 ký tự");
        input.classList.add("invalid");
      }
      if (
        input == confirmPasswordInput &&
        !isConfirmPassword(passwordInput.value, input.value)
      ) {
        showError(input, "Mật khẩu nhập lại không đúng");
        input.classList.add("invalid");
      }
    }
  };

  signUpInputs.forEach((input) => {
    input.onblur = () => validForm(input);
    input.oninput = () => {
      showError(input, "");
      input.classList.remove("invalid");
    };
  });

  // Nếu có input invalid thì hiển thị lỗi
  // Nếu tất cả đã valid thì hiển thị đăng ký thành công và post dữ liệu lên API
  signUpBtn.onclick = () => {
    signUpInputs.forEach((input) => validForm(input));

    const hasInvalidInput = [...signUpInputs].some((input) =>
      input.classList.contains("invalid")
    );

    if (!hasInvalidInput) {
      const userInfo ={
        number: numberInput.value,
        user: nameInput.value,
        password: passwordInput.value
      }
      console.log(userInfo)
      updateUserInfo(userInfo)
      signUpInputs.forEach((input) => (input.value = ""));

      const toSignUpBtn = $(".to-sign-up-btn");
      const signInBtn = $(".user-box-title .sign-in");
      const signUpBtn = $(".user-box-title .sign-up");
      const signInBox = $(".sign-in-wrapper");
      const signUpBox = $(".sign-up-wrapper");
      const successSignUpBox = $(".succes-sign-up");

      signUpBox.classList.remove("active");
      successSignUpBox.classList.add("active");

      toSignUpBtn.onclick = () => {
        successSignUpBox.classList.remove("active");
        signUpBtn.classList.remove("active");
        signInBtn.classList.add("active");
        signInBox.classList.add("active");
      };
    }
  };
};

const updateUserInfo = (data) => {}

validSignUpForm();
handleSignIn();

fetch(`${productApi}${productType}/${productId}`)
  .then((res) => res.json())
  .then((product) => {
    renderProductImg(product.img[0]);
    renderProductInfo(product);
    renderProductColor(product.color);
    renderProductSize(product.size);
    handleChangeImg();
    handleChangeImgOnBtn();
    handleChangeColor(product);
    handleChangeSize(product);
    handleChangeDetail();
    handleAddProduct(product);
  });
renderCart(addedProduct);
