import { Row, Col, Card } from 'react-bootstrap';
import StatisticsWidget1 from '../../../../components/StatisticsWidget1';
import { records as data } from './data';
import Table from '../../../../components/Table';
import CustomerDetailCard from '../../../../components/CustomerDetailCard';
import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetSingleCustomer } from '../../../../redux/Slices/Customer/customer';
import Spinner from '../../../../components/Spinner';
import { startLoading, stopLoading } from '../../../../redux/Slices/utiltities/Utiltities';
import classNames from 'classnames';


const CustomerProfile = () => {
    const { profileId } = useParams();
    const dispatch = useDispatch();

    const { loading, token, SingleCustomer } = useSelector(
        ( state ) => ( {
            loading: state.utiltities.loading,
            token: state.Auth.token,
            SingleCustomer: state.Customer.singleCustomer
        } )
    );
      const StatusColumn = ({ row }) => {
        return (
          <React.Fragment>
            <span
        
              className={classNames("badge", {
                "bg-soft-success text-success": row.original.status === "Paid",
                "bg-soft-danger text-danger": row.original.status === "unPaid",
              })}
            >
              {row.original.status}
            </span>
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
            Header: 'Currency',
            accessor: 'currency',
            sort: false,
        },
        {
            Header: 'Invoice Date',
            accessor: 'invoice_Date',
            sort: false,
        },
        {
            Header: 'Due Date',
            accessor: 'due_Date',
            sort: false,
        },
        {
            Header: 'Amount',
            accessor: 'price',
            sort: false,
        },
      
        {
            Header: 'Status',
            accessor: 'status',
            sort: false,
            Cell: StatusColumn,
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
    

    const getSingleProfile = async () => {
        dispatch( startLoading() );
        dispatch( GetSingleCustomer( profileId, token ) );
        dispatch( stopLoading() );
    };

    useEffect( () => {
        getSingleProfile();
    }, [profileId] );

    return loading ? (
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <Spinner className="m-2" color={'primary'} />
        </div>
    ) : (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Body className="p-3">
                            <Row className="d-flex justify-content-center">
                                <Col sm={6}>
                                    <CustomerDetailCard
                                        contact={{
                                            // avatar: avatar,
                                            // Detail: SingleCustomer?.platform,
                                            fullName: SingleCustomer?.full_name,
                                            phoneNumber: SingleCustomer?.phone,
                                            email: SingleCustomer?.email,
                                            Address: SingleCustomer?.address,
                                            profileId: profileId
                                            // company: "abc",
                                            // _createdAt: "12334"
                                        }}
                                    />
                                </Col>
                                <Col sm={6}>
                                    <StatisticsWidget1
                                        title="Total Paid Amount"
                                        color={'#10c469'}
                                        data={SingleCustomer?.invoices?.paid?.total}
                                        stats={SingleCustomer?.invoices?.paid?.details?.length||0}
                                        subTitle="Paid Invoices"
                                    />
                                    <StatisticsWidget1
                                        title="Total unPaid Amount"
                                        color={'#f05050'}
                                        data={SingleCustomer?.invoices?.unpaid?.total}
                                        stats={SingleCustomer?.invoices?.unpaid?.details?.length||0}
                                       
                                        subTitle="Unpaid Invoices"
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <h1 className="my-3">Purchase History</h1>
                                <Table
                                    columns={columns}
                                    data={SingleCustomer?.All_invoices}
                                    pageSize={5}
                                    sizePerPageList={sizePerPageList}
                                    isSortable={true}
                                    pagination={true}
                                    isSearchable={true}
                                     
                                />
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default CustomerProfile;
