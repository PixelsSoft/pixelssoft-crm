import { Button, Card, Col, Row } from "react-bootstrap";
import Table from "../../../components/Table";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import Spinner from "../../../components/Spinner";
import PageTitle from "../../../components/PageTitle";
import { GetCommission } from "../../../redux/Slices/Commission/Commission";
import moment from "moment";
import ReactDatePicker from "react-datepicker";

const Commissions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [item, setItem] = useState();
  const [data, setData] = useState([]);
  const [editUserModal, setEditUserModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment().format("yyyy-MM"));
  const [formatDate, setFormatDate] = useState(new Date());

  const { token } = useSelector((state) => ({
    token: state.Auth.token,
  }));
  const handleDateChange = (date) => {
    if (!isNaN(date)) {
      const formattedDate = moment(date).format("yyyy-MM");
      setSelectedDate(formattedDate);
      setFormatDate(date);
    } else {
      console.error("Invalid date:", date);
    }
  };

  const sizePerPageList = [
    {
      text: "5",
      value: 5,
    },
    {
      text: "10",
      value: 10,
    },
    {
      text: "25",
      value: 25,
    },
    {
      text: "All",
      value: data?.length,
    },
  ];

  const getCommissionByAPiCall = async () => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("month", selectedDate);
      const response = await dispatch(GetCommission(token, formData));
      setData(response?.data);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getCommissionByAPiCall();
  }, [selectedDate]);

  const ActionColumn = ({ user_id, item }) => {
    return (
      <React.Fragment>
        <Link to={`/apps/commission/${user_id}`} className="action-icon">
          {" "}
          <i className="mdi mdi-eye"></i>
        </Link>
      </React.Fragment>
    );
  };

  const columns = [
    {
      Header: "ID",
      accessor: "user_id",
      sort: true,
    },
    {
      Header: "Name",
      accessor: "name",
      sort: true,
    },
    {
      Header: "Commission",
      accessor: "commission",
      sort: true,
    },
    {
      Header: "Month",
      accessor: "month",
      sort: false,
    },
    {
      Header: "Total sales",
      accessor: "total_sales",
      sort: false,
    },
    {
      Header: "Commission rate",
      accessor: "commission_rate",
      sort: false,
    },

    {
      Header: "Action",
      accessor: "action",
      sort: false,
      Cell: ({ row }) => (
        <ActionColumn item={row?.original} user_id={row.original.user_id} />
      ),
    },
  ];

  return loading ? (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Spinner className="m-2" color={"primary"} />
    </div>
  ) : (
    <>
      <PageTitle
        breadCrumbItems={[{ label: "Commission", path: "/apps/commission" }]}
        title={"Commission"}
      />
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Row>
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
              </Row>
              {/* <Row>
                                <Col sm={4}>
                                    <Button
                                        onClick={() => {
                                            navigate("/apps/customer/addCustomer")
                                        }}
                                        className="btn btn-danger mb-2">
                                        <i className="mdi mdi-plus-circle me-2"></i> Add Customer
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
                            </Row> */}

              <Table
                columns={columns}
                data={data || []}
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
};

export default Commissions;
