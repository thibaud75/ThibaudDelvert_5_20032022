// const displayCart = () => {
//   let canapArticle = document.createElement("article");
//   document.querySelector("#cart__items").appendChild(canapArticle);
//   canapArticle.className = "cart__item";
//   canapArticle.setAttribute("data-id", productid);
//   canapArticle.setAttribute("data-color", color);
//   console.log(canapArticle);
//   let canapDiv = document.createElement("div");
//   canapDiv.className = "cart__item__img";
//   canapArticle.appendChild(canapDiv);
//   console.log(canapDiv);
//   let canapImg = document.createElement("img");
//   canapImg.src = canap.imageUrl;
//   canapDiv.appendChild(canapImg);
//   console.log(canapImg);
// };

// displayCart();
class Cart {
  constructor() {
    this.initCart();
  }

  initCart() {
    const arrayCart = [];
    const localStorageCart = JSON.stringify(arrayCart);
    localStorage.setItem("cart", localStorageCart);
    console.log(arrayCart);
    if (!localStorageCart) {
      console.log("initialisez panier");
    } else if (localStorageCart && localStorageCart.length > 0) {
      console.log("panier déja existant");
    }
    console.log(localStorageCart.length);
  }

  addToCart(item) {
    const cart = JSON.parse(localStorage.cart);
    cart.push(item);
    localStorage.cart = JSON.stringify(cart);
    console.log({ cart });
  }
}
