import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";

// components
import HyperDatepicker from "../../../components/Datepicker";

import Statistics from "./Statistics";
import RevenueChart from "./RevenueChart";
import SalesAnalyticsChart from "./SalesAnalyticsChart";
import UsersBalances from "./UsersBalances";
import RevenueHistory from "./RevenueHistory";

import { balances, revenueHistory } from "./data";
import axios from "axios";
import { CONSTANTS } from "../../../constants/constant";
import { useDispatch, useSelector } from "react-redux";
import {
  startLoading,
  stopLoading,
} from "../../../redux/Slices/utiltities/Utiltities";
import Spinner from "../../../components/Spinner";

const Dashboard1 = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [data, setData] = useState();
  
  const dispatch = useDispatch();
  const { loading, token, project } = useSelector((state) => ({
    loading: state.utiltities.loading,
    token: state.Auth.token,
    project: state.Projects.project,
  }));

  /*
   * handle date change
   */
  const onDateChange = (date) => {
    if (date) {
      setSelectedDate(date);
    }
  };
  const fatchData = async () => {
    try {
      dispatch(startLoading());
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await fetch(
        CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.Dashboard,
        options
      )
        .then((response) => {
          if (!response.ok) {
            return response.json().then((err) => {
              console.log(err);
            });
          }
          return response.json();
        })
        .then((response) => {
          setData(response?.data)
        })
        .catch((err) => console.log(err))
        .finally(() => {
          dispatch(stopLoading());
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fatchData();
  }, []);

  return loading ? (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Spinner className="m-2" color={"primary"} />
    </div>
  ) : (
    <>
      <Row>
        <Col>
          <div className="page-title-box">
            <div className="page-title-right">
              <form className="d-flex align-items-center mb-3">
                <div className="input-group input-group-sm">
                  <HyperDatepicker
                    value={selectedDate}
                    inputClass="border"
                    onChange={(date) => {
                      onDateChange(date);
                    }}
                  />
                </div>
                <button className="btn btn-blue btn-sm ms-2">
                  <i className="mdi mdi-autorenew"></i>
                </button>
                <button className="btn btn-blue btn-sm ms-1">
                  <i className="mdi mdi-filter-variant"></i>
                </button>
              </form>
            </div>
            <h4 className="page-title">Dashboard</h4>
          </div>
        </Col>
      </Row>

      <Statistics   data={data}/>

      <Row>
        {/* <Col lg={4}>
          <RevenueChart data={data}/>
        </Col> */}
        <Col lg={12}>
          <SalesAnalyticsChart  data={data} />
        </Col>
      </Row>

      <Row>
        {/* <Col xl={6}>
          <UsersBalances balances={balances} />
        </Col> */}
        <Col xl={12}>
          <RevenueHistory  data={data} />
        </Col>
      </Row>
    </>
  );
};

export default Dashboard1;
