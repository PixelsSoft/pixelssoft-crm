import { Button, Card, Col, Dropdown, Row } from 'react-bootstrap';
import { usePageTitle, useRedux } from '../../../hooks';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { getAllRoles } from '../../../redux/roles/actions';
import CreateRole from './CreateRole';
import CreateCategory from './CreateCategory';
// import { getAllCategories } from '../../../redux/projectCategories/actions';

type Role = {
    title: string;
    access: {
        all: boolean;
        allowDashboard: boolean;
        allowViewInvoices: boolean;
        allowCreateInvoices: boolean;
        allowViewCustomers: boolean;
        allowCreateCustomers: boolean;
        allowViewProjects: boolean;
        allowCreateProjects: boolean;
        allowSales: boolean;
        allowViewUsers: boolean;
        allowCreateUsers: boolean;
        allowReports: boolean;
        allowViewExpenses: boolean;
        allowCreateExpenses: boolean;
        allowPayouts: boolean;
        allowAttendance: boolean;
        allowLeads: boolean;
    };
};

const Settings = () => {
    const [accessControlModal, setAccessControlModal] = useState(false);
    const [createCategoryModal, setCreateCategoryModal] = useState(false);

    const { dispatch, appSelector } = useRedux();

    // const { roles, categories } = appSelector((state) => ({
    //     roles: state.Roles.roles,
    //     categories: state.ProjectCategories.categories,
    // }));

    const toggle = () => setAccessControlModal(!accessControlModal);
    const toggleCategoryModal = () => setCreateCategoryModal(!createCategoryModal);

    usePageTitle({
        title: 'Settings',
        breadCrumbItems: [
            {
                path: '/apps/settings',
                label: 'Apps',
            },
            {
                path: '/apps/settings',
                label: 'Settings',
                active: true,
            },
        ],
    });

    useEffect(() => {
        // dispatch(getAllRoles());
        // dispatch(getAllCategories());
    }, [dispatch]);

    return (
        <>
            <Row>
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <h4 className="header-title">Access Control</h4>
                                    <p className="sub-header">Manage what users can access with roles</p>
                                </Col>
                                <Col className="d-flex justify-content-end align-items-center">
                                    <Button onClick={toggle}>Add</Button>
                                </Col>
                            </Row>

                            <ul className="list-group mb-0 user-list">
                                {([]).map((role: Role, index: number) => {
                                    return (
                                        <li className="list-group-item" key={index.toString()}>
                                            <Link to="#" className="user-list-item d-flex justify-content-between">
                                                <div className="user-desc overflow-hidden">
                                                    <h5 className="name mt-0 mb-1">{role.title}</h5>
                                                    <span className="desc text-muted font-12 text-truncate d-block">
                                                        All access
                                                    </span>
                                                </div>
                                                <Dropdown className="float-end" align="end">
                                                    <Dropdown.Toggle as="a" className="cursor-pointer card-drop">
                                                        <i className="mdi mdi-dots-vertical"></i>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item>Action</Dropdown.Item>
                                                        <Dropdown.Item>Anothther Action</Dropdown.Item>
                                                        <Dropdown.Item>Something Else</Dropdown.Item>
                                                        <Dropdown.Item>Separated link</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                                {/* <i className="fe-trash-2 text-danger" /> */}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <h4 className="header-title">Project Categories</h4>
                                    <p className="sub-header">Manage types of projects</p>
                                </Col>
                                <Col className="d-flex justify-content-end align-items-center">
                                    <Button onClick={toggleCategoryModal}>Add</Button>
                                </Col>
                            </Row>

                            <ul className="list-group mb-0 user-list">
                                {([]).map((category: any, index: number) => {
                                    return (
                                        <li className="list-group-item" key={index.toString()}>
                                            <Link to="#" className="user-list-item d-flex justify-content-between">
                                                <div className="user-desc overflow-hidden">
                                                    <h5 className="name mt-0 mb-1">{category.name}</h5>
                                                    <span className="desc text-muted font-12 text-truncate d-block">
                                                        All access
                                                    </span>
                                                </div>
                                                <Dropdown className="float-end" align="end">
                                                    <Dropdown.Toggle as="a" className="cursor-pointer card-drop">
                                                        <i className="mdi mdi-dots-vertical"></i>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item>Action</Dropdown.Item>
                                                        <Dropdown.Item>Anothther Action</Dropdown.Item>
                                                        <Dropdown.Item>Something Else</Dropdown.Item>
                                                        <Dropdown.Item>Separated link</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                                {/* <i className="fe-trash-2 text-danger" /> */}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <CreateRole accessControlModal={accessControlModal} toggle={toggle} />
            <CreateCategory createCategoryModal={createCategoryModal} toggleCategorymodal={toggleCategoryModal} />
        </>
    );
};

export default Settings;
