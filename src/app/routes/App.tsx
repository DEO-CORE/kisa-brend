import { CartProvider } from '@/features/cart/CartProvider';
import { RouterProvider } from 'react-router-dom';
import { router } from '@app/routes/router';
import '@app/styles/global.scss';

function App() {
  return <CartProvider><RouterProvider router={router} /></CartProvider>;
}

export default App;