export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: 'hats' | 'jackets' | 'shoes';
    stockQuantity: number;
}

export interface User {
    id: string;
    email: string;
    password: string;
}

export interface CartItem {
    productId: string;
    quantity: number;
    product: Product;
}

export interface Order {
    id: string;
    userId: string;
    items: CartItem[];
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered';
    shippingAddress: string;
    createdAt: string;
}