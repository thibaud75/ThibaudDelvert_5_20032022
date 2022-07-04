// Création d'une classe Cart qui va permettre à notre page product.js de communiquer avec cart.js
class Cart {
  constructor() {
    this.initCart();
  }

  // Fonction qui initialise le panier dans le localstorage
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
  }

  // Fonction qui récupère un ojet "item" de product.js
  // Si le produit n'existe pas il est ajouté au localstorage
  // Si il existe déjà il n'est pas rajouté inutilement mais la quantité
  // est incrementé au produit correspondant dans le localstorage
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
    if (item.color === "") {
      console.log("pas de choix de couleur");
    } else if (item.quantity === 0) {
      console.log("quantité est 0");
    }
    // Si foundProduct est undefined ça veut dire que la combinaison de item.color et item.productid
    // n'existe pas dans cart donc on va push l'item dans cart
    else if (!foundProduct) {
      cart.push(item);
    } else {
      // Si foundProduct ne renvoie pas undefined ça veut dire que la combinaison de item.color
      // et de item.productid est déjà présent donc on va l'incrémenter grâce à foundProduct qui
      // va nous renvoyer un objet avec la combinaison des deux éléments à laqulle on va ajouter
      // la quantité qu'on souhaite en lui passant item.quantity
      foundProduct.quantity = foundProduct.quantity + item.quantity;
      console.log(foundProduct.quantity);
      console.log(typeof foundProduct);
      console.log(foundProduct);
    }

    localStorage.cart = JSON.stringify(cart);
  }
}

// Déclaration de la classe cart
const cart = new Cart();

// Récupération du localstorage
// puis on le parse pour pouvoir l'exploiter
const getArrayCart = localStorage.getItem("cart");
const parseCart = JSON.parse(getArrayCart);
console.log(parseCart);
console.log(parseCart.length);

// Affichage des canapés du panier de l'utilisateur
const displayCart = () => {
  for (let i = 0; i < parseCart.length; i++) {
    // On parcourt le localstorage et on affiche les produits un par un
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
    cartImg.src = parseCart[i].imageUrl;
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
};

displayCart();

// Fonction qui permet de modifier la quantité de canapé voulu directement sur la page panier
const modifyProduct = () => {
  let inputQuantity = document.querySelectorAll(".itemQuantity");
  console.log(typeof inputQuantity);
  console.log(inputQuantity);

  // La méthode QuerySelectorAll retourne des objets NodeList
  // sur lesquels on peut itérer
  for (let i = 0; i < inputQuantity.length; i++) {
    // Lorsque le nombre de l'input choisit change
    // On attribue à la quantité de l'objet JSON parseCart
    // une nouvelle valeur égale à celle changée
    inputQuantity[i].addEventListener("change", function () {
      parseCart[i].quantity = inputQuantity[i].value;
      // On actualise la valeur dans le localstorage
      localStorage.setItem("cart", JSON.stringify(parseCart));
      console.log(parseCart);
      // console.log("yo");

      location.reload();
    });
  }
};

modifyProduct();

// Fonction qui va supprimer un produit du DOM et du localstorage
const deleteProduct = () => {
  let selectDelete = document.querySelectorAll(".deleteItem");
  console.log(typeof selectDelete);
  console.log(selectDelete);

  // Comme la fonction modifier, la méthode querySelectorALl
  // retourne un objet Nodelist qu'on va itérer
  for (let i = 0; i < selectDelete.length; i++) {
    // On ajoute un event click sur les balises "supprimer"
    selectDelete[i].addEventListener("click", (e) => {
      e.preventDefault();

      // On va supprimer du DOM avec remove l'article ".cart__item"
      // parent le plus proche (en remontant) du paragraphe grâce à closest
      const el = selectDelete[i].closest(".cart__item").remove;

      let productidDelete = parseCart[i].productid;
      let colorDelete = parseCart[i].color;
      console.log(productidDelete + " " + colorDelete);

      const test = parseCart.filter(
        (el) => el.productid !== productidDelete || el.color !== colorDelete
      );
      console.log(test);

      const test2 = JSON.stringify(test);
      console.log(test2);
      localStorage.setItem("cart", test2);
      console.log("yo");

      location.reload();
    });
  }
};

deleteProduct();

// Fonction affichant la quantité d'article dans le panier de l'utilisateur ainsi que le prix total
// sur la page panier
const displayCartPrice = () => {
  let totalQuantity = 0;
  let totalPrice = 0;
  for (let i = 0; i < parseCart.length; i++) {
    let totalQuantityDom = document.querySelector("#totalQuantity");
    totalQuantity = +totalQuantity + +parseCart[i].quantity;
    console.log(totalQuantity);
    totalQuantityDom.innerHTML = totalQuantity;
  }
  for (let i = 0; i < parseCart.length; i++) {
    let totalPriceDom = document.querySelector("#totalPrice");
    console.log(totalPrice);
    totalPrice = +totalPrice + +parseCart[i].price * +parseCart[i].quantity;
    console.log(totalPrice);
    totalPriceDom.innerHTML = totalPrice;
  }
};

displayCartPrice();

// Fonction permettant de checker si les informations rentrées par l'utilisateur
// sont valides
const inputChecker = () => {
  const inputs = document.querySelectorAll(
    "input[type=text], input[type=email]"
  );
  console.log(inputs);

  let nameCheck = new RegExp(/^[a-zéèçà]{2,50}(-|)?([a-zéèçà]{2,50})?$/gim);
  let cityCheck = new RegExp(/^[a-zéèçà]{2,50}(-| )?([a-zéèçà]{2,50})?$/gim);
  let addressCheck = new RegExp(/^[a-zA-Z0-9\s,.'-]{3,}$/);
  let emailCheck = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

  const firstNameChecker = (value) => {
    if (!value.match(nameCheck) && value.length > 0) {
      document.querySelector("#firstNameErrorMsg").textContent =
        "Le prénom ne doit pas contenir de caractères spéciaux";
    } else {
      document.querySelector("#firstNameErrorMsg").textContent = "";
    }
    console.log(value);
  };

  const lastNameChecker = (value) => {
    if (!value.match(nameCheck) && value.length > 0) {
      document.querySelector("#lastNameErrorMsg").textContent =
        "Le nom ne doit pas contenir de caractères spéciaux";
    } else {
      document.querySelector("#lastNameErrorMsg").textContent = "";
    }
    console.log(value);
  };

  const addressChecker = (value) => {
    if (!value.match(addressCheck) && value.length > 0) {
      document.querySelector("#addressErrorMsg").textContent =
        "L'adresse ne doit pas contenir de caractères spéciaux";
    } else {
      document.querySelector("#addressErrorMsg").textContent = "";
    }
    console.log(value);
  };

  const cityChecker = (value) => {
    if (!value.match(cityCheck) && value.length > 0) {
      document.querySelector("#cityErrorMsg").textContent =
        "Le nom de la ville ne doit pas contenir de caractères spéciaux";
    } else {
      document.querySelector("#cityErrorMsg").textContent = "";
      console.log(value);
    }
  };

  const emailChecker = (value) => {
    if (!value.match(emailCheck) && value.length > 0) {
      document.querySelector("#emailErrorMsg").textContent =
        "L'email ne doit pas contenir de caractères spéciaux";
    } else {
      document.querySelector("#emailErrorMsg").textContent = "";
    }
    console.log(value);
  };

  inputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      switch (e.target.id) {
        case "firstName":
          firstNameChecker(e.target.value);
          break;
        case "lastName":
          lastNameChecker(e.target.value);
          break;
        case "address":
          addressChecker(e.target.value);
          break;
        case "city":
          cityChecker(e.target.value);
          break;
        case "email":
          emailChecker(e.target.value);
          break;
        default:
          null;
      }
    });
  });
};

inputChecker();

// Fonction qui va effectuer une requête POST à l'API fetch
// lorsque l'utilisateur va cliquer sur le bouton "Commander"
const cartForm = () => {
  const submitForm = document.getElementById("order");
  submitForm.addEventListener("click", (e) => {
    e.preventDefault();

    const products = [];
    for (let i = 0; i < parseCart.length; i++) {
      products.push(parseCart[i].productid);
    }
    console.log(products);

    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const address = document.querySelector("#address").value;
    const city = document.querySelector("#city").value;
    const email = document.querySelector("#email").value;
    console.log(firstName);
    console.log(lastName);
    console.log(address);
    console.log(city);
    console.log(email);

    // Création d'un objet avec une clé contact contenant le résultat du formulaire
    // et une clé products qui est un tableau de productid
    const user = {
      contact: {
        firstName,
        lastName,
        address,
        city,
        email,
      },
      products,
    };

    console.log(user);

    // Requête POST à l'API fetch on envoie l'objet user
    fetch("https://kanap-oc.herokuapp.com/api/products/order", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    })
      .then((response) => response.json())
      // On récupère orderId qui correspond au numéro de commande
      .then((data) => {
        console.log(data);
        console.log(data.orderId);
        // window.location.href = `confirmation.html?id=${data.orderId}`;
      })
      .catch((error) => alert("Il y a un problème: ", error.message));
  });
};

cartForm();
