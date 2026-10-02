import { EditorialImage } from '@/shared/ui/EditorialImage';
import './about.scss';

const principles = [
    ['Форма', 'Объём и посадка важнее декора. Силуэт должен работать в движении.'],
    ['Материал', 'Плотный хлопок, выразительная фактура и долговечная фурнитура.'],
    ['Тираж', 'Небольшие дропы позволяют бережнее относиться к производству.'],
];
const history = [
    ['2022', 'Первый дроп из трёх вещей и съёмка, сделанная командой друзей.'],
    ['2023', 'Собственное лекало объёмного худи и первые офлайн-поп-апы.'],
    ['2024', 'Капсула Smile и запуск доставки по всей России.'],
    ['2026', 'SS’26 — развитие женской линии и работа с новой пластикой ткани.'],
];

export const AboutPage = () => (
    <article className="aboutPage editorial">
        <header className="aboutPage__intro editorial__container">
            <p className="editorial__eyebrow">KISA / ИЗ МОСКВЫ С 2022</p>
            <h1>ОДЕЖДА КАК ЛИЧНОЕ<br />ПРОСТРАНС<br className="aboutPage__mobile-break" />ТВО</h1>
            <p className="aboutPage__lead">KISA создаёт вещи для повседневной жизни —<br className="editorial__desktop-break" /> выразительные в пропорциях, спокойные в деталях и<br className="editorial__desktop-break" /> честные в материале.</p>
        </header>
        <EditorialImage className="aboutPage__hero" name="about-hero" alt="Модель в тёмном худи и свободных брюках KISA" width={1440} height={780} />
        <div className="editorial__container">
            <section className="aboutPage__manifesto" aria-labelledby="manifesto-title">
                <div className="editorial__eyebrow"><h2 id="manifesto-title">МАНИФЕСТ</h2><span>01–04</span></div>
                <p>Мы не следуем сезону буквально.<br className="editorial__desktop-break" /> Мы наблюдаем за тем, как люди двигаются, встречаются, работают и остаются наедине с собой — и строим вокруг этого гардероб.</p>
            </section>
            <div className="aboutPage__photos">
                <EditorialImage name="fabric" alt="Крупный план фактуры плотного хлопка" width={632} height={680} loading="lazy" />
                <EditorialImage name="fitting" alt="Работа над посадкой худи в ателье" width={632} height={680} loading="lazy" />
            </div>
            <section className="aboutPage__principles" aria-labelledby="principles-title">
                <div className="editorial__section-heading"><h2 id="principles-title">НАШИ ПРИНЦИПЫ</h2><span>МЕНЬШЕ, НО ТОЧНЕЕ</span></div>
                <div className="aboutPage__principle-grid">{principles.map(([title, text], index) => (
                    <div className="aboutPage__principle" key={title}><span className="editorial__eyebrow">0{index + 1}</span><h3>{title}</h3><p>{text}</p></div>
                ))}</div>
            </section>
        </div>
        <section className="aboutPage__history" aria-labelledby="history-title">
            <div className="editorial__container aboutPage__history-grid">
                <div><p className="editorial__eyebrow">КАК МЫ РОСЛИ</p><h2 id="history-title">Три года, один<br />ясный язык.</h2></div>
                <dl>{history.map(([year, text]) => <div key={year}><dt>{year}</dt><dd>{text}</dd></div>)}</dl>
            </div>
        </section>
        <section className="aboutPage__team editorial__container" aria-labelledby="team-title">
            <EditorialImage name="team" alt="Команда KISA в московском ателье" width={612} height={620} loading="lazy" />
            <div><p className="editorial__eyebrow">КОМАНДА</p><h2 id="team-title">KISA — маленькая команда с полным вниманием к каждой вещи.</h2><p className="aboutPage__team-description">Мы проектируем коллекции в Москве, работаем с локальными конструкторами и производствами, лично проверяем посадку и качество каждого тиража.</p><a className="aboutPage__contact" href="mailto:work@kisa">НАПИСАТЬ НАМ ↗</a></div>
        </section>
    </article>
);
