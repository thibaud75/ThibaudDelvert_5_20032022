// Récupération du localstorage
// puis on le parse pour pouvoir l'exploiter
const getArrayCart = localStorage.getItem("cart");
const parseCart = JSON.parse(getArrayCart);

// On vérifie si le panier est rempli ou pas, si il est vide on cache le formulaire
const emptyCart = () => {
  if (parseCart == 0 || !parseCart) {
    const selectCart = document.querySelector(".cart");
    selectCart.remove();
    const selectTitle = document.querySelector("#cartAndFormContainer h1");
    selectTitle.remove();
    const createTitle = document.createElement("H1");
    document.querySelector("#cartAndFormContainer").appendChild(createTitle);
    createTitle.innerHTML = "Votre panier est vide !";
  }
};

emptyCart();

const modifyProduct = () => {
  let inputQuantity = document.querySelectorAll(".itemQuantity");

  // La méthode QuerySelectorAll retourne des objets NodeList
  // sur lesquels on peut itérer
  for (let i = 0; i < inputQuantity.length; i++) {
    // Lorsque le nombre de l'input choisit change
    // On attribue à la quantité de l'objet JSON parseCart
    // une nouvelle valeur égale à celle changée
    inputQuantity[i].addEventListener("change", function () {
      if (inputQuantity[i].value > 0 && inputQuantity[i].value < 101) {
        parseCart[i].quantity = inputQuantity[i].value;
        localStorage.setItem("cart", JSON.stringify(parseCart));
        console.log(inputQuantity[i].value);

        location.reload();
      } else {
        alert("Veuillez choisir entre 1 et 100 canapé!");
      }
    });
  }
};

// Fonction qui va supprimer un produit du DOM et du localstorage
const deleteProduct = () => {
  let selectDelete = document.querySelectorAll(".deleteItem");

  // Comme la fonction modifier, la méthode querySelectorALl
  // retourne un objet Nodelist qu'on va itérer
  for (let i = 0; i < selectDelete.length; i++) {
    // On ajoute un event click sur les balises "supprimer"
    selectDelete[i].addEventListener("click", (e) => {
      e.preventDefault();

      // On va supprimer du DOM avec remove l'article ".cart__item"
      // parent le plus proche (en remontant) du paragraphe grâce à closest
      selectDelete[i].closest(".cart__item").remove;

      let productidDelete = parseCart[i].productid;
      let colorDelete = parseCart[i].color;

      // deleteCart renvoie parseCart avec les éléments qui ont passé le test
      // donc il va renvoyer un tableau avec tous les éléments SAUF celui qu'on a cliqué
      const deleteCart = parseCart.filter(
        (el) => el.productid !== productidDelete || el.color !== colorDelete
      );

      const strCart = JSON.stringify(deleteCart);
      localStorage.setItem("cart", strCart);

      location.reload();
    });
  }
};

const getPrice = async () => {
  let totalQuantity = 0;
  let totalPrice = 0;
  for (let i = 0; i < parseCart.length; i++) {
    const parseCartId = parseCart[i].productid;
    await fetch(`https://kanap-oc.herokuapp.com/api/products/${parseCartId}`)
      .then((response) => response.json())
      .then((data) => {
        parseCart[i].price = data.price;
        let cartArticle = document.createElement("article");
        document.querySelector("#cart__items").appendChild(cartArticle);
        cartArticle.className = "cart__item";
        cartArticle.setAttribute("data-id", parseCart[i].productid);
        cartArticle.setAttribute("data-color", parseCart[i].color);

        let cartDivImg = document.createElement("div");
        cartDivImg.className = "cart__item__img";
        cartArticle.appendChild(cartDivImg);

        let cartImg = document.createElement("img");
        cartImg.src = parseCart[i].imageUrl;
        cartImg.alt = parseCart[i].altTxt;
        cartDivImg.appendChild(cartImg);

        let cartDivMain = document.createElement("div");
        cartDivMain.className = "cart__item__content";
        cartArticle.appendChild(cartDivMain);

        let cartDivMainDesc = document.createElement("div");
        cartDivMainDesc.className = "cart__item__content__description";
        cartDivMain.appendChild(cartDivMainDesc);

        let cartDivMainDescTitle = document.createElement("h2");
        cartDivMainDesc.appendChild(cartDivMainDescTitle);
        cartDivMainDescTitle.innerHTML = parseCart[i].name;

        let cartDivMainDescColor = document.createElement("p");
        cartDivMainDesc.appendChild(cartDivMainDescColor);
        cartDivMainDescColor.innerHTML = parseCart[i].color;

        let cartDivMainDescPrice = document.createElement("p");
        cartDivMainDesc.appendChild(cartDivMainDescPrice);
        cartDivMainDescPrice.innerHTML = parseCart[i].price + " €";

        let cartDivMainDesc2 = document.createElement("div");
        cartDivMainDesc2.className = "cart__item__content__settings";
        cartDivMain.appendChild(cartDivMainDesc2);

        let cartDivMainDesc2Qt = document.createElement("div");
        cartDivMainDesc2Qt.className =
          "cart__item__content__settings__quantity";
        cartDivMainDesc2.appendChild(cartDivMainDesc2Qt);

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

        let cartDivMainDeleteP = document.createElement("p");
        cartDivMainDeleteP.className = "deleteItem";
        cartDivMainDelete.appendChild(cartDivMainDeleteP);
        cartDivMainDeleteP.innerHTML = "Supprimer";

        let totalQuantityDom = document.querySelector("#totalQuantity");
        totalQuantity = +totalQuantity + +parseCart[i].quantity;
        totalQuantityDom.innerHTML = totalQuantity;

        let totalPriceDom = document.querySelector("#totalPrice");
        totalPrice = +totalPrice + +parseCart[i].price * +parseCart[i].quantity;
        totalPriceDom.innerHTML = totalPrice;
      });
  }
  modifyProduct();
  deleteProduct();
};

getPrice();

// On selectionne tous les inputs
const inputs = document.querySelectorAll("input[type=text], input[type=email]");

// Regex pour check les informations rentrées par l'utilisateur dans le formulaire
let nameCheck = new RegExp(/^[a-zéèçà]{2,50}(-|)?([a-zéèçà]{2,50})?$/gim);
let cityCheck = new RegExp(/^[a-zéèçà]{2,50}(-| )?([a-zéèçà]{2,50})?$/gim);
let addressCheck = new RegExp(/^[a-zA-Z0-9\s,.'-]{3,}$/);
let emailCheck = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

// Une fonction pour chaque input, si la saisie de l'utilisateur
// correspond à la regex, le booleon renvoie true sinon false
const firstNameChecker = (value) => {
  let valueBoolean = false;
  if (!value.match(nameCheck)) {
    valueBoolean = false;
    document.querySelector("#firstNameErrorMsg").textContent =
      "Le prénom ne doit pas contenir de caractères spéciaux";
  } else {
    valueBoolean = true;
    document.querySelector("#firstNameErrorMsg").textContent = "";
  }
  return valueBoolean;
};

const lastNameChecker = (value) => {
  let valueBoolean = false;
  if (!value.match(nameCheck)) {
    valueBoolean = false;
    document.querySelector("#lastNameErrorMsg").textContent =
      "Le nom ne doit pas contenir de caractères spéciaux";
  } else {
    valueBoolean = true;
    document.querySelector("#lastNameErrorMsg").textContent = "";
  }
  return valueBoolean;
};

const addressChecker = (value) => {
  let valueBoolean = false;
  if (!value.match(addressCheck)) {
    valueBoolean = false;
    document.querySelector("#addressErrorMsg").textContent =
      "L'adresse ne doit pas contenir de caractères spéciaux";
  } else {
    valueBoolean = true;
    document.querySelector("#addressErrorMsg").textContent = "";
  }
  return valueBoolean;
};

const cityChecker = (value) => {
  let valueBoolean = false;
  if (!value.match(cityCheck)) {
    valueBoolean = false;
    document.querySelector("#cityErrorMsg").textContent =
      "Le nom de la ville ne doit pas contenir de caractères spéciaux";
  } else {
    valueBoolean = true;
    document.querySelector("#cityErrorMsg").textContent = "";
  }
  return valueBoolean;
};

const emailChecker = (value) => {
  let valueBoolean = false;
  if (!value.match(emailCheck)) {
    valueBoolean = false;
    document.querySelector("#emailErrorMsg").textContent =
      "L'email ne doit pas contenir de caractères spéciaux";
  } else {
    valueBoolean = true;
    document.querySelector("#emailErrorMsg").textContent = "";
  }
  return valueBoolean;
};

// target.id correspond à ce que rentre l'utilisateur dans le formulaire
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

    if (parseCart.length === 0 || products.length === 0) {
      alert("Veuillez ajoutez des articles au panier");
      return 0;
    }

    for (let i = 0; i < parseCart.length; i++) {
      if (+parseCart[i].quantity < 1 || +parseCart[i].quantity > 100) {
        alert(
          "La quantité de canapé d'un même modèle doit être comprise entre 0 et 100"
        );
        return 0;
      }
    }

    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const address = document.querySelector("#address").value;
    const city = document.querySelector("#city").value;
    const email = document.querySelector("#email").value;

    // Si une fonction renvoie false on return 0 pour ne pas éxecuter le reste de la fonction (notamment le POST)
    if (
      !firstNameChecker(firstName) ||
      !lastNameChecker(lastName) ||
      !addressChecker(address) ||
      !cityChecker(city) ||
      !emailChecker(email)
    ) {
      alert("Veuillez remplir correctement le formulaire !");
      return 0;
    }

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
        window.location.href = `confirmation.html?id=${data.orderId}`;
        localStorage.clear();
      })
      .catch((error) => alert("Il y a un problème: ", error.message));
  });
};

cartForm();
