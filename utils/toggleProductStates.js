import { wishlistProductsVar, cartProductsVar } from '../apollo/client/cache';

export function toggleWishlist(id,product) {
  if (wishlistProductsVar().includes(product)) {
    const newWishlist = wishlistProductsVar().filter((item) => item.id != id);
    wishlistProductsVar(newWishlist);
  } else wishlistProductsVar([...wishlistProductsVar(), product]);
}

export function toggleCart(id,product) {
  if (cartProductsVar().includes(product)) {
    const newCartList = cartProductsVar().filter((item) => item.id != id);
    cartProductsVar(newCartList);
  } else cartProductsVar([...cartProductsVar(), product]);
}
