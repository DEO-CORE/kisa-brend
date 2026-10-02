import { Link, generatePath } from 'react-router-dom';
import { Minus, Plus, X } from 'lucide-react';
import { findProduct, formatPrice, products } from '@/entities/product/products';
import { paths } from '@/shared/constants/consts';
import { Modal } from '@/shared/ui/Modal';
import { useCart } from './cartContext';
import './cart.scss';
import { ProductCard } from '@/widgets/productCard/ProductCard';
import { Footer } from '@/widgets/footer/Footer';

export const CartDrawer = () => {
    const { items, isOpen, closeCart, changeQuantity } = useCart();
    const entries = items.flatMap((item) => {
        const product = findProduct(item.productId);
        return product ? [{ ...item, product }] : [];
    });
    const total = entries.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const phone = (import.meta.env.VITE_WHATSAPP_NUMBER ?? '').replace(/\D/g, '');
    const message = ['Здравствуйте! Хочу заказать:', ...entries.map(({ product, size, quantity }) =>
        `${product.name}, ${product.color}, ${size}, ${quantity} шт. — ${formatPrice(product.price * quantity)}`),
    `Итого: ${formatPrice(total)}`].join('\n');

    return (
        <Modal open={isOpen} onClose={closeCart} title="Ваш заказ" className="cart">
            <h2 className="cart__title">Ваш заказ:</h2>
            {entries.length ? (
                <>
                    <ul className="cart__items">
                        {entries.map(({ product, size, quantity }) => (
                            <li className="cart__item" key={`${product.id}-${size}`}>
                                <Link className="cart__image-link" to={generatePath(paths.catalogDetail, { id: product.id })} onClick={closeCart}>
                                    <img className="cart__image" src={product.image} alt={product.name} />
                                </Link>
                                <div className="cart__info">
                                    <Link className="cart__name" to={generatePath(paths.catalogDetail, { id: product.id })} onClick={closeCart}>{product.name}</Link>
                                    <p className="cart__option">Размер: {size}</p>
                                    <p className="cart__option">Цвет: {product.color}</p>
                                    <p className="cart__sku">{product.sku}</p>
                                </div>
                                <div className="cart__quantity" aria-label={`Количество: ${product.name}, ${size}`}>
                                    <button className="cart__step" type="button" aria-label="Уменьшить количество" onClick={() => changeQuantity(product.id, size, quantity - 1)}><Minus className="cart__step-icon" size={12} /></button>
                                    <span className="cart__quantity-value">{quantity}</span>
                                    <button className="cart__step" type="button" aria-label="Увеличить количество" disabled={quantity >= product.stock[size]} onClick={() => changeQuantity(product.id, size, quantity + 1)}><Plus className="cart__step-icon" size={12} /></button>
                                </div>
                                <p className="cart__price">{formatPrice(product.price * quantity)}</p>
                                <button className="cart__remove" type="button" aria-label={`Удалить ${product.name}, ${size}`} onClick={() => changeQuantity(product.id, size, 0)}><X className="cart__remove-icon" size={14} /></button>
                            </li>
                        ))}
                    </ul>
                    <div className="cart__total" aria-live="polite"><span className="cart__total-label">Сумма</span><span className="cart__total-value">{formatPrice(total)}</span></div>
                    {phone ? (
                        <a className="cart__checkout" href={`https://wa.me/${phone}?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer">Уточнить в WhatsApp</a>
                    ) : (
                        <>
                            <button className="cart__checkout" type="button" disabled>Уточнить в WhatsApp</button>
                            <p className="cart__notice">Онлайн-заказ пока недоступен.</p>
                        </>
                    )}
                    <p className="cart__delivery-note">Доставка рассчитывается после подтверждения заказа.<br />Безопасная оплата · Возврат в течение 14 дней</p>
                </>
            ) : (
                <div className="cart__empty">
                    <p className="cart__empty-title">Ваша корзина пока пуста</p>
                    <Link className="cart__checkout" to={paths.catalog} onClick={closeCart}>Перейти в каталог</Link>
                </div>
            )}
            <div className="cart__mobile-after">
                <section className="cart__recommendations" aria-labelledby="cart-recommendations-title">
                    <div className="cart__recommendations-heading"><h2 id="cart-recommendations-title">ВАМ МОЖЕТ ПОНРАВИТЬСЯ</h2><span>06</span></div>
                    <div className="cart__recommendations-grid">{[products[0], products[1], products[2], products[3], products[4], products[0]].map((product, index) => <ProductCard key={`${product.id}-${index}`} product={product} />)}</div>
                </section>
                <Footer shop />
            </div>
        </Modal>
    );
};
