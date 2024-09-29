import fs from 'fs/promises'
import path from 'path'
import bcrypt from 'bcrypt'
import { Product, User, Order } from '@/types';

const usersFilePath = path.join(process.cwd(), 'public', 'data', 'users.json')

export async function getProducts(): Promise<Product[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    const res = await fetch(`${process.env.NEXT_DEV_PUBLIC_BASE_URL}/data/products.json`);
    return res.json();
}

export async function getUsers(): Promise<User[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const res = await fetch(`${process.env.NEXT_DEV_PUBLIC_BASE_URL}/data/users.json`);
    return res.json();
}

export async function createUser(email: string, password: string): Promise<User> {
    const users = await getUsers()

    if (users.some(user => user.email === email)) {
        throw new Error('User already exists')
    }

    const saltRounds = 10; // Adjust the salt rounds for security vs performance
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // TODO: generate uuid for new user id
    const newUser: User = { id: String(Date.now()), email, password: hashedPassword }
    users.push(newUser)
    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2))

    return newUser
}

export async function signInUser(email: string, password: string): Promise<User> {
    const users = await getUsers()
    const user = users.find(u => u.email === email)

    let doesPasswordMatch = false;
    if (user && user?.password) {
        doesPasswordMatch = await bcrypt.compare(password, user.password);
        if (doesPasswordMatch) {
            return user;
        }
    }

    throw new Error('Invalid credentials')
}
