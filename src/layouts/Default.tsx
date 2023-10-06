import { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

// hooks

// utils
import { changeBodyAttribute } from '../utils';

const loading = () => <div className=""></div>;

type DefaultLayoutProps = {};

const DefaultLayout = (props: DefaultLayoutProps) => {

    useEffect(() => {
        changeBodyAttribute('data-layout-color', "light");
    }, []);

    return (
        <Suspense fallback={loading()}>
            <Outlet />
        </Suspense>
    );
};
export default DefaultLayout;
