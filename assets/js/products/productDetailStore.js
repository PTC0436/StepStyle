export const productDetailStore = new Map();

export function setProductDetailState(productId, partialState) {
  const prev = productDetailStore.get(productId) || {};
  productDetailStore.set(productId, {
    ...prev,
    ...partialState,
  });
}

export function getProductDetailState(productId) {
  return productDetailStore.get(productId) || {};
}
