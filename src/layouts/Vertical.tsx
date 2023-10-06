import React, { Suspense, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

// hooks
import { useRedux } from '../hooks/';

// constants
import { LayoutColor, LayoutTypes, LayoutWidth, MenuPositions, SideBarTheme, SideBarTypes } from '../constants';

// utils
import { changeBodyAttribute } from '../utils';

// code splitting and lazy loading
// https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52
const Topbar = React.lazy(() => import('./Topbar/'));
const LeftSidebar = React.lazy(() => import('./LeftSidebar'));
const RightSidebar = React.lazy(() => import('./RightSidebar'));

const loading = () => <div className=""></div>;

const VerticalLayout = () => {
    // const { appSelector } = useRedux();

    // const {
    //     layoutColor,
    //     layoutWidth,
    //     menuPosition,
    //     leftSideBarTheme,
    //     leftSideBarType,
    //     showSidebarUserInfo,
    //     topbarTheme,
    // } = appSelector((state) => ({
    //     layoutColor: state.Layout.layoutColor,
    //     layoutWidth: state.Layout.layoutWidth,
    //     menuPosition: state.Layout.menuPosition,
    //     leftSideBarTheme: state.Layout.leftSideBarTheme,
    //     leftSideBarType: state.Layout.leftSideBarType,
    //     showSidebarUserInfo: state.Layout.showSidebarUserInfo,
    //     topbarTheme: state.Layout.topbarTheme,
    // }));

    const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);

    /*
  layout defaults
  */
    // useEffect(() => {
    //     changeBodyAttribute('data-layout-mode', LayoutTypes.LAYOUT_VERTICAL);
    // }, []);

    // useEffect(() => {
    //     changeBodyAttribute('data-layout-color', layoutColor);
    // }, [layoutColor]);

    // useEffect(() => {
    //     changeBodyAttribute('data-layout-size', layoutWidth);
    // }, [layoutWidth]);

    // useEffect(() => {
    //     changeBodyAttribute('data-leftbar-position', menuPosition);
    // }, [menuPosition]);

    // useEffect(() => {
    //     changeBodyAttribute('data-leftbar-color', leftSideBarTheme);
    // }, [leftSideBarTheme]);

    // useEffect(() => {
    //     changeBodyAttribute('data-leftbar-size', leftSideBarType);
    // }, [leftSideBarType]);

    // useEffect(() => {
    //     changeBodyAttribute('data-topbar-color', topbarTheme);
    // }, [topbarTheme]);
    useEffect(() => {
        changeBodyAttribute('data-layout-mode', LayoutTypes.LAYOUT_VERTICAL);
        changeBodyAttribute('data-layout-color', LayoutColor.LAYOUT_COLOR_LIGHT);
        changeBodyAttribute('data-layout-size', LayoutWidth.LAYOUT_WIDTH_FLUID);
        changeBodyAttribute('data-leftbar-position', MenuPositions.MENU_POSITION_FIXED);
        changeBodyAttribute('data-leftbar-color', SideBarTheme.LEFT_SIDEBAR_THEME_LIGHT);
        changeBodyAttribute('data-topbar-color', SideBarTheme.LEFT_SIDEBAR_THEME_LIGHT);
        changeBodyAttribute('data-leftbar-size', SideBarTypes.LEFT_SIDEBAR_TYPE_DEFAULT);
        changeBodyAttribute('data-sidebar-user', 'true');
    }, []);



    /**
     * Open the menu when having mobile screen
     */
    const openMenu = () => {
        setIsMenuOpened((prevState) => !prevState);

        if (document.body) {
            if (isMenuOpened) {
                document.body.classList.remove('sidebar-enable');
            } else {
                document.body.classList.add('sidebar-enable');
            }
        }
    };

    // const isCondensed: boolean = leftSideBarType === SideBarTypes.LEFT_SIDEBAR_TYPE_CONDENSED;
    // const isCondensed: boolean = true === SideBarTypes.LEFT_SIDEBAR_TYPE_CONDENSED;

    return (
        <>
            <div id="wrapper">
                <Suspense fallback={loading()}>
                    <Topbar openLeftMenuCallBack={openMenu} />
                </Suspense>
                <Suspense fallback={loading()}>
                    <LeftSidebar
                        isCondensed={false}
                    />
                </Suspense>
                <div className="content-page">
                    <div className="content">
                        <Container fluid>
                            <Outlet />
                        </Container>
                    </div>

                    <Suspense fallback={loading()}></Suspense>
                </div>
            </div>

            <Suspense fallback={loading()}>
                <RightSidebar />
            </Suspense>
        </>
    );
};

export default VerticalLayout;
