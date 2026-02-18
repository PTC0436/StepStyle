function setUpBackButton() {
  document.addEventListener("click", (e) => {
    const backBtn = e.target.closest(".btn-back");
    if (!backBtn) return;
    window.history.back();
  });
}

export default setUpBackButton;
