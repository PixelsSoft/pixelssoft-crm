import { useEffect, useRef, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

// helpers
import { getMenuItems } from '../helpers/menu';

// components
import Scrollbar from '../components/Scrollbar';

import AppMenu from './Menu';

// images
import { useRedux } from '../hooks';

/* user box */
const UserBox = () => {
    const { appSelector } = useRedux();

    // const { user } = appSelector((state) => ({
    //     user: state.Auth.user,
    // }));

    // get the profilemenu
    const ProfileMenus = [
        {
            label: 'My Account',
            icon: 'fe-user',
            redirectTo: '/apps/contacts/profile',
        },
        {
            label: 'Settings',
            icon: 'fe-settings',
            redirectTo: '#',
        },
        {
            label: 'Lock Screen',
            icon: 'fe-lock',
            redirectTo: '/auth/lock-screen',
        },
        {
            label: 'Logout',
            icon: 'fe-log-out',
            redirectTo: '/auth/logout',
        },
    ];

    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    /*
     * toggle dropdown
     */
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
    const user = {
        user: {
            profilePic: {
                url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5_FVz5EHkQtabX8CJJPiB6EIkfvKRL8JVew5LVlBkWlyEG9vIu6FgTZSE2qPa3_DLjiE&usqp=CAU"
            },
            fullName: "taimoor khan",
            designation: "CEO"
        }
    }


    return (
        <div className="user-box text-center">
            <img
                src={user.user.profilePic.url}
                alt=""
                title="Mat Helme"
                className="rounded-circle img-thumbnail avatar-md"
            />
            <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
                <Dropdown.Toggle
                    id="dropdown-notification"
                    to="#"
                    as={Link}
                    onClick={toggleDropdown}
                    className="user-name h5 mt-2 mb-1 d-block">
                    {user.user.fullName}
                </Dropdown.Toggle>
                <Dropdown.Menu className="user-pro-dropdown">
                    <div onClick={toggleDropdown}>
                        {(ProfileMenus || []).map((item, index) => {
                            return (
                                <Link
                                    to={item.redirectTo}
                                    className="dropdown-item notify-item"
                                    key={index + '-profile-menu'}>
                                    <i className={classNames(item.icon, 'me-1')}></i>
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </Dropdown.Menu>
            </Dropdown>
            <p className="text-muted left-user-info">{user.user.designation}</p>

            <ul className="list-inline">
                <li className="list-inline-item">
                    <Link to="#" className="text-muted left-user-info">
                        <i className="mdi mdi-cog"></i>
                    </Link>
                </li>

                <li className="list-inline-item">
                    <Link to="#">
                        <i className="mdi mdi-power"></i>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

/* sidebar content */
const SideBarContent = () => {
    return (
        <>
            <UserBox />

            <div id="sidebar-menu">
                <AppMenu menuItems={getMenuItems()} />
            </div>

            <div className="clearfix" />
        </>
    );
};

type LeftSidebarProps = {
    isCondensed: boolean;
};

const LeftSidebar = ({ isCondensed }: LeftSidebarProps) => {
    const menuNodeRef: any = useRef(null);

    /**
     * Handle the click anywhere in doc
     */
    const handleOtherClick = (e: any) => {
        if (menuNodeRef && menuNodeRef.current && menuNodeRef.current.contains(e.target)) return;
        // else hide the menubar
        if (document.body) {
            document.body.classList.remove('sidebar-enable');
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOtherClick, false);

        return () => {
            document.removeEventListener('mousedown', handleOtherClick, false);
        };
    }, []);

    return (
        <div className="left-side-menu" ref={menuNodeRef}>
            {!isCondensed && (
                <Scrollbar style={{ maxHeight: '100%' }}>
                    <SideBarContent />
                </Scrollbar>
            )}
            {isCondensed && <SideBarContent />}
        </div>
    );
};

LeftSidebar.defaultProps = {
    isCondensed: false,
};

export default LeftSidebar;
