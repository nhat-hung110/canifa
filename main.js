const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Trượt banner

slideBanner = () => {
  const listBanner = $(".list-banner");
  const banners = $$(".list-banner a");
  const rightBtn = $(".banner__right-btn");
  const leftBtn = $(".banner__left-btn");
  const indexBanner = $$(".index-banner__item");
  const bannerWidth = banners[0].offsetWidth;
  let currentIndex = 0;

  const handleChangeBanner = () => {
    currentIndex++;
    if (currentIndex >= banners.length) {
      currentIndex = 0;
    }
    const offset = -currentIndex * bannerWidth;
    listBanner.style.transform = `translateX(${offset}px)`;
    updateIndicator();
  };

  let handleAutoChangeBanner = setInterval(handleChangeBanner, 4000);

  rightBtn.onclick = () => {
    clearInterval(handleAutoChangeBanner);
    handleChangeBanner();
    handleAutoChangeBanner = setInterval(handleChangeBanner, 4000);
  };

  leftBtn.onclick = () => {
    clearInterval(handleAutoChangeBanner);
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = banners.length - 1;
    }
    const offset = -currentIndex * bannerWidth;
    listBanner.style.transform = `translateX(${offset}px)`;
    handleAutoChangeBanner = setInterval(handleChangeBanner, 4000);
    updateIndicator();
  };

  const updateIndicator = () => {
    $(".index-banner--active")?.classList.remove("index-banner--active");
    indexBanner[currentIndex].classList.add("index-banner--active");
  };
};

slideBanner();

// list sản phẩm
// 1, Áo chống nắng
const products1 = [
  {
    id: 1,
    img: [
      "./assets/img/Ao_CN/CN-NU/blue1.webp",
      "./assets/img/Ao_CN/CN-NU/grey1.webp",
      "./assets/img/Ao_CN/CN-NU/pink1.webp",
    ],
    color: ["navy", "grey", "pink"],
    title: "Áo khoác chống nắng nữ",
    price: "549.000",
  },
  {
    id: 2,
    img: [
      "./assets/img/Ao_CN/CN-NU/grey1.webp",
      "./assets/img/Ao_CN/CN-NU/blue1.webp",
      "./assets/img/Ao_CN/CN-NU/pink1.webp",
    ],
    color: ["grey", "navy", "pink"],
    title: "Áo khoác chống nắng nữ",
    price: "549.000",
  },
  {
    id: 3,
    img: [
      "./assets/img/Ao_CN/CN-NAM/black1.webp",
      "./assets/img/Ao_CN/CN-NAM/grey1.webp",
      "./assets/img/Ao_CN/CN-NAM/blue1.webp",
    ],
    color: ["black", "grey", "blue"],
    title: "Áo khoác chống nắng nam",
    price: "549.000",
  },
  {
    id: 4,
    img: [
      "./assets/img/Ao_CN/CN-NAM/blue1.webp",
      "./assets/img/Ao_CN/CN-NAM/grey1.webp",
      "./assets/img/Ao_CN/CN-NAM/black1.webp",
    ],
    color: ["blue", "grey", "black"],
    title: "Áo khoác chống nắng nam",
    price: "549.000",
  },
];

// 2, Áo phông
const products2 = [
  {
    id: 1,
    img: [
      "./assets/img/AoPhong/AP-KID/AP1-1.webp",
      "./assets/img/AoPhong/AP-KID/AP2-1.webp",
    ],
    color: ["pink", "white"],
    title: "Áo phông unisex trẻ em cotton USA có hình in",
    price: "199.000",
  },
  {
    id: 2,
    img: [
      "./assets/img/AoPhong/AP-NU/AP1-1.webp",
      "./assets/img/AoPhong/AP-NU/AP2-1.webp",
      "./assets/img/AoPhong/AP-NU/AP3-1.webp",
    ],
    color: ["black", "pink", "grey"],
    title: "Áo phông unisex người lớn có hình in",
    price: "349.000",
  },
  {
    id: 3,
    img: [
      "./assets/img/AoPhong/AP-NAM/AP1-1.webp",
      "./assets/img/AoPhong/AP-NAM/AP3-1.webp",
      "./assets/img/AoPhong/AP-NAM/AP2-1.webp",
    ],
    color: ["black", "white", "navy"],
    title: "Áo phông nam cotton USA dáng rộng",
    price: "349.000",
  },
  {
    id: 4,
    img: [
      "./assets/img/AoPhong/AP-NAM/AP2-1.webp",
      "./assets/img/AoPhong/AP-NAM/AP3-1.webp",
      "./assets/img/AoPhong/AP-NAM/AP1-1.webp",
    ],
    color: ["navy", "white", "black"],
    title: "Áo phông nam cotton USA dáng rộng",
    price: "349.000",
  },
];

// 3. Quan short
const products3 = [
  {
    id: 1,
    img: [
      "./assets/img/Quan_short/kid/1-1.webp",
      "./assets/img/Quan_short/kid/2-1.webp",
    ],
    color: ["navy", "blue"],
    title: "Quần soóc bé trai cotton USA",
    price: "199.000",
  },
  {
    id: 2,
    img: [
      "./assets/img/Quan_short/nam/1-1.webp",
      "./assets/img/Quan_short/nam/2-1.webp",
      "./assets/img/Quan_short/nam/3-1.webp",
    ],
    color: ["navy", "black", "beige"],
    title: "Quần soóc nam basic cạp chun",
    price: "249.000",
  },
  {
    id: 3,
    img: [
      "./assets/img/Quan_short/nu/1-1.webp",
      "./assets/img/Quan_short/nu/2-1.webp",
      "./assets/img/Quan_short/nu/3-1.webp",
    ],
    color: ["beige", "white", "black"],
    title: "Quần soóc nữ cotton USA cạp chun",
    price: "249.000",
  },
  {
    id: 4,
    img: [
      "./assets/img/Quan_short/nu/4-1.webp",
      "./assets/img/Quan_short/nu/5-1.webp",
    ],
    color: ["black", "white"],
    title: "Quần soóc active nữ",
    price: "249.000",
  },
];

// 4. SP mới
const products4 = [
  {
    id: 2,
    img: [
      "./assets/img/AoPhong/AP-NU/AP1-1.webp",
      "./assets/img/AoPhong/AP-NU/AP2-1.webp",
      "./assets/img/AoPhong/AP-NU/AP3-1.webp",
    ],
    color: ["black", "pink", "grey"],
    title: "Áo phông unisex người lớn có hình in",
    price: "349.000",
  },
  {
    id: 3,
    img: [
      "./assets/img/Ao_CN/CN-NAM/black1.webp",
      "./assets/img/Ao_CN/CN-NAM/grey1.webp",
      "./assets/img/Ao_CN/CN-NAM/blue1.webp",
    ],
    color: ["black", "grey", "blue"],
    title: "Áo khoác chống nắng nam",
    price: "549.000",
  },
  {
    id: 1,
    img: [
      "./assets/img/Ao_CN/CN-NU/blue1.webp",
      "./assets/img/Ao_CN/CN-NU/grey1.webp",
      "./assets/img/Ao_CN/CN-NU/pink1.webp",
    ],
    color: ["navy", "grey", "pink"],
    title: "Áo khoác chống nắng nữ",
    price: "549.000",
  },
  {
    id: 1,
    img: [
      "./assets/img/AoPhong/AP-KID/AP1-1.webp",
      "./assets/img/AoPhong/AP-KID/AP2-1.webp",
    ],
    color: ["pink", "white"],
    title: "Áo phông unisex trẻ em cotton USA có hình in",
    price: "199.000",
  },
];

// Render product color, thêm class current vào color đầu tiên
renderProductColor = (colors) => {
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
  return html;
};

// Render ra ảnh
renderProductImg = (imgs, index) => {
  return `<img src="${imgs[index]}" alt="" />`;
};

// Render ra sản phẩm
renderProduct = (products) => {
  const html = products
    .map((product) => {
      return `
    <div class="group-product__item">
              <a href="">
                <div class="product__img ">
                  ${renderProductImg(product.img, 0)}
                  <div class="product__add">
                    <span>Thêm nhanh vào giỏ</span>
                  </div>
                </div>
                <div class="product__info">
                <div class="product__name">${product.title}</div>
                <div class="product__price">
                ${product.price}
                <span> đ</span>
                </div>
                </div>
                </a>
                <div class="product__color">
                  ${renderProductColor(product.color)}
                </div>
            </div>`;
    })
    .join("");
  return html;
};

// Gọi hàm render từng sản phẩm
$(".group-product__list.products1").innerHTML = renderProduct(products1);
$(".group-product__list.products2").innerHTML = renderProduct(products2);
$(".group-product__list.products3").innerHTML = renderProduct(products3);
$(".group-product__list.products4").innerHTML = renderProduct(products4);

// Hàm click vào màu thì hiện current màu đang trỏ
// Giới hạn phạm vi của product bằng biến wrapper

// I. Đổi thẻ color
// 1. Lấy ra các border-color: => done
// 2. Lấy thẻ cha chứa từng nhóm color: ==> done
// 3. Từ thẻ cha lấy ra các border-color ==> done
// 4. Khi click bỏ class current ở color ==> done
// 5. Thêm class current vào màu đang trỏ  ==> done

// II. Đổi ảnh tương ứng với index của color
// 1. Lấy index của color đang click ==> done
// 2. Lấy ra thẻ cha product-item -> lấy ra thẻ con img ==>done
// 3. Lấy ra index của thẻ product-item đó để trỏ vào index trong mảng products ==>
// 4. Lấy ảnh tương ứng của product-item đã trỏ
// 5. Thay src

addEventOnColor = (wrapper, products) => {
  const wrapperList = $(wrapper);
  const colorList = wrapperList.querySelectorAll(".product__color-border");
  const productList = wrapperList.querySelectorAll(".group-product__item");

  colorList.forEach((color) => {
    color.onclick = () => {
      // Lấy cha chứa nhóm màu (parent chính là div.product__color)
      const parent = color.parentElement;

      // Tìm tất cả color trong cùng 1 nhóm
      const colorItem = parent.querySelectorAll(".product__color-border");

      // Xóa class current
      colorItem.forEach((item) =>
        item.classList.remove("product__color--current")
      );

      // Thêm class current vào color đang click
      color.classList.add("product__color--current");

      // Lấy index của color đang click
      let clickedIndex = Array.from(colorItem).indexOf(color);

      // Lấy thẻ cha product-item
      const productItem = parent.closest(".group-product__item");

      // Lấy thẻ img từ thẻ cha
      const productImg = productItem.querySelector("img");

      // Lấy index của product-item đang trỏ
      const productIndex = Array.from(productList).indexOf(productItem);

      // Lấy product tương ứng của product-item đã trỏ
      const product = products[productIndex];

      // Đổi ảnh
      productImg.src = product.img[clickedIndex];
    };
  });
};

addEventOnColor(".group-product__list.products1", products1);
addEventOnColor(".group-product__list.products2", products2);
addEventOnColor(".group-product__list.products3", products3);
addEventOnColor(".group-product__list.products4", products4);
