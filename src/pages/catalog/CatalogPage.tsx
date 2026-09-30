import { useState } from 'react';
import { catalogProducts, products } from '@/entities/product/products';
import { ProductCard } from '@/widgets/productCard/ProductCard';
import './catalog.scss';

export const CatalogPage = () => {
    const [color, setColor] = useState('');
    const [category, setCategory] = useState('');
    const [collection, setCollection] = useState('');
    const [sort, setSort] = useState('');
    const [limit, setLimit] = useState(16);
    const filtered = catalogProducts.filter((product) =>
        (!color || product.color === color) && (!category || product.category === category) && (!collection || product.isNew));
    const sorted = [...filtered].sort((a, b) => sort === 'asc' ? a.price - b.price : sort === 'desc' ? b.price - a.price : 0);
    const visible = sorted.slice(0, limit);
    const hasFilters = !!(color || category || collection || sort);
    const reset = () => { setColor(''); setCategory(''); setCollection(''); setSort(''); setLimit(16); };

    return (
        <section className="catalog" aria-label="Каталог одежды">
            <div className="catalog__toolbar">
                <div className="catalog__filters">
                    <select className="catalog__filter" value={color} onChange={(event) => setColor(event.target.value)} aria-label="Цвет">
                        <option className="catalog__option" value="">Цвет</option>
                        {[...new Set(products.map((product) => product.color))].map((value) => <option className="catalog__option" value={value} key={value}>{value}</option>)}
                    </select>
                    <select className="catalog__filter" value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Цена">
                        <option className="catalog__option" value="">Цена</option>
                        <option className="catalog__option" value="asc">Сначала дешевле</option>
                        <option className="catalog__option" value="desc">Сначала дороже</option>
                    </select>
                    <select className="catalog__filter" value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Категории">
                        <option className="catalog__option" value="">Категории</option>
                        {['Худи', 'Брюки', 'Футболки'].map((value) => <option className="catalog__option" value={value} key={value}>{value}</option>)}
                    </select>
                    <select className="catalog__filter" value={collection} onChange={(event) => setCollection(event.target.value)} aria-label="Коллекции">
                        <option className="catalog__option" value="">Коллекции</option>
                        <option className="catalog__option" value="new">Новинки</option>
                    </select>
                    {hasFilters && <button className="catalog__reset" type="button" onClick={reset}>Сбросить ×</button>}
                </div>
                <p className="catalog__count" aria-live="polite">{visible.length} товаров</p>
            </div>
            <div className="catalog__grid">
                {visible.map((product, index) => <ProductCard key={`${product.id}-${index}`} product={product} />)}
            </div>
            {!visible.length && <div className="catalog__empty"><p className="catalog__empty-text">Товары не найдены</p><button className="catalog__reset" type="button" onClick={reset}>Сбросить фильтры</button></div>}
            {visible.length < sorted.length && <button className="catalog__more" type="button" onClick={() => setLimit((value) => value + 4)}>Загрузить ещё</button>}
        </section>
    );
};
