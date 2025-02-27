export const clearCardItemsFromLocalStorage = () => {
    localStorage.removeItem("frontElements");
    localStorage.removeItem("backElements");
    localStorage.removeItem("selectedVariants");
    localStorage.removeItem("backSnapshot");
    localStorage.removeItem("frontSnapshot");
    localStorage.removeItem("cardMongoId");
    localStorage.removeItem("currentCard");
    localStorage.removeItem("orderId");
    localStorage.removeItem("0");
}