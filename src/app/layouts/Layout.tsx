import { Header, Footer } from '@widgets/index';
import { LoadingPage } from '@/pages';
import { Suspense } from 'react';
import { useAppLoading } from '@/shared/hooks/useAppLoading';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
    const { isLoading } = useAppLoading(800);

    if (isLoading) {
        return <LoadingPage />;
    }

    return (
        <div className='app'>
            <Header />
            <main className='container'>
                <Suspense fallback={<LoadingPage />}>
                    <Outlet />
                </Suspense>
            </main>
            <Footer />
        </div>
    );
};
