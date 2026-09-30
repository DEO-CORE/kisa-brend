import './footer.scss';

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer__container">
                <div className="footer__info">
                    <div className="footer__column">
                        <section className="footer__group" aria-label="Контакты">
                            <h2 className="footer__title">Контакты →</h2>
                            <div className="footer__links">Telegram</div>
                        </section>
                        <section className="footer__group" aria-label="Сотрудничество">
                            <h2 className="footer__title">Сотрудничество →</h2>
                            <div className="footer__links">
                                <a className="footer__link" href="mailto:work@kisa">work@kisa</a>
                            </div>
                        </section>
                    </div>
                    <div className="footer__column">
                        <section className="footer__group" aria-label="Покупателям">
                            <h2 className="footer__title">Покупателям →</h2>
                            <div className="footer__links footer__links--buyers">
                                <span className="footer__text">Оплата и возврат</span>
                                <span className="footer__text">Документы</span>
                            </div>
                        </section>
                        <section className="footer__group" aria-label="Поддержка">
                            <h2 className="footer__title">Поддержка →</h2>
                            <div className="footer__links">
                                <span className="footer__text">Telegram</span>
                                <a className="footer__link" href="mailto:support@kisa">support@kisa</a>
                            </div>
                        </section>
                    </div>
                    <p className="footer__copyright">
                        <span className="footer__copyright-line">KISA E COMMERCE©</span>
                        <span className="footer__copyright-line">ALL RIGHTS RESERVED</span>
                    </p>
                </div>
                <div className="footer__wordmark" aria-label="KISA">KISA</div>
            </div>
        </footer>
    );
};
