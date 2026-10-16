export function checkoutTotal(subtotal, fee, discountPercent) {
  return (subtotal + fee) * (1 - discountPercent / 100);
}
