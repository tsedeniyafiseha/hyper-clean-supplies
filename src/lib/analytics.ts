export type GAProduct = {
  item_id: string | number;
  item_name: string;
  price: number;
  quantity?: number;
};

export function trackViewItem(product: GAProduct) {
  if (typeof window === "undefined" || !(window as any).gtag) return;
  (window as any).gtag("event", "view_item", {
    items: [product],
  });
}

export function trackAddToCart(product: GAProduct & { quantity: number }) {
  if (typeof window === "undefined" || !(window as any).gtag) return;
  (window as any).gtag("event", "add_to_cart", {
    items: [product],
    value: product.price * product.quantity,
    currency: "USD",
  });
}

export function trackBeginCheckout(items: GAProduct[], value: number) {
  if (typeof window === "undefined" || !(window as any).gtag) return;
  (window as any).gtag("event", "begin_checkout", {
    items,
    value,
    currency: "USD",
  });
}


