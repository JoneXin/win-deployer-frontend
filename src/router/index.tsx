import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import Color from '@/layout/Color';
import Speed from '@/layout/Speed';

const routes = [
    {
        path: '/',
        element: <Home />,
    },

    {
        path: '*',
        element: <NotFound />,
    },
];

export default routes;
