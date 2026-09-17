import { RouterProvider } from 'react-router-dom';
import { router } from '@app/routes/router';
import '@app/styles/global.scss';

function App() {
  return <RouterProvider router={router} />;
}

export default App;