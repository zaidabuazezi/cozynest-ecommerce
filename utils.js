export function formatPrice(price) {
    return `$${Number(price).toFixed(2)}`;
}

export function capitalizeText(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}