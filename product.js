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

const urlParams = new URLSearchParams(window.location.search);
const productType = urlParams.get("type");
const productId = urlParams.get("id");

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
  colorTitle.textContent = product.color[0].toUpperCase()
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
      colorTitle.textContent = product.color[colorIndex].toUpperCase()
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
    </div>
    </div>
    <div class="toast-icon"><i class="fa-solid fa-xmark"></i></div>
    </div>
    `;
    
    const closeToast = $(".toast-icon");
    closeToast.onclick = () => {
      toastWrapper.innerHTML = "";
    };
    console.log(colorTitle.textContent.toLowerCase(), imgSrcArray[0] ,productSizeTitle.textContent, productId) // Lay size, anh, mau, id sp dang chon
  };
};

// Them san pham vao gio hang
// 1. Lay id, mau, size san pham dang chon
// 2. Post len 1 API
// 3. Tu API lay ve va render ra gio hang, neu san pham da co thi +1
