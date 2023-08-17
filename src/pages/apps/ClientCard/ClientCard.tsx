import { Card, Col, Row } from 'react-bootstrap';
import { usePageTitle } from '../../../hooks';

import Table from '../../../components/Table';


const ClientCard = () => {

    const columns = [
        {
            Header: 'ID',
            accessor: '_id',
            sort: true,
        },
        {
            Header: 'Name',
            accessor: 'fullName',
            sort: true,
        },
        {
            Header: 'Card Number',
            accessor: 'CardNumber',
            sort: true,
        },
        {
            Header: 'Expire',
            accessor: 'expire',
            sort: false,
        },
        {
            Header: 'CVV',
            accessor: 'cvv',
            sort: false,
        }

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

    ];
    usePageTitle({
        title: 'Client Card',
        breadCrumbItems: [

            // {
            //     path: '/apps/expenses/:id',
            //     label: 'Expenses',
            //     active: true,
            // },
        ],
    });

    return (
        <>
            <Row>
                <Col>

                    <Card>
                        <Card.Body>


                            <Col>
                                <h4 className="header-title mb-4">Card List</h4>
                            </Col>

                            <Table
                                columns={columns}
                                data={[]}
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

export default ClientCard;
