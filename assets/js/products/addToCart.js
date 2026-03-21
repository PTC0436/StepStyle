function addToCart(newItem) {
  if (!newItem) return;

  const cart = JSON.parse(localStorage.getItem("cart")) ?? [];
  const itemIndex = cart.findIndex(
    (item) =>
      item.id == newItem.id &&
      item.colorChosen == newItem.colorChosen &&
      item.sizeChosen == newItem.sizeChosen,
  );
  if (itemIndex == -1) {
    let newCart = [...cart, newItem];
    localStorage.setItem(
      "cart",
      JSON.stringify(
        newCart.sort((a, b) => {
          const compareId = a.id.localeCompare(b.id);
          return compareId
            ? compareId
            : a.colorChosen?.localeCompare(b.colorChosen);
        }),
      ),
    );
  } else {
    cart[itemIndex].quantity += newItem.quantity;
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  console.log(JSON.parse(localStorage.getItem("cart")));
}

export default addToCart;
