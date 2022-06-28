class Cart {
  constructor() {
    this.initCart();
  }

  initCart() {
    const localStorageCart = JSON.parse(localStorage.getItem("cart"));
    if (!localStorageCart) {
      console.log("initialisez panier");
      const arrayCart = [];
      const cart = JSON.stringify(arrayCart);
      localStorage.setItem("cart", cart);
    } else if (localStorageCart && localStorageCart.length > 0) {
      console.log("panier déja existant");
    }
    // console.log(localStorageCart.length);
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
    if (!foundProduct) {
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

const cart = new Cart();

const getArrayCart = localStorage.getItem("cart");
const parseCart = JSON.parse(getArrayCart);
console.log(parseCart);
console.log(parseCart.length);

const displayCart = () => {
  for (let i = 0; i < parseCart.length; i++) {
    let cartArticle = document.createElement("article");
    document.querySelector("#cart__items").appendChild(cartArticle);
    cartArticle.className = "cart__item";
    cartArticle.setAttribute("data-id", parseCart[i].productid);
    cartArticle.setAttribute("data-color", parseCart[i].color);
    console.log(cartArticle);

    let cartDivImg = document.createElement("div");
    cartDivImg.className = "cart__item__img";
    cartArticle.appendChild(cartDivImg);
    console.log(cartDivImg);

    let cartImg = document.createElement("img");
    cartImg.src = parseCart[i].img;
    cartImg.alt = parseCart[i].altTxt;
    cartDivImg.appendChild(cartImg);
    console.log(cartImg);

    let cartDivMain = document.createElement("div");
    cartDivMain.className = "cart__item__content";
    cartArticle.appendChild(cartDivMain);
    console.log(cartDivMain);

    let cartDivMainDesc = document.createElement("div");
    cartDivMainDesc.className = "cart__item__content__description";
    cartDivMain.appendChild(cartDivMainDesc);
    console.log(cartDivMainDesc);

    let cartDivMainDescTitle = document.createElement("h2");
    cartDivMainDesc.appendChild(cartDivMainDescTitle);
    cartDivMainDescTitle.innerHTML = parseCart[i].name;
    console.log(cartDivMainDescTitle);

    let cartDivMainDescColor = document.createElement("p");
    cartDivMainDesc.appendChild(cartDivMainDescColor);
    cartDivMainDescColor.innerHTML = parseCart[i].color;
    console.log(cartDivMainDescColor);

    let cartDivMainDescPrice = document.createElement("p");
    cartDivMainDesc.appendChild(cartDivMainDescPrice);
    cartDivMainDescPrice.innerHTML = parseCart[i].price + " €";
    console.log(cartDivMainDescPrice);

    let cartDivMainDesc2 = document.createElement("div");
    cartDivMainDesc2.className = "cart__item__content__settings";
    cartDivMain.appendChild(cartDivMainDesc2);
    console.log(cartDivMainDesc2);

    let cartDivMainDesc2Qt = document.createElement("div");
    cartDivMainDesc2Qt.className = "cart__item__content__settings__quantity";
    cartDivMainDesc2.appendChild(cartDivMainDesc2Qt);
    console.log(cartDivMainDesc2Qt);

    let cartDivMainDesc2QtP = document.createElement("p");
    cartDivMainDesc2Qt.appendChild(cartDivMainDesc2QtP);
    cartDivMainDesc2QtP.innerHTML = "Qté :";

    let cartDivMainDesc2Input = document.createElement("input");
    cartDivMainDesc2Qt.appendChild(cartDivMainDesc2Input);
    cartDivMainDesc2Input.value = parseCart[i].quantity;
    cartDivMainDesc2Input.className = "itemQuantity";
    cartDivMainDesc2Input.setAttribute("type", "number");
    cartDivMainDesc2Input.setAttribute("min", "1");
    cartDivMainDesc2Input.setAttribute("max", "100");
    cartDivMainDesc2Input.setAttribute("name", "itemQuantity");

    let cartDivMainDelete = document.createElement("div");
    cartDivMainDesc2.appendChild(cartDivMainDelete);
    cartDivMainDelete.className = "cart__item__content__settings__delete";
    console.log(cartDivMainDelete);

    let cartDivMainDeleteP = document.createElement("p");
    cartDivMainDeleteP.className = "deleteItem";
    cartDivMainDelete.appendChild(cartDivMainDeleteP);
    cartDivMainDeleteP.innerHTML = "Supprimer";
    console.log(cartDivMainDeleteP);
  }

  // const deleteProduct = document.querySelector(".deleteItem");
  // console.log(deleteProduct);
  // deleteProduct.addEventListener("click", () => {
  //   console.log("yo");
  // });
};

displayCart();
