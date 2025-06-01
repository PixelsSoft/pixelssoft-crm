import { Button, Card, Col, Modal, Row } from 'react-bootstrap';
import Table from '../../../../components/Table';
import PageTitle from '../../../../components/PageTitle';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { FormInput } from '../../../../components';
import CardService from '../../../../redux/Services/card.services';
import { useSelector } from 'react-redux';
import { set } from 'firebase/database';
export default function ClientCard() {
    const [data, setData] = useState([]);
    const {  token } = useSelector((state) => ({
       
        token: state.Auth.token,
      
      }));
    const fetchData =async () => {
        try {
            const data = await CardService.getCards(token)
            console.log( "data", data);
            setData(data);
        } catch (error) {
            console.log("Error fetching data:", error);
        }
    }
useEffect(() => {
  fetchData()
}, [])

    /* action column render */
    const ActionColumn = () => {

        return (
            <React.Fragment>
                <Link to="#" className="action-icon">
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
            accessor: 'id',
            sort: true,
        },
        {
            Header: 'Name',
            accessor: 'card_holder_name',
            sort: false,
        },
        {
            Header: 'Card Number',
            accessor: 'card_number',
            sort: false,
        },
      
        {
            Header: 'Expire',
            accessor: 'expire',
            sort: false,
        },
        {
            Header: 'CVC',
            accessor: 'cvv',
            sort: false,
        },
        {
            Header: 'Email',
            accessor: 'email',
            sort: false,
        },
        {
            Header: 'Phone No',
            accessor: 'phoneNo',
            sort: false,
        },
        // {
        //     Header: "Action",
        //     accessor: "action",
        //     sort: false,
        //     Cell: ActionColumn,
        // },
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

    ];


    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: "Client Card", path: "/apps/clientCard" },
                ]}
                title={"Client Card"}
            />
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            {/* <Row>


                                <Col sm={8}>
                                    <div className="text-sm-end">
                                        <Button className="btn btn-success mb-2 me-1">
                                            <i className="mdi mdi-cog-outline"></i>
                                        </Button>

                                        <Button className="btn btn-light mb-2 me-1">Import</Button>

                                        <Button className="btn btn-light mb-2">Export</Button>
                                    </div>
                                </Col>
                            </Row> */}

                            <Table
                                columns={columns}
                                data={data||[]}
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

        </>
    );
}
