import { useEffect, useState, type ReactNode } from 'react';
import { findProduct, type Product, type Size } from '@/entities/product/products';
import { CartContext, type CartItem } from './cartContext';

const storageKey = 'kisa-cart-v1';

const readCart = (): CartItem[] => {
    try {
        const saved: unknown = JSON.parse(localStorage.getItem(storageKey) ?? '[]');
        if (!Array.isArray(saved)) return [];
        return saved.flatMap((item) => {
            if (!item || typeof item.productId !== 'string' || typeof item.size !== 'string') return [];
            const product = findProduct(item.productId);
            const stock = product?.stock[item.size as Size];
            if (!stock || !Number.isInteger(item.quantity) || item.quantity < 1) return [];
            return [{ productId: item.productId, size: item.size as Size, quantity: Math.min(item.quantity, stock) }];
        });
    } catch {
        return [];
    }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>(readCart);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        try { localStorage.setItem(storageKey, JSON.stringify(items)); } catch { /* Cart still works without storage. */ }
    }, [items]);

    const addItem = (product: Product, size: Size) => {
        if (!product.stock[size]) return;
        setItems((current) => {
            const existing = current.find((item) => item.productId === product.id && item.size === size);
            return existing
                ? current.map((item) => item === existing ? { ...item, quantity: Math.min(item.quantity + 1, product.stock[size]) } : item)
                : [...current, { productId: product.id, size, quantity: 1 }];
        });
        setIsOpen(true);
    };

    const changeQuantity = (productId: string, size: Size, quantity: number) => {
        const stock = findProduct(productId)?.stock[size] ?? 0;
        setItems((current) => current
            .map((item) => item.productId === productId && item.size === size ? { ...item, quantity: Math.min(quantity, stock) } : item)
            .filter((item) => item.quantity > 0));
    };

    return (
        <CartContext.Provider value={{ items, isOpen, openCart: () => setIsOpen(true), closeCart: () => setIsOpen(false), addItem, changeQuantity }}>
            {children}
        </CartContext.Provider>
    );
};
