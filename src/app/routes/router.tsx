import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layouts/Layout";
import { paths } from '@shared/constants/consts';
import {
    HomePage,
    AboutPage,
    ErrorPage,
    LoadingPage,
} from "@pages/index";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            { path: paths.main, element: <HomePage /> },
            { path: paths.loading, element: <LoadingPage /> },
            { path: paths.about, element: <AboutPage /> },
        ],
    },
]);
