import type { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { products as demoProducts } from './products';
import { getProducts } from './productApi';
import { ProductCatalogContext } from './productCatalogContext';

export const ProductCatalogProvider = ({ children }: { children: ReactNode }) => {
    const query = useQuery({
        queryKey: ['products'],
        queryFn: getProducts,
        initialData: demoProducts,
        staleTime: 0,
        retry: 1,
    });

    return (
        <ProductCatalogContext.Provider value={{
            products: query.data ?? demoProducts,
            isRemote: query.isFetched && !query.error,
            error: query.error,
        }}>
            {children}
        </ProductCatalogContext.Provider>
    );
};