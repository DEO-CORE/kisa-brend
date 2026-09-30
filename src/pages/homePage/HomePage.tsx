import type { FC } from 'react';
import './homePage.scss';

export const HomePage: FC = () => {
    return (
        <div className="homePage">
            <section className="homePage__banner" aria-labelledby="collection-title">
                <div className="container homePage__banner-content">
                    <h1 className="homePage__banner-title" id="collection-title">
                        SS’26 PART 1
                    </h1>
                </div>
            </section>
        </div>
    )
}
