import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import PageTitle from '../../../components/PageTitle';
import Table from '../../../components/Table';
import classNames from 'classnames';


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


export default function PortalProjects() {
    const navigate = useNavigate()

    /* status column render */
    const StatusColumn = ({ row }: { row: any }) => {
        return (
            <>
                <span
                    className={classNames("badge", {
                        "bg-success": row.original.status === "Open",
                        "bg-secondary text-light": row.original.status === "Closed",
                    })}
                >
                    {row.original.status}
                </span>
            </>
        );
    };


    const ActionColumn = () => {
        return (
            <React.Fragment>
                <Link to="/apps/portalProjects/Profile" className="action-icon">
                    {" "}
                    <i className="mdi mdi-eye"></i>
                </Link>
                <Link to="#" className="action-icon">
                    {" "}
                    <i className="mdi mdi-square-edit-outline"></i>
                </Link>
                <Link to="#" className="action-icon">
                    {" "}
                    <i className="mdi mdi-delete"></i>
                </Link>
            </React.Fragment>
        );
    };
    const columns = [
        {
            Header: 'ID',
            accessor: '_id',
            sort: true,
        },
        {
            Header: 'Project Title',
            accessor: 'Project Title',
            sort: true,
        },
        {
            Header: 'bidder',
            accessor: 'bidder',
            sort: true,
        },
        {
            Header: 'Sales Person',
            accessor: 'SalesPerson',
            sort: false,
        },
        {
            Header: 'Amount',
            accessor: 'Amount',
            sort: false,
        },
        {
            Header: 'status',
            accessor: 'status',
            sort: false,
            cell: StatusColumn
        },
        {
            Header: "Action",
            accessor: "action",
            sort: false,
            Cell: ActionColumn,
        },
    ];

    const loading = false

    return loading ? (
        <h4>Loading...</h4>
    ) : (
        <React.Fragment>
            <PageTitle
                breadCrumbItems={[
                    { label: "Portal projects", path: "/apps/portalProjects" },
                ]}
                title={"Portal Projects"}
            />
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col sm={4}>
                                    <Button
                                        onClick={() => {
                                            navigate("/apps/portalProjects/addportalProject")
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
                                data={[1]}
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
        </React.Fragment>
    );
}
