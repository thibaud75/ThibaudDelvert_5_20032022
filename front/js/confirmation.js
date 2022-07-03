const url = new URL(window.location.href);

const getId = document.querySelector("#orderId");
const urlId = url.searchParams.get("id");

console.log(urlId);
getId.innerHTML = urlId;
