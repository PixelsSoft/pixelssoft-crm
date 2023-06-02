import { Card, Col, Row } from 'react-bootstrap';
import { usePageTitle } from '../../../hooks';
import Table from '../../../components/Table';

import { records as data } from './data';

const columns = [
    {
        Header: 'ID',
        accessor: 'id',
        sort: true,
    },
    {
        Header: 'Name',
        accessor: 'name',
        sort: true,
    },
    {
        Header: 'Phone Number',
        accessor: 'phone',
        sort: false,
    },
    {
        Header: 'Age',
        accessor: 'age',
        sort: true,
    },
    {
        Header: 'Company',
        accessor: 'company',
        sort: false,
    },
    {
        Header: 'Designation',
        accessor: 'designation',
        sort: false,
    },
    {
        Header: 'Time',
        accessor: 'time',
        sort: false,
    },
];

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
    {
        text: 'All',
        value: data.length,
    },
];

const Users = () => {
    usePageTitle({
        title: 'Users',
        breadCrumbItems: [
            {
                path: '/apps/users',
                label: 'Apps',
            },
            {
                path: '/apps/users',
                label: 'Users',
                active: true,
            },
        ],
    });
    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <h4 className="header-title mb-4">Users List</h4>
                            {/* <p className="text-muted font-14 mb-4">Users List</p> */}

                            <Table
                                columns={columns}
                                data={data}
                                pageSize={5}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pagination={true}
                                isSearchable={true}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default Users;
