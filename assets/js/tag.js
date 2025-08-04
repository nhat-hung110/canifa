import {$, $$, productApi, renderProduct, renderProductColor, handleChangeColor} from "./main.js"

const productsList = [
  "AoPhongNu",
  "VayNu",
  "QuanShortNu",
  "AoPoloNam",
  "AoPhongNam",
  "AoSoMiNam",
  "DoBoBeGai",
  "AoPhongBeGai",
  "QuanBeGai",
  "DoBoBeTrai",
  "AoPhongBeTrai",
  "PoloBeTrai",
];
const tagProductBox = $$(".tag-product__list");
const newProductBox = $('.group-product__list.new-product')

const renderSuggestProduct = () => {
  const suggestProductBox = $(".group-product__list");
  const productList = $$(".tag-product__list .group-product__item");
  const randomList = [...productList].sort(() => Math.random() - 0.5);
  const suggestProductList = randomList.slice(0, 8);

  suggestProductBox.innerHTML = suggestProductList
    .map((product) => product.outerHTML)
    .join("");
  handleChangeColor();
};

productsList.forEach((productsType) => {
  fetch(`${productApi}${productsType}`)
    .then((response) => response.json())
    .then((products) => {
      tagProductBox.forEach((productBox) => {
        if (productBox.classList.contains(productsType)) {
          const html = products
            .map((product) => renderProduct(product, productsType))
            .join("");
          productBox.innerHTML = html;
        }
      });
    })
    .then(() => {
      handleChangeColor();
      renderSuggestProduct();
    });
});
    
