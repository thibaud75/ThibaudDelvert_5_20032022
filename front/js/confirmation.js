// Fonction qui récupère l'orderId dans l'URL puis qui l'affiche sur la page confirmation
const displayOrderId = () => {
  const url = new URL(window.location.href);

  const getId = document.querySelector("#orderId");
  const urlId = url.searchParams.get("id");

  console.log(urlId);
  getId.innerHTML = urlId;
};

displayOrderId();
