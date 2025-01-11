import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import PageTitle from "../../../components/PageTitle";
import Table from "../../../components/Table";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { GetSingleTarget } from "../../../redux/Slices/Target/target";
import Spinner from "../../../components/Spinner";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function SinglePersonTarget() {
  const { user_id } = useParams();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => ({
    token: state.Auth.token,
  }));
  const [selectedDate, setSelectedDate] = useState(moment().format("yyyy-MM"));
  const [formatDate, setFormatDate] = useState(new Date());
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const columns = [
    {
      Header: "id",
      accessor: "id",
      sort: true,
    },
    {
      Header: "Date",
      accessor: "date",
      sort: false,
    },
    {
      Header: "Amount",
      accessor: "amount",
      sort: false,
    },
    {
      Header: "Project name",
      accessor: "Project",
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
      text: "10",
      value: 10,
    },
    {
      text: "20",
      value: 20,
    },
    {
      text: "35",
      value: 35,
    },
  ];

  const getData = async () => {
    setLoading(true);
    try {
      const respone = await dispatch(
        GetSingleTarget(user_id, token, selectedDate)
      );
      setData(respone);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, [selectedDate]);
  const handleDateChange = (date) => {
    if ( !isNaN(date)) { 
      const formattedDate = moment(date).format("yyyy-MM"); 
      setSelectedDate(formattedDate);
      setFormatDate(date)
  
    } else {
      console.error("Invalid date:", date); 
    }
  };
  return loading ? (
    <div className="d-flex justify-content-center align-items-center">
      <Spinner className="m-2" color={"primary"} />
    </div>
  ) : (
    <>
      <PageTitle title={`${data?.name} : Target $${data?.target}`} />
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Row>
                <Col lg={2} style={{ alignSelf: "flex-end" }}>
                  <label className="form-label">Select Month</label>
                  <DatePicker
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
                data={data?.sales || []}
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
