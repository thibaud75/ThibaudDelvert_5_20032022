// Récupération de l'id du canapé grâce à l'URL
const url = new URL(window.location.href);
const productid = url.searchParams.get("productid");

// Requête GET avec l'API fetch pour récupérer les informations du canapé de la page Produit
const productPage = (productid) => {
  fetch(`https://kanap-oc.herokuapp.com/api/products/${productid}`).then(
    function (response) {
      var contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json().then(function (json) {
          console.log(json);
          // On récupère l'ensemble des informations du canapé et on les passe à une fonction en format JSON pour la création du DOM
          createProduct(json);
          // traitement du JSON
        });
      } else {
        console.log("Oops, nous n'avons pas du JSON!");
      }
    }
  );
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
    const price = parseInt(document.querySelector("#price").textContent);
    const name = document.querySelector("#title").textContent;
    const imageUrl = document.querySelector(".item__img img").src;
    const altTxt = document.querySelector(".item__img img").alt;
    // Création d'un objet "item" qui contient toutes les caractéristiques du canapé
    const item = {
      color,
      productid,
      quantity,
      desc,
      price,
      name,
      imageUrl,
      altTxt,
    };

    // On passe en paramètre l'objet "item" à la fonction addToCart contenu dans la classe cart de la page Panier
    // Ainsi au clique de l'utilisateur, la fonction est executée avec l'objet "item" en paremètre = toutes les caractéristiques du canapé choisit
    cart.addToCart(item);
  });
