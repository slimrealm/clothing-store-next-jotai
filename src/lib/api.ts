import { Product, User, Order } from '../types';

export async function getProducts(): Promise<Product[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    const res = await fetch('/data/products.json');
    return res.json();
}

export async function getUsers(): Promise<User[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const res = await fetch('/data/users.json');
    return res.json();
}
