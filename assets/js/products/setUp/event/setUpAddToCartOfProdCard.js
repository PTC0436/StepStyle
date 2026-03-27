import { getProductById } from "../../services/productsAPI.js";
import addToCartModalSkeleton from "../../render/addToCartModalSkeleton.js";
import addToCartModal from "../../render/addToCartModal.js";
import setUpAddToCartModal from "./setUpAddToCartModal.js";
import setUpUIAddToCartModal from "../ui/setUpUIAddToCartModal.js";

const setUpAddToCartOfProdCard = () => {
  document.addEventListener("click", async (e) => {
    const addBtn = e.target.closest(".prod__card .prod__add");
    if (!addBtn) return;
    const addModelContent = document.querySelector(
      "#addToCartModal .modal-content",
    );

    addModelContent.innerHTML = addToCartModalSkeleton();

    const shoes = await getProductById(addBtn.dataset.id);

    addModelContent.innerHTML = addToCartModal(shoes);

    setUpUIAddToCartModal();
  });

  setUpAddToCartModal();
};

export default setUpAddToCartOfProdCard;
