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

const modifyProduct = () => {
  let input = document.querySelectorAll(".itemQuantity");
  console.log(typeof input);
  console.log(input);

  for (let i = 0; i < input.length; i++) {
    input[i].addEventListener("change", function () {
      parseCart[i].quantity = input[i].value;
      localStorage.setItem("cart", JSON.stringify(parseCart));
      console.log(parseCart);
      console.log("yo");

      location.reload();
    });
  }
};

modifyProduct();

const deleteProduct = () => {
  let selectDelete = document.querySelectorAll(".deleteItem");
  console.log(typeof selectDelete);
  console.log(selectDelete);

  for (let i = 0; i < selectDelete.length; i++) {
    selectDelete[i].addEventListener("click", (e) => {
      e.preventDefault();
      const el = selectDelete[i].closest(".cart__item");
      const removeEl = el.remove();

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

const cartOrder = () => {
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
  const url = new URL(window.location.href);

  const firstName = url.searchParams.get("firstName");
  const lastName = url.searchParams.get("lastName");
  const address = url.searchParams.get("address");
  const city = url.searchParams.get("city");
  const email = url.searchParams.get("email");

  const product = [];
  for (let i = 0; i < parseCart.length; i++) {
    product.push(parseCart[i].productid);
  }
  console.log(product);

  const user = {
    firstName,
    lastName,
    address,
    city,
    email,
    product,
  };

  console.log(user);

  const submitForm = document.getElementById("order");
  document.body.addEventListener("click", (e) => {
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    })
      .then((response) => response.json())
      .then((order) => {
        console.log(order);
        localStorage.setItem("orderId", order.orderId);
        // localStorage.clear();
        window.location.href = "confirmation.html";
      })
      .catch((err) => alert("Il y a un problème: ", err.message));
  });
};

cartOrder();
