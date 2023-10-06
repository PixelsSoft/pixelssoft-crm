import { Alert, Button, Col, Form, Modal, Row } from 'react-bootstrap';

import { useRedux } from '../../../hooks';
import { FormEventHandler, useEffect, useState } from 'react';
// import { createNewRole, getAllRoles, resetCreateRole } from '../../../redux/roles/actions';

export default function CreateRole({
    accessControlModal,
    toggle,
}: {
    accessControlModal: boolean;
    toggle: () => void;
}) {
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
    const { dispatch, appSelector } = useRedux();

    const onClose = () => {
        reset();
        // dispatch(resetCreateRole());
        toggle();
    };

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

    // const { createRoleSuccess, data } = appSelector((state) => ({
    //     createRoleSuccess: state.Roles.createRoleSuccess,
    //     data: state.Roles.data,
    //     roles: state.Roles.roles,
    // }));

    // useEffect(() => {
    //     if (createRoleSuccess) {
    //         reset();
    //         // dispatch(getAllRoles());
    //     }
    // }, [createRoleSuccess, dispatch]);

    const submit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        // dispatch(
        //     createNewRole({
        //         title: roleTitle,
        //         access: {
        //             all,
        //             allowDashboard,
        //             allowAttendance,
        //             allowCreateCustomers,
        //             allowCreateExpenses,
        //             allowCreateInvoices,
        //             allowCreateProjects,
        //             allowCreateUsers,
        //             allowLeads,
        //             allowPayouts,
        //             allowReports,
        //             allowSales,
        //             allowViewCustomers,
        //             allowViewExpenses,
        //             allowViewInvoices,
        //             allowViewProjects,
        //             allowViewUsers,
        //         },
        //     })
        // );
    };
    return (
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

                    {/* {data && (
                        <Alert variant="success" className="my-2">
                            {data.message}
                        </Alert>
                    )} */}

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
    );
}
