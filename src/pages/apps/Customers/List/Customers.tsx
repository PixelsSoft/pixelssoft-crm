import { Card, Col, Row } from 'react-bootstrap';
import { usePageTitle } from '../../../../hooks';
import Table from '../../../../components/Table';

import { records as data } from './data';
import { Link } from 'react-router-dom';

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
        Header: 'Email',
        accessor: 'email',
        sort: true,
    },
    {
        Header: 'Phone Number',
        accessor: 'phone',
        sort: false,
    },
    {
        Header: 'Company',
        accessor: 'company',
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

const Customers = () => {
    usePageTitle({
        title: 'Customers',
        breadCrumbItems: [
            {
                path: '/apps/customers',
                label: 'Apps',
            },
            {
                path: '/apps/customers',
                label: 'Customers',
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
                            <Row>
                                <Col>
                                    <h4 className="header-title mb-4">Customers List</h4>
                                </Col>
                                <Col sm={4} className="d-flex justify-content-end">
                                    <Link
                                        to="profile/new"
                                        className="btn btn-purple rounded-pill w-md waves-effect waves-light mb-3">
                                        <i className="mdi mdi-plus me-1"></i>
                                        Create Customer
                                    </Link>
                                </Col>
                            </Row>
                            <Table
                                columns={columns}
                                data={data}
                                pageSize={5}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pagination={true}
                                isSearchable={true}
                                hasActions={true}
                                hasLink={true}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default Customers;
