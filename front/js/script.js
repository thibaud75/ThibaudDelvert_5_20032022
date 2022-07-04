const createCanap = (canap) => {
  let canapLink = document.createElement("a");
  canapLink.href = `product.html?productid=${canap._id}`;
  document.querySelector(".items").appendChild(canapLink);
  let canapArticle = document.createElement("article");
  canapLink.appendChild(canapArticle);
  let canapImg = document.createElement("img");
  canapImg.src = canap.imageUrl;
  canapImg.alt = canap.altTxt;
  canapArticle.appendChild(canapImg);
  let canapTitle = document.createElement("h3");
  canapTitle.innerHTML = canap.name;
  canapArticle.appendChild(canapTitle);
  let canapDesc = document.createElement("p");
  canapDesc.innerHTML = canap.description;
  canapArticle.appendChild(canapDesc);
  let canapPrice = document.createElement("p");
  canapPrice.innerHTML = canap.price + " €";
  canapArticle.appendChild(canapPrice);
};

const createCanaps = (canaps) => {
  for (const canap of canaps) {
    createCanap(canap);
  }
};

const createHomepage = () => {
  fetch("https://kanap-oc.herokuapp.com/api/products").then(function (
    response
  ) {
    var contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      return response.json().then(function (json) {
        console.log(json);
        createCanaps(json);
        // traitement du JSON
      });
    } else {
      console.log("Oops, nous n'avons pas du JSON!");
    }
  });
};

createHomepage();
