const getId = document.querySelector("#orderId");
const getOrderId = JSON.parse(localStorage.getItem("orderId"));
console.log(getOrderId);
getId.innerHTML = getOrderId;
