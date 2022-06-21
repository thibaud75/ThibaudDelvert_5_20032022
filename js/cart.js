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

    // const map = cart.map((item) => ({
    //   productid: item.productid,
    //   color: item.color,
    // }));

    const map = cart.map((item) => item.productid);
    const map2 = cart.map((item) => item.color);
    console.log(map);
    console.log(map2);

    // const toto = cart.filter(
    //   (cartItem) =>
    //     item.productid === cartItem.productid && item.color === cartItem.color
    // );
    // console.log({ toto });

    const index = map.indexOf(item.productid);
    const index2 = map2.indexOf(item.color);
    // console.log(map.indexOf(item.productid));
    // console.log(map.indexOf(item.color));
    // const index = map.indexOf(toto);
    console.log(index);
    console.log(index2);
    if (index === -1 || index2 === -1) {
      cart.push(item);
      console.log("Le nouveau tableau est : "  );
    } else if (index > -1 && index2 > -1) {
        cart[i].quantity = +cart[i].quantity + +item.quantity;
        console.log(cart[i].quantity);
        console.log(
        JSON.stringify(cart[i]) + " existe déjà dans le tableau."
      );
      console.log(cart.length);  
    }
    // } else if (index2 > -1) {
    //   cart[index2].quantity = +cart[index2].quantity + +item.quantity;
    //   console.log(cart[index +1].quantity);
    // }

    // si objet présent et > 0 on incrémente la ligne en question
    // sinon on ajoute l'objet au tab
    localStorage.cart = JSON.stringify(cart);
    console.log({ cart });
  }
}
