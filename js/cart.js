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
    const map = cart.map((item) => ({
      productid: item.productid,
      color: item.color,
    }));
    console.log(map);

    const toto = cart.filter(
      (cartItem) =>
        item.productid === cartItem.productid && item.color === cartItem.color
    );
    console.log({ toto });

    const index = map.indexOf(item.productid);
    console.log(map.indexOf(item.productid));
    if (index === -1) {
      cart.push(item);
      console.log("Le nouveau tableau est : " + map);
    } else if (index > -1) {
      cart[index].quantity = +cart[index].quantity + +item.quantity;
      console.log(cart[index].quantity);
      console.log(
        JSON.stringify(cart[index]) + " existe déjà dans le tableau."
      );
    }

    // si objet présent et > 0 on incrémente la ligne en question
    // sinon on ajoute l'objet au tab
    localStorage.cart = JSON.stringify(cart);
    console.log({ cart });
  }
}
