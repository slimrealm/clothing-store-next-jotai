import { atom } from 'jotai';
import { User, CartItem, Product } from '../types';

export const currentUserAtom = atom<User | null>(null);
export const cartAtom = atom<CartItem[]>([]);
export const productsAtom = atom<Product[]>([]);