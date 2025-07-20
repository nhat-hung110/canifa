// 1. Click vào img-item ==> đổi main-img và thêm class active cho img đang click ==> DONE
// 2. Click vào button trên img ==> đổi main-img và thêm class active cho img đang click ==> done
// 3. Render ra color-list ==> done
// 4. Click vào color ==> đổi color-title và đổi ảnh sản phẩm
// 5. Click vào size ==> đổi size-title
// 6. Click vào detail-icon ==> đổi icon sang '-' và hiện detail
// 7. Click vào add-btn thì hiện toast "Thêm thành công"

products = [
  {
    id: 1,
    title: "Áo khoác chống nắng nữ",
    price: "549.000 ₫",
    color: ["navy", "pink", "grey"],
    img: [
      [
        "/assets/img/Ao_CN/CN-NU/blue1.webp",
        "/assets/img/Ao_CN/CN-NU/blue2.webp",
        "/assets/img/Ao_CN/CN-NU/blue3.webp",
        "/assets/img/Ao_CN/CN-NU/blue4.webp",
        "/assets/img/Ao_CN/CN-NU/blue5.webp",
      ],
      [
        "/assets/img/Ao_CN/CN-NU/pink1.webp",
        "/assets/img/Ao_CN/CN-NU/pink2.webp",
        "/assets/img/Ao_CN/CN-NU/pink3.webp",
        "/assets/img/Ao_CN/CN-NU/pink4.webp",
        "/assets/img/Ao_CN/CN-NU/pink5.webp",
      ],
      [
        "/assets/img/Ao_CN/CN-NU/grey1.webp",
        "/assets/img/Ao_CN/CN-NU/grey2.webp",
        "/assets/img/Ao_CN/CN-NU/grey3.webp",
        "/assets/img/Ao_CN/CN-NU/grey4.webp",
        "/assets/img/Ao_CN/CN-NU/grey5.webp",
      ],
    ],
  },
];

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const leftBtn = $(".img-left-btn");
const rightBtn = $(".img-right-btn");
const mainImg = $(".main-img img");
const productTitle = $(".product-title");
const productPrice = $(".product-price");
const colorBox = $(".product-color__list");

let currentIndex = 0;
let navImgList = [];

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

// Click vào color ==> đổi color-title và đổi ảnh sản phẩm
// Hàm xử lý thay đổi màu và ảnh
const handleChangeColor = () => {
  const colorList = $$(".product__color-border");
  colorList.forEach((color) => {
    color.onclick = () => {
      colorList.forEach((c) => c.classList.remove("product__color--current"));
      color.classList.add("product__color--current");
    };
  });
};

renderProductImg(products[0].img[0]);
renderProductInfo(products[0]);
renderProductColor(products[0].color);
handleChangeImg();
handleChangeImgOnBtn();
handleChangeColor();
