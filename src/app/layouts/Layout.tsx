import { CartDrawer } from '@/features/cart/CartDrawer';
import { Header, Footer } from '@widgets/index';
import { LoadingPage } from '@/pages';
import { Suspense } from 'react';
import { useAppLoading } from '@/shared/hooks/useAppLoading';
import { Outlet, useLocation } from 'react-router-dom';
import { paths } from '@/shared/constants/consts';

export const Layout = () => {
    const { isLoading } = useAppLoading(800);
    const isHome = useLocation().pathname === paths.main;

    if (isLoading) {
        return <LoadingPage />;
    }

    return (
        <div className='app'>
            <Header />
            <main className={isHome ? 'main' : 'main container'}>
                <Suspense fallback={<LoadingPage />}>
                    <Outlet />
                </Suspense>
            </main>
            <Footer />
            <CartDrawer />
        </div>
    );
};
