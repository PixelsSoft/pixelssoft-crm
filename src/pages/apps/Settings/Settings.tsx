import { Alert, Button, Card, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap';
import { usePageTitle, useRedux } from '../../../hooks';
import { FormEventHandler, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createNewRole, resetCreateRole, getAllRoles } from '../../../redux/roles/actions';

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

    const [all, setAll] = useState(false);
    const [roleTitle, setRoleTitle] = useState('');
    const [allowDashboard, setAllowDashboard] = useState(false);

    const [allowViewInvoices, setAllowViewInvoices] = useState(false);
    const [allowCreateInvoices, setAllowCreateInvoice] = useState(false);

    const [allowViewCustomers, setAllowViewCustomers] = useState(false);
    const [allowCreateCustomers, setAllowCreateCustomers] = useState(false);

    const [allowViewProjects, setAllowViewProjects] = useState(false);
    const [allowCreateProjects, setAllowCreateProjects] = useState(false);

    const [allowSales, setAllowSales] = useState(false);

    const [allowViewUsers, setAllowViewUsers] = useState(false);
    const [allowCreateUsers, setAllowCreateUsers] = useState(false);

    const [allowReports, setAllowReports] = useState(false);

    const [allowViewExpenses, setAllowViewExpenses] = useState(false);
    const [allowCreateExpenses, setAllowCreateExpenses] = useState(false);

    const [allowAttendance, setAllowAttendance] = useState(false);

    const [allowLeads, setAllowLeads] = useState(false);
    const [allowPayouts, setAllowPayouts] = useState(false);

    const toggle = () => setAccessControlModal(!accessControlModal);
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

    const { dispatch, appSelector } = useRedux();

    const { createRoleSuccess, data, roles } = appSelector((state) => ({
        createRoleSuccess: state.Roles.createRoleSuccess,
        data: state.Roles.data,
        roles: state.Roles.roles,
    }));

    const submit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        dispatch(
            createNewRole({
                title: roleTitle,
                access: {
                    all,
                    allowDashboard,
                    allowAttendance,
                    allowCreateCustomers,
                    allowCreateExpenses,
                    allowCreateInvoices,
                    allowCreateProjects,
                    allowCreateUsers,
                    allowLeads,
                    allowPayouts,
                    allowReports,
                    allowSales,
                    allowViewCustomers,
                    allowViewExpenses,
                    allowViewInvoices,
                    allowViewProjects,
                    allowViewUsers,
                },
            })
        );
    };

    console.log(roles.data);

    const reset = () => {
        setRoleTitle('');
        setAll(false);
        setAllowDashboard(false);
        setAllowAttendance(false);
        setAllowCreateCustomers(false);
        setAllowCreateExpenses(false);
        setAllowCreateInvoice(false);
        setAllowCreateProjects(false);
        setAllowCreateUsers(false);
        setAllowLeads(false);
        setAllowPayouts(false);
        setAllowReports(false);
        setAllowSales(false);
        setAllowViewCustomers(false);
        setAllowViewExpenses(false);
        setAllowViewInvoices(false);
        setAllowViewProjects(false);
        setAllowViewUsers(false);
    };

    useEffect(() => {
        if (createRoleSuccess) {
            reset();
            dispatch(getAllRoles());
        }
    }, [createRoleSuccess, dispatch]);

    const onClose = () => {
        reset();
        dispatch(resetCreateRole());
        toggle();
    };

    useEffect(() => {
        dispatch(getAllRoles());
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
                                {(roles?.data || []).map((role: Role, index: number) => {
                                    return (
                                        <li className="list-group-item" key={index.toString()}>
                                            <Link to="#" className="user-list-item d-flex justify-content-between">
                                                <div className="user-desc overflow-hidden">
                                                    <h5 className="name mt-0 mb-1">{role.title}</h5>
                                                    {/* <span className="desc text-muted font-12 text-truncate d-block">
                                                        All access
                                                    </span> */}
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

            <Modal show={accessControlModal} onHide={toggle} centered>
                <Modal.Header closeButton>
                    <Modal.Title as="h4">Accesss Control</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={submit}>
                        <Row className="my-2">
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Role title</Form.Label>
                                <Form.Control value={roleTitle} onChange={(e) => setRoleTitle(e.target.value)} />
                            </Form.Group>
                        </Row>
                        <Row className="mt-2">
                            <h4>Assign rights</h4>
                        </Row>
                        <Row>
                            <h4 className="header-title text-dark">Dashboard</h4>
                            <div className="mt-1">
                                <Form.Check
                                    type="checkbox"
                                    id="default-checkbox1"
                                    label="Allow Dashboard"
                                    checked={allowDashboard}
                                    onChange={(e) => setAllowDashboard(!allowDashboard)}
                                />
                            </div>
                        </Row>
                        <Row className="my-2">
                            <h4 className="header-title">Invoice</h4>
                            <div className="mt-1">
                                <Form.Check
                                    type="checkbox"
                                    id="default-checkbox1"
                                    label="View Invoices"
                                    checked={allowViewInvoices}
                                    onChange={(e) => setAllowViewInvoices(!allowViewInvoices)}
                                />
                                <Form.Check
                                    type="checkbox"
                                    id="default-checkbox1"
                                    label="Create Invoice"
                                    checked={allowCreateInvoices}
                                    onChange={(e) => setAllowCreateInvoice(!allowCreateInvoices)}
                                />
                            </div>
                        </Row>

                        <Row className="my-2">
                            <h4 className="header-title">Customers</h4>
                            <div className="mt-1">
                                <Form.Check
                                    type="checkbox"
                                    id="default-checkbox1"
                                    label="View Customers"
                                    checked={allowViewCustomers}
                                    onChange={(e) => setAllowViewCustomers(!allowViewCustomers)}
                                />
                                <Form.Check
                                    type="checkbox"
                                    id="default-checkbox1"
                                    label="Create Customers"
                                    checked={allowCreateCustomers}
                                    onChange={(e) => setAllowCreateCustomers(!allowCreateCustomers)}
                                />
                            </div>
                        </Row>

                        <Row className="my-2">
                            <h4 className="header-title">Projects</h4>
                            <div className="mt-1">
                                <Form.Check
                                    type="checkbox"
                                    id="default-checkbox1"
                                    label="View Projects"
                                    checked={allowViewProjects}
                                    onChange={(e) => setAllowViewProjects(!allowViewProjects)}
                                />
                                <Form.Check
                                    type="checkbox"
                                    id="default-checkbox1"
                                    label="Create Projects"
                                    checked={allowCreateProjects}
                                    onChange={(e) => setAllowCreateProjects(!allowCreateProjects)}
                                />
                            </div>
                        </Row>

                        <Row className="my-2">
                            <h4 className="header-title">Sales</h4>
                            <div className="mt-1">
                                <Form.Check
                                    type="checkbox"
                                    id="default-checkbox1"
                                    label="Allow Sales"
                                    checked={allowSales}
                                    onChange={(e) => setAllowSales(!allowSales)}
                                />
                            </div>
                        </Row>

                        <Row className="my-2">
                            <h4 className="header-title">Users</h4>
                            <div className="mt-1">
                                <Form.Check
                                    type="checkbox"
                                    id="default-checkbox1"
                                    label="View Users"
                                    checked={allowViewUsers}
                                    onChange={(e) => setAllowViewUsers(!allowViewUsers)}
                                />
                                <Form.Check
                                    type="checkbox"
                                    id="default-checkbox1"
                                    label="Create Users"
                                    checked={allowCreateUsers}
                                    onChange={(e) => setAllowCreateUsers(!allowCreateUsers)}
                                />
                            </div>
                        </Row>

                        <Row className="my-2">
                            <h4 className="header-title">Reports</h4>
                            <div className="mt-1">
                                <Form.Check
                                    type="checkbox"
                                    id="default-checkbox1"
                                    label="Allow Reports"
                                    checked={allowReports}
                                    onChange={(e) => setAllowReports(!allowReports)}
                                />
                            </div>
                        </Row>
                        <Row className="my-2">
                            <h4 className="header-title">Expenses</h4>
                            <div className="mt-1">
                                <Form.Check
                                    type="checkbox"
                                    id="default-checkbox1"
                                    label="View Expenses"
                                    checked={allowViewExpenses}
                                    onChange={(e) => setAllowViewExpenses(!allowViewExpenses)}
                                />
                                <Form.Check
                                    type="checkbox"
                                    id="default-checkbox1"
                                    label="Create Expense"
                                    checked={allowCreateExpenses}
                                    onChange={(e) => setAllowCreateExpenses(!allowCreateExpenses)}
                                />
                            </div>
                        </Row>

                        <Row className="my-2">
                            <h4 className="header-title">Attendance</h4>
                            <div className="mt-1">
                                <Form.Check
                                    type="checkbox"
                                    id="default-checkbox1"
                                    label="View Attendance"
                                    checked={allowAttendance}
                                    onChange={(e) => setAllowAttendance(!allowAttendance)}
                                />
                                <Form.Check
                                    type="checkbox"
                                    id="default-checkbox1"
                                    label="View/Create Payouts"
                                    checked={allowPayouts}
                                    onChange={(e) => setAllowPayouts(!allowPayouts)}
                                />
                            </div>
                        </Row>
                        <Row className="my-2">
                            <h4 className="header-title">Leads</h4>
                            <div className="mt-1">
                                <Form.Check
                                    type="checkbox"
                                    id="default-checkbox1"
                                    label="View Leads"
                                    checked={allowLeads}
                                    onChange={(e) => setAllowLeads(!allowLeads)}
                                />
                            </div>
                        </Row>

                        {data && (
                            <Alert variant="success" className="my-2">
                                {data.message}
                            </Alert>
                        )}

                        <div className="d-flex justify-content-end border-top border-gray pt-2">
                            <Button variant="light" className="waves-effect waves-light me-1" type="submit">
                                Save
                            </Button>
                            <Button variant="danger" className="waves-effect waves-light" onClick={onClose}>
                                Cancel
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Settings;
