import { Button, Card, Col, Modal, Row } from 'react-bootstrap';
import Table from '../../../components/Table';
import PageTitle from '../../../components/PageTitle';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FormInput } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { CreateNewRole, DeleteRole, UpdateRole } from '../../../redux/Slices/Roles/Roles';
import { startLoading, stopLoading } from '../../../redux/Slices/utiltities/Utiltities';
import Spinner from '../../../components/Spinner';
import { AddMail, DeleteMail, EditMail } from '../../../redux/Slices/usermail/UserMail';
import utils from '../../../utils/utils';
import { toast } from 'react-toastify';

export default function EmailSetup() {
    const { employeeId } = useParams();
    const dispatch = useDispatch();
    const [responsiveModal, setResponsiveModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [id, setId] = useState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [openView, setOpenView] = useState(false);
    const [viewName, setViewName] = useState('');

    const { roles, token, loading ,employee,Mails} = useSelector(
        (state) => ({
            roles: state.Roles.roles,
            token: state.Auth.token,
            loading: state.utiltities.loading,
            employee: state.Employees.employees,
            Mails: state.Mails.Mails,
          

        })
    );


    /**
     * Show/hide the modal
     */
    const toggleResponsiveModal = () => {
        setResponsiveModal(!responsiveModal);
    };

    const openEdit = ({ id, email,password }) => {
        console.log("email",email)
        setEditModal(!editModal);
        setId(id);

        setEmail(email);
        setPassword(password);
    };

    const closeEdit = () => {
        setEditModal(!editModal);
        setId();
        setEmail('')

        setPassword('');
    }
    const closeView = (pro) => {
        setViewName(pro?.name)
        setOpenView(!openView);
    };

    const delRole = async ({ id }) => {
 
        dispatch(startLoading());
        await dispatch(DeleteMail(id, token));
        dispatch(stopLoading());
    }

    /* action column render */
    const ActionColumn = ({ projectId }) => {
    
        return (
            <React.Fragment>
                {/* <Link className="action-icon" onClick={() => closeView(projectId)}>
                    {" "}
                    <i className="mdi mdi-eye"></i>
                </Link> */}
                <Link className="action-icon" onClick={() => openEdit(projectId)}>
                    {" "}
                    <i className="mdi mdi-square-edit-outline"></i>
                </Link>
                <Link className="action-icon" onClick={() => delRole(projectId)}>
                    {" "}
                    <i className="mdi mdi-delete"></i>
                </Link>
            </React.Fragment>
        );
    };
    const columns = [
     
        {
            Header: 'Email',
            accessor: 'email',
            sort: false,
        },
        {
            Header: 'Password',
            accessor: 'password',
            sort: false,
        },
        {
            Header: "Action",
            accessor: "action",
            sort: false,
            Cell: ({ row }) => <ActionColumn projectId={row.original} />,
        },
    ];

    const sizePerPageList = [
        {
            text: '10',
            value: 10,
        },
        {
            text: '20',
            value: 20,
        },
        {
            text: '35',
            value: 35,
        },
        {
            text: 'All',
            value: roles?.length,
        },
    ];

    const addRole = async () => {
        if (!utils.validateEmail(email)) {
            toast.error("Enter correct email", {
              position: toast.POSITION.TOP_RIGHT,
            });
            dispatch(stopLoading());
            return;
          }
        const formData=new FormData()

        formData.append("user_id",employeeId)
        formData.append("email",email)
        formData.append("password",password)
        dispatch(startLoading());
        await dispatch(AddMail(formData, token));
        dispatch(stopLoading());
        toggleResponsiveModal();
    };

    const updateRole = async () => {
        if (!utils.validateEmail(email)) {
            toast.error("Enter correct email", {
              position: toast.POSITION.TOP_RIGHT,
            });
            dispatch(stopLoading());
            return;
          }
        const formData=new FormData()
        formData.append("user_mail_id",id)
        formData.append("email",email)
        formData.append("password",password)
        dispatch(startLoading());
        await dispatch(EditMail(id, formData, token));
        closeEdit();
        dispatch(stopLoading());
    };

    return loading ? (
        <div className='d-flex justify-content-center align-items-center'>
            <Spinner className="m-2" color={'primary'} />
        </div>
    ) : (
        <>
            <PageTitle
           
                title={"Email List"}
            />
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col sm={4}>
                                    <Button
                                        onClick={toggleResponsiveModal}
                                        className="btn btn-danger mb-2">
                                        <i className="mdi mdi-plus-circle me-2"></i> Add Email
                                    </Button>
                                </Col>

                                <Col sm={8}>
                                    <div className="text-sm-end">
                                        <Button className="btn btn-success mb-2 me-1">
                                            <i className="mdi mdi-cog-outline"></i>
                                        </Button>

                                        <Button className="btn btn-light mb-2 me-1">Import</Button>

                                        <Button className="btn btn-light mb-2">Export</Button>
                                    </div>
                                </Col>
                            </Row>
                            {Mails !== undefined && Mails !== null ? (
                                <Table
                                    columns={columns}
                                    data={Mails}
                                    pageSize={10}
                                    sizePerPageList={sizePerPageList}
                                    isSortable={true}
                                    pagination={true}
                                    isSelectable={true}
                                    isSearchable={true}
                                    tableClass="table-striped dt-responsive nowrap w-100"
                                    searchBoxClass="my-2"
                                />
                            ) : null}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Modal show={responsiveModal} onHide={toggleResponsiveModal}>
                <Modal.Header closeButton>
                    <h4 className="modal-title">Add Email</h4>
                </Modal.Header>
                <Modal.Body className="p-4">

                    <FormInput
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        label="Email"
                        type="text"
                        name="Email"
                        placeholder="Email"
                        containerClass={'mb-3'}
                        key="text"
                    />
                    <FormInput
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="Password"
                        type="text"
                        name="Password"
                        placeholder="Password"
                        containerClass={'mb-3'}
                        key="text"
                    />
                 
                </Modal.Body>

                <Modal.Footer>
                    <button
                        type="button"
                        className="btn btn-secondary waves-effect"
                        onClick={toggleResponsiveModal}
                    >
                        Close
                    </button>
                    <button
                        // type="submit"
                        className="btn btn-info waves-effect waves-light"
                        onClick={addRole}
                    >
                        Add
                    </button>
                </Modal.Footer>
            </Modal>
            <Modal show={editModal} onHide={closeEdit}>
                <Modal.Header closeButton>
                    <h4 className="modal-title">Edit Role</h4>
                </Modal.Header>
                <Modal.Body className="p-4">

                    <FormInput
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        label="Password"
                        type="text"
                        name="Email"
                        placeholder="Email"
                        containerClass={'mb-3'}
                        key="text"
                    />
                    <FormInput
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="Password"
                        type="text"
                        name="Password"
                        placeholder="Email"
                        containerClass={'mb-3'}
                        key="text"
                    />
                </Modal.Body>

                <Modal.Footer>
                    <button
                        type="button"
                        className="btn btn-secondary waves-effect"
                        onClick={closeEdit}
                    >
                        Close
                    </button>
                    <button
                        // type="submit"
                        className="btn btn-info waves-effect waves-light"
                        onClick={updateRole}
                    >
                        Update
                    </button>
                </Modal.Footer>
            </Modal>
            <Modal show={openView} onHide={closeView}>
                <Modal.Header closeButton>
                    <h4 className="modal-title">Role</h4>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <p>Role Name</p>
                    <p>{viewName}</p>
                </Modal.Body>

                <Modal.Footer>
                    <button
                        type="button"
                        className="btn btn-secondary waves-effect"
                        onClick={closeView}
                    >
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
