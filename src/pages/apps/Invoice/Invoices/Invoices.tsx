import { Card, Col, Row } from 'react-bootstrap';
import { usePageTitle } from '../../../../hooks';
import Table from '../../../../components/Table';

import { records as data } from './data';

const columns = [
    {
        Header: 'ID',
        accessor: 'id',
        sort: true,
    },
    {
        Header: 'Status',
        accessor: 'status',
        sort: false,
    },
    {
        Header: 'Invoice #',
        accessor: 'invoiceNumber',
        sort: false,
    },
    {
        Header: 'Due Date',
        accessor: 'dueDate',
        sort: false,
    },
    {
        Header: 'Amount',
        accessor: 'amount',
        sort: false,
    },
    {
        Header: 'Pending Amount',
        accessor: 'pendingAmount',
        sort: false,
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
        value: data.length,
    },
];

const Invoices = () => {
    usePageTitle({
        title: 'Invoices',
        breadCrumbItems: [
            {
                path: '/apps/invoice/invoices',
                label: 'Apps',
            },
            {
                path: '/apps/invoice/invoices',
                label: 'Invoices',
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
                            <Table
                                columns={columns}
                                data={data}
                                pageSize={10}
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

export default Invoices;
