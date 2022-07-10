// Requete GET grâce à l'API fetch afin de récupérer les produits
const getProducts = () => {
  fetch("https://kanap-oc.herokuapp.com/api/products")
    .then((response) => response.json())
    .then((json) => {
      // On récupère l'ensemble des produits retournés par l'API et on les passe en paramètre à la fonction createCanaps
      createCanaps(json);
    })
    .catch((error) => alert("Il y a un problème: ", error.message));
};

// Boucle for afin de dissocier chaque objet JSON puis on les passe à la fonction createCanap pour la création du DOM
const createCanaps = (canaps) => {
  for (const canap of canaps) {
    createCanap(canap);
  }
};

// Fonction createCanap qui va créer le DOM et afficher les produits et leurs caractéristiques sur la page d'accueil
const createCanap = (canap) => {
  // Création du lien qui va diriger sur le canapé choisit
  let canapLink = document.createElement("a");
  canapLink.href = `product.html?productid=${canap._id}`;
  document.querySelector(".items").appendChild(canapLink);

  //Création de l'article
  let canapArticle = document.createElement("article");
  canapLink.appendChild(canapArticle);

  // Création de l'image
  let canapImg = document.createElement("img");
  canapImg.src = canap.imageUrl;
  canapImg.alt = canap.altTxt;
  canapArticle.appendChild(canapImg);

  // Création du titre affichant le nom du canapé
  let canapTitle = document.createElement("h3");
  canapTitle.innerHTML = canap.name;
  canapArticle.appendChild(canapTitle);

  // Création du paragraphe affichant la description du canapé
  let canapDesc = document.createElement("p");
  canapDesc.innerHTML = canap.description;
  canapArticle.appendChild(canapDesc);

  // Création du prix du canapé
  let canapPrice = document.createElement("p");
  canapPrice.innerHTML = canap.price + " €";
  canapArticle.appendChild(canapPrice);
};

getProducts();
