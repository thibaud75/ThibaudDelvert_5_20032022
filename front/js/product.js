// Récupération de l'id du canapé grâce à l'URL
const url = new URL(window.location.href);
const productid = url.searchParams.get("productid");

// Requête GET avec l'API fetch pour récupérer les informations du canapé de la page Produit
const productPage = (productid) => {
  fetch(`https://kanap-oc.herokuapp.com/api/products/${productid}`)
    .then((response) => response.json())
    .then((json) => {
      // On récupère l'ensemble des informations du canapé et on les passe à une fonction en format JSON pour la création du DOM
      createProduct(json);
    })
    .catch((error) => alert("Il y a un problème: ", error.message));
};

// On éxécute la fonction avec en paramètre productid qui a récupéré l'id du canapé grâce à l'URL
productPage(productid);

// Création du DOM du canapé
const createProduct = (canap) => {
  // Création de l'image
  let productImg = document.createElement("img");
  productImg.src = canap.imageUrl;
  productImg.alt = canap.altTxt;
  document.querySelector(".item__img").appendChild(productImg);

  // Récupération du titre affichant le nom du canapé
  let productName = document.getElementById("title");
  productName.innerHTML = canap.name;

  // Récupération du prix du canapé
  let productPrice = document.getElementById("price");
  productPrice.innerHTML = canap.price;

  // Récupération de la description du canapé
  let productDesc = document.getElementById("description");
  productDesc.innerHTML = canap.description;

  // appel de la fonction qui va nous permettre de choisir la couleur du canapé qu'on veut acheter
  createColorsSelectOptions(canap.colors);
};

//Création de la fonction qui va permettre à l'utilisateur de choisir la couleur du canapé qu'il veut
const createColorsSelectOptions = (colors) => {
  colors.forEach((item) => {
    let productColors = document.createElement("option");
    document.querySelector("#colors").appendChild(productColors);
    productColors.innerHTML = item;
  });
};

// Fonction qui initialise le panier dans le localstorage
const initCart = () => {
  const localStorageCart = JSON.parse(localStorage.getItem("cart"));
  // Si le panier est vide alors on l'initialise
  if (!localStorageCart) {
    const arrayCart = [];
    const cart = JSON.stringify(arrayCart);
    localStorage.setItem("cart", cart);
  }
};

initCart();

// Création de la fonction qui va permettre à l'utilisateur de passer les caractéristiques du canapé ,
// la quantité choisit ainsi que la couleur au panier
const addToCart = document
  // On cible le bouton "Ajouter au panier"
  .querySelector("#addToCart")
  //On ajouter l'event click au bouton
  .addEventListener("click", () => {
    // On récupère les valeur de la couleur et de la quantité ainsi que le reste des informations sur le canapé
    const color = document.querySelector("#colors").value;
    const quantity = parseInt(document.querySelector("#quantity").value);
    const desc = document.querySelector("#description").textContent;
    // const price = parseInt(document.querySelector("#price").textContent);
    const name = document.querySelector("#title").textContent;
    const imageUrl = document.querySelector(".item__img img").src;
    const altTxt = document.querySelector(".item__img img").alt;
    // Création d'un objet "item" qui contient toutes les caractéristiques du canapé
    const item = {
      color,
      productid,
      quantity,
      desc,
      // price,
      name,
      imageUrl,
      altTxt,
    };

    // On passe en paramètre l'objet "item" à la fonction addToCart contenu dans la classe cart de la page Panier
    // Ainsi au clique de l'utilisateur, la fonction est executée avec l'objet "item" en paremètre = toutes les caractéristiques du canapé choisit
    addToLocalStorage(item);
  });

// Fonction qui récupère un ojet "item" de product.js
// Si le produit n'existe pas il est ajouté au localstorage
// Si il existe déjà il n'est pas rajouté inutilement mais la quantité
// est incrementé au produit correspondant dans le localstorage
const addToLocalStorage = (item) => {
  const cart = JSON.parse(localStorage.cart);

  // Création d'une variable foundProduct à laquelle on passe la methode find au tableau cart
  let foundProduct = cart.find(
    (p) => p.color === item.color && p.productid === item.productid
  );
  if (item.color === "") {
    alert("Veuillez choisir une couleur !");
  } else if (item.quantity < 1 || item.quantity > 100) {
    alert("Veuillez choisir un nombre de canapé entre 1 et 100!");
  }
  // Foundproduct renvoie undefined si la combinaison de item.color et item.productid
  // ne sont pas présent dans cart, sinon un objet avec la combinaison de item.color et item.productid
  // Si foundProduct est undefined ça veut dire que la combinaison de item.color et item.productid
  // n'existe pas dans cart donc on va push l'item dans cart
  else if (!foundProduct) {
    cart.push(item);
  } else if (foundProduct.quantity > 99) {
    alert("Vous ne pouvez pas ajouter plus de 100 canapés au panier!");
  } else {
    // Si foundProduct ne renvoie pas undefined ça veut dire que la combinaison de item.color
    // et de item.productid est déjà présent donc on va l'incrémenter grâce à foundProduct qui
    // va nous renvoyer un objet avec la combinaison des deux éléments à laqulle on va ajouter
    // la quantité qu'on souhaite en lui passant item.quantity
    foundProduct.quantity = foundProduct.quantity + item.quantity;
  }

  localStorage.cart = JSON.stringify(cart);
};
