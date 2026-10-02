import { EditorialImage } from '@/shared/ui/EditorialImage';
import { useState } from 'react';
import { Modal } from '@/shared/ui/Modal';
import './news.scss';

const featured = {
    id: 'collection', category: 'КОЛЛЕКЦИИ', label: 'КОЛЛЕКЦИЯ', date: '18.09.2026',
    title: 'SS’26 PART 1: свет, объём и новая женская линия',
    description: 'Первая глава сезона построена на контрасте мягкой фактуры и точной формы. В новой съёмке мы исследуем, как одежда меняется вместе со светом и движением тела.',
};
const articles = [
    { id: 'hoodie', category: 'КОЛЛЕКЦИИ', label: 'ВЕЩЬ', date: '04.09.2026', title: 'Как устроено наше зип-худи', description: 'Конструктор KISA рассказывает о балансе длины, объёма и плотности.' },
    { id: 'city', category: 'ЛЮДИ', label: 'ЛЮДИ', date: '22.08.2026', title: 'Один день в городе: Лера', description: 'Фотограф Лера Соколова о личной форме, работе и любимых маршрутах.' },
    { id: 'care', category: 'ГИДЫ', label: 'ГИД', date: '10.08.2026', title: 'Уход за плотным хлопком', description: 'Простой способ сохранить цвет, форму и тактильность любимой вещи.' },
    { id: 'studio', category: 'ДНЕВНИК', label: 'ДНЕВНИК', date: '29.07.2026', title: 'Внутри студии: примерка нового силуэта', description: 'Рабочие кадры и заметки с финальной примерки капсулы.' },
    { id: 'music', category: 'ДНЕВНИК', label: 'KISA SELECTS', date: '12.07.2026', title: 'Музыка для длинного летнего вечера', description: 'Двенадцать треков, которые звучали в студии во время работы над SS’26.' },
    { id: 'event', category: 'ДНЕВНИК', label: 'СОБЫТИЕ', date: '26.06.2026', title: 'KISA POP-UP: три дня на Хлебозаводе', description: 'Примерки, музыка и архивные вещи — короткий отчёт о нашей встрече.' },
];
const categories = ['ВСЕ', 'КОЛЛЕКЦИИ', 'ЛЮДИ', 'ДНЕВНИК', 'ГИДЫ'];

export const NewsPage = () => {
    const [category, setCategory] = useState('ВСЕ');
    const [expanded, setExpanded] = useState(false);
    const [opened, setOpened] = useState<typeof featured | null>(null);
    const [subscriptionMessage, setSubscriptionMessage] = useState('');
    const visible = (category === 'ВСЕ' ? [...articles, ...(expanded ? [featured] : [])] : [featured, ...articles].filter((article) => article.category === category));

    return (
        <div className="news editorial">
            <header className="news__intro editorial__container">
                <p className="editorial__eyebrow">KISA JOURNAL / 2026</p>
                <h1>НОВОСТИ</h1>
                <p>Коллекции, люди, процессы и всё, что формирует мир KISA.</p>
            </header>
            <nav className="news__navigation" aria-label="Категории новостей"><div className="editorial__container">{categories.map((value) => <button type="button" key={value} aria-pressed={category === value} onClick={() => { setCategory(value); setExpanded(false); }}>{value}</button>)}</div></nav>
            <div className="editorial__container news__content">
                {category === 'ВСЕ' && <section className="news__featured" aria-labelledby="featured-title">
                    <button className="news__image-button" type="button" onClick={() => setOpened(featured)} aria-label={featured.title}><EditorialImage name="collection" alt="Модель в объёмном светлом платье на фоне охристой стены" width={820} height={620} /></button>
                    <div><span className="news__badge">ГЛАВНОЕ</span><p className="news__featured-meta editorial__eyebrow">КОЛЛЕКЦИЯ · {featured.date}</p><h2 id="featured-title"><button type="button" onClick={() => setOpened(featured)}>{featured.title}</button></h2><p className="news__featured-description">{featured.description}</p></div>
                </section>}
                <section className="news__latest" aria-labelledby="latest-title">
                    <div className="editorial__section-heading"><h2 id="latest-title">{category === 'ВСЕ' ? 'ПОСЛЕДНИЕ ПУБЛИКАЦИИ' : category}</h2><span aria-live="polite">{String(category === 'ВСЕ' ? 7 : visible.length).padStart(2, '0')} МАТЕРИАЛОВ</span></div>
                    <div className="news__grid">{visible.map((article) => <article className="news__card" key={article.id}>
                        <button className="news__image-button" type="button" aria-label={article.title} onClick={() => setOpened(article)}><EditorialImage name={article.id} alt={article.title} width={410} height={450} loading="lazy" /></button>
                        <div className="news__meta editorial__eyebrow"><span>{article.label}</span><time dateTime={article.date.split('.').reverse().join('-')}>{article.date}</time></div>
                        <h3><button type="button" onClick={() => setOpened(article)}>{article.title}</button></h3><p>{article.description}</p>
                    </article>)}</div>
                    {category === 'ВСЕ' && !expanded && <button className="news__more" type="button" onClick={() => setExpanded(true)}>ЗАГРУЗИТЬ ЕЩЁ</button>}
                </section>
            </div>
            <section className="news__subscribe" aria-labelledby="subscribe-title"><div className="editorial__container news__subscribe-inner">
                <div><h2 id="subscribe-title">Новости дропов — без<br />лишнего.</h2><p>Редкие письма о новых вещах, событиях и материалах журнала.</p></div>
                <form onSubmit={(event) => { event.preventDefault(); setSubscriptionMessage('Подписка пока не подключена. Напишите нам: support@kisa.'); }}>
                    <div className="news__email"><input type="email" name="email" placeholder="ВАШ EMAIL" aria-label="Ваш email" autoComplete="email" required /><button type="submit" aria-label="Подписаться">→</button></div>
                    <p className="news__subscription-status" role="status">{subscriptionMessage}</p>
                </form>
            </div></section>
            <Modal open={opened !== null} onClose={() => setOpened(null)} title={opened?.title ?? 'Публикация'} className="news__preview">
                {opened && <><img src={`/images/editorial/${opened.id}.png`} alt={opened.title} /><p className="editorial__eyebrow">{opened.label} · {opened.date}</p><h2>{opened.title}</h2><p>{opened.description}</p></>}
            </Modal>
        </div>
    );
};
