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
    console.log({ cart });
    console.log(item);

    // Création d'une variable foundProduct à laquelle on passe la methode find au tableau cart
    let foundProduct = cart.find(
      (p) => p.color === item.color && p.productid === item.productid
    );
    console.log(foundProduct);
    // Foundproduct renvoie undefined si la combinaison de item.color et item.productid
    // ne sont pas présent dans cart, sinon un objet avec la combinaison de item.color et item.productid

    // Si foundProduct est undefined ça veut dire que la combinaison de item.color et item.productid
    // n'existe pas dans cart donc on va push l'item dans cart
    if (foundProduct === undefined) {
      cart.push(item);
    } else {
      // Si foundProduct ne renvoie pas undefined ça veut dire que la combinaison de item.color
      // et de item.productid est déjà présent donc on va l'incrémenter grâce à foundProduct qui
      // va nous renvoyer un objet avec la combinaison des deux éléments à laqulle on va ajouter
      // la quantité qu'on souhaite en lui passant item.quantity
      foundProduct.quantity = +foundProduct.quantity + +item.quantity;
      console.log(foundProduct.quantity);
      console.log(typeof foundProduct);
      console.log(foundProduct);
    }

    localStorage.cart = JSON.stringify(cart);
  }
}

const getCart = () => {
  const getArrayCart = localStorage.getItem("cart");
  const parseCart = JSON.parse(getArrayCart);
  console.log(parseCart);
};

getCart();

const displayCart = () => {
  let canapArticle = document.createElement("article");
  document.querySelector("#cart__items").appendChild(canapArticle);
  canapArticle.className = "cart__item";
  canapArticle.setAttribute("data-id", cart[0]);
  canapArticle.setAttribute("data-color", color);
  console.log(canapArticle);

  let canapDiv = document.createElement("div");
  canapDiv.className = "cart__item__img";
  canapArticle.appendChild(canapDiv);
  console.log(canapDiv);

  let canapImg = document.createElement("img");
  canapImg.src = canap.imageUrl;
  canapDiv.appendChild(canapImg);
  console.log(canapImg);
};

displayCart();
