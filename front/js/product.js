const displayProduct = (canap) => {
  let productImg = document.createElement("img");
  productImg.src = canap.imageUrl;
  productImg.alt = canap.altTxt;
  document.querySelector(".item__img").appendChild(productImg);
  let productName = document.getElementById("title");
  productName.innerHTML = canap.name;
  let productPrice = document.getElementById("price");
  productPrice.innerHTML = canap.price;
  let productDesc = document.getElementById("description");
  productDesc.innerHTML = canap.description;
  createColorsSelectOptions(canap.colors);
};

const createColorsSelectOptions = (colors) => {
  colors.forEach((item) => {
    let productColors = document.createElement("option");
    document.querySelector("#colors").appendChild(productColors);
    productColors.innerHTML = item;
  });
};

const productPage = (productid) => {
  fetch(`https://kanap-oc.herokuapp.com/api/products/${productid}`).then(
    function (response) {
      var contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json().then(function (json) {
          console.log(json);
          displayProduct(json);
          // createCanaps(json);
          // traitement du JSON
        });
      } else {
        console.log("Oops, nous n'avons pas du JSON!");
      }
    }
  );
};

const url = new URL(window.location.href);
const productid = url.searchParams.get("productid");
productPage(productid);

const addToCart = document
  .querySelector("#addToCart")
  .addEventListener("click", () => {
    const color = document.querySelector("#colors").value;
    const quantity = document.querySelector("#quantity").value;
    const desc = document.querySelector("#description").textContent;
    const price = document.querySelector("#price").textContent;
    const name = document.querySelector("#title").textContent;
    const imageUrl = document.querySelector(".item__img img").src;
    const altTxt = document.querySelector(".item__img img").alt;
    const item = {
      color,
      productid,
      quantity,
      desc,
      price,
      name,
      imageUrl,
      altTxt,
    };
    cart.addToCart(item);
  });
