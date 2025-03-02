import { Button, Card, Col, Row } from 'react-bootstrap';
import Table from '../../../components/Table';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import PageTitle from '../../../components/PageTitle';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../../components/Spinner';
import ReactDatePicker from "react-datepicker";
import { startLoading, stopLoading } from '../../../redux/Slices/utiltities/Utiltities';
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { getSales } from '../../../redux/Slices/sales/Sales';

const Sales = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
     const [selectedDate, setSelectedDate] = useState(moment().format("yyyy-MM"));
     const [formatDate, setFormatDate] = useState(new Date());
     const [totalSales, setTotalSales] = useState(0);
    const [data, setData] = useState();
   

    const { customer, loading, token ,roles} = useSelector(
        (state) => ({
            customer: state.Customer.customer,
            loading: state.utiltities.loading,
            token: state.Auth.token,
    roles: state.Roles.roles,

        })
    );
const [hasSuperAdmin, sethasSuperAdmin] = useState(
    roles[0]?.role
      .split(",")
      .some((role) => role === "SuperAdmin" || role === "Sales Manager") || ""
  );
const gettingSales = async () => {
    try {
      dispatch(startLoading());
      const response=await dispatch(getSales(token));
      const totalReceivedAmount = (response?.data||[]).reduce((total, sale) => {
        // Convert received_amount to a number (if it's not null)
        const receivedAmount = parseFloat(sale.received_amount) || 0;
        return total + receivedAmount;
    }, 0);
    setTotalSales(totalReceivedAmount)
      setData(response?.data||[])
      dispatch(stopLoading());
    } catch (error) {
      dispatch(stopLoading());
    }
  };
  useEffect(() => {
    gettingSales();
  }, []);
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
            value: customer?.length,
        },
    ];

   
  const handleDateChange = async(date) => {
    if (!isNaN(date)) {
      dispatch(startLoading());

      const formattedDate = moment(date).format("yyyy-MM");
      
      setSelectedDate(formattedDate);
      const response=await dispatch(getSales(token,formattedDate));
      const totalReceivedAmount = (response?.data||[]).reduce((total, sale) => {
        // Convert received_amount to a number (if it's not null)
        const receivedAmount = parseFloat(sale.received_amount) || 0;
        return total + receivedAmount;
    }, 0);
    setTotalSales(totalReceivedAmount)
      setData(response?.data||[])
      dispatch(stopLoading());

      setFormatDate(date);
    } else {
      console.error("Invalid date:", date);
    }
  };
  

  
    const columns = [
        {
            Header: 'ID',
            accessor: 'id',
            sort: true,
        },
        {
            Header: 'Sales Name',
            accessor: 'user_name',
            sort: true,
        },
        {
            Header: 'Project Name',
            accessor: 'project_name',
            sort: true,
        },
        {
            Header: 'Date',
            accessor: 'date',
            sort: false,
        },
        {
            Header: 'Amount',
            accessor: 'amount',
            sort: false,
        },
        {
            Header: 'Received Amount ',
            accessor: 'received_amount',
            sort: false,
        },
    ];

    return loading ? (
     <div className="d-flex justify-content-center align-items-center vh-100">
          <Spinner className="m-2" color={"primary"} />
        </div>
    ) : (
        <>
            <PageTitle
              
                title={"Sales"}
            />
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Row style={{alignItems:"center"}}>
                                {/* <Col sm={4}>
                                    <Button
                                        onClick={() => {
                                            navigate("/apps/sales/addCustomer")
                                        }}
                                        className="btn btn-danger mb-2">
                                        <i className="mdi mdi-plus-circle me-2"></i> Add Customer
                                    </Button>
                                </Col> */}
                                  
                                                <Col lg={2} style={{ alignSelf: "flex-end" }}>
                                                  <label className="form-label">Select Month</label>
                                                  <ReactDatePicker
                                                    selected={formatDate}
                                                    onChange={handleDateChange}
                                                    dateFormat="yyyy-MM"
                                                    showMonthYearPicker
                                                    className="form-control"
                                                    autoComplete="off"
                                                    withPortal
                                                    showPopperArrow={false}
                                                  />
                                                </Col>
                                          

                                <Col sm={8}>
                              
                                    <div className="text-sm-end">
                                      <h3>Total Sales: {totalSales}$ </h3>  
                                       
                                        {/* <Button className="btn btn-success mb-2 me-1">
                                            <i className="mdi mdi-cog-outline"></i>
                                        </Button>

                                        <Button className="btn btn-light mb-2 me-1">Import</Button>

                                        <Button className="btn btn-light mb-2">Export</Button> */}
                                    </div>
                                </Col>
                            </Row>
                            {data !== undefined && data !== null ? (
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
                            ) : null}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            
        </>
    );
};

export default Sales;
