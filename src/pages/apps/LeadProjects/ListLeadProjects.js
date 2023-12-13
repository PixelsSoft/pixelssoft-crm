import React, { useCallback, useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import PageTitle from '../../../components/PageTitle';
import Table from '../../../components/Table';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../../components/Spinner';
import { DeleteProject } from '../../../redux/Slices/Project/Project';
import { startLoading, stopLoading } from '../../../redux/Slices/utiltities/Utiltities';
import EditPortalProject from '../../../components/EditPortalProject';

const sizePerPageList = [
    {
        text: '5',
        value: 5,
    },
    {
        text: '10',
        value: 10,
    },
    {
        text: '25',
        value: 25,
    },

]

const ListLeadProjects = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [id, setId] = useState();
    const [editUserModal, setEditUserModal] = useState(false);

    const { project, loading, token } = useSelector(
        (state) => ({
            project: state.Projects.project,
            loading: state.utiltities.loading,
            token: state.Auth.token,
        })
    );

    const ActionColumn = ({ row }) => {
        return (
            <React.Fragment>
                <Link to={`/apps/leadProjects/Profile/${row.original.id}`} className="action-icon">
                    {" "}
                    <i className="mdi mdi-eye"></i>
                </Link>
                <Link className="action-icon" onClick={() => toggleEditModal(row.original.id)}>
                    {" "}
                    <i className="mdi mdi-square-edit-outline"></i>
                </Link>
                <Link className="action-icon" onClick={() => del(row.original.id)}>
                    {" "}
                    <i className="mdi mdi-delete"></i>
                </Link>
            </React.Fragment >
        );
    };

    const toggleEditModal = (id) => {
        setId(id);
        setEditUserModal(!editUserModal);
    }

    const del = async (id) => {
        let lead = 1
        dispatch(startLoading());
        await dispatch(DeleteProject(id, token, navigate, lead));
        dispatch(stopLoading());
    };

    const columns = [
        {
            Header: 'Project Title',
            accessor: 'title',
            sort: true,
        },
        {
            Header: 'bidder',
            accessor: 'bidby.name',
            sort: true,
        },
        {
            Header: 'Sales Person',
            accessor: 'closedby.name',
            sort: false,
        },
        {
            Header: 'Paid Amount',
            accessor: 'paid_amount',
            sort: false,
        },
        {
            Header: 'Amount',
            accessor: 'total_amount',
            sort: false,
        },
        {
            Header: "Action",
            accessor: "id",
            sort: false,
            Cell: ({ row }) => <ActionColumn row={row} />,
        },
    ];

    const filterProjects = useCallback(() => {
        if (project?.length > 0) {
            const filteredArray = project.filter((item) => item.type === "lead");
            setData(filteredArray);
        };
    }, [project]);

    useEffect(() => {
        filterProjects();
    }, []);

    return loading ? (
        <div className='d-flex justify-content-center align-items-center'>
            <Spinner className="m-2" color={'primary'} />
        </div>
    ) : (
        <React.Fragment>
            <PageTitle
                breadCrumbItems={[
                    { label: "Portal projects", path: "/apps/LeadProjects" },
                ]}
                title={"Lead Projects"}
            />
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col sm={4}>
                                    <Button
                                        onClick={() => {
                                            navigate("/apps/leadProjects/addleadProjects")
                                        }}
                                        className="btn btn-danger mb-2">
                                        <i className="mdi mdi-plus-circle me-2"></i> Add Projects
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
                            <Table
                                columns={columns}
                                data={data}
                                pageSize={10}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pagination={true}
                                isSelectable={true}
                                isSearchable={true}
                                tableClass="table-striped dt-responsive nowrap w-100"
                                searchBoxClass="my-2"
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {editUserModal ? (
                <EditPortalProject projectId={id} editUserModal={editUserModal} toggleEditModal={toggleEditModal} />
            ) : null}
        </React.Fragment>
    );
}

export default ListLeadProjects