import {
  $,
  $$,
  renderProduct,
  renderProductColor,
  handleChangeColor,
} from "./main.js";

const productsRandomList = [
  "AoPhongNu",
  "AoPoloNam",
  "VayNu",
  "AoSoMiNam",
  "QuanShortNu",
  "AoPhongNam",
  "AoPhongBeTrai",
  "DoBoBeGai",
  "AoPhongBeGai",
  "DoBoBeTrai",
  "QuanBeGai",
  "PoloBeTrai",
];

const productApi = "http://localhost:3000/";
const newProductBox = $(".group-product__list.new-product");
console.log(newProductBox);
productsRandomList.forEach((productsType) => {
  fetch(`${productApi}${productsType}`)
    .then((response) => response.json())
    .then((products) => {
      if (newProductBox) {
        const html = products
          .map((product) => renderProduct(product, productsType))
          .join("");
        newProductBox.innerHTML += html;
      }
    })
    .then(() => {
      handleChangeColor();
    });
});
