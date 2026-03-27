const setUpNavCartNotification = () => {
  const notification = document.querySelector(".nav__cart-notification");
  if (!notification) return;
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (!cart || cart == []) {
    notification.innerHTML = 0;
    return;
  } else {
    notification.innerHTML = cart.reduce(
      (total, { quantity }) => (total += quantity),
      0,
    );
  }
};
export default setUpNavCartNotification;
