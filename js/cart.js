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
    console.log(cart);
    // vérifier si objet présent dans le tableau ou pas
    const map = cart.map((item) => item.productid);
    console.log(map);

    console.log(map.indexOf(item.productid));
    // si objet présent et > 0 on incrémente la ligne en question
    // sinon on ajoute l'objet au tab
    cart.push(item);
    localStorage.cart = JSON.stringify(cart);
    console.log({ cart });
  }
}
