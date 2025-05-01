import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import FancyText from '@carefully-coded/react-text-gradient';
// components
import HyperDatepicker from "../../../components/Datepicker";

import Statistics from "./Statistics";
import RevenueChart from "./RevenueChart";
import SalesAnalyticsChart from "./SalesAnalyticsChart";
import UsersBalances from "./UsersBalances";
import RevenueHistory from "./RevenueHistory";
import './dashboard.css';
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
  const [admin, setAdmin] = useState(false);
  const [data, setData] = useState();
  const [quote, setQuote] = useState('');
  const dispatch = useDispatch();
  const { loading, token, user } = useSelector((state) => ({
    loading: state.utiltities.loading,
    token: state.Auth.token,
    user: state.Auth.user,
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
        .then(async(response) => {
          
          if (response?.status === 403) {
            getQoute()
            setAdmin(false);


          } else {
            setAdmin(true);
            setData(response?.data);
          }
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

const getQoute=async()=>{
  try {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    dispatch(startLoading());
    await fetch("https://api.realinspire.live/v1/quotes/random", requestOptions)
      .then((response) => response.json())
      .then((result) => setQuote(result))
      .catch((error) => console.error(error))
      .finally(() => {
        dispatch(stopLoading());
      });
    
    
  } catch (error) {
    console.log("error on getting Quotes", error)
  }
}

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
};




  return loading ? (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Spinner className="m-2" color={"primary"} />
    </div>
  ) : (
    <>
     
      {admin===true ? (
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
          <Statistics data={data} />

          <Row>
            {/* <Col lg={4}>
    <RevenueChart data={data}/>
  </Col> */}
            <Col lg={12}>
              <SalesAnalyticsChart data={data} />
            </Col>
          </Row>

          <Row>
            {/* <Col xl={6}>
    <UsersBalances balances={balances} />
  </Col> */}
            <Col xl={12}>
              <RevenueHistory data={data} />
            </Col>
          </Row>
        </>
      ):
      <Card
            className="home-screen"
            style={{
                marginTop: '20px',
                width: '100%',
                height: '80vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                background: 'linear-gradient(135deg,rgb(22, 160, 133),rgb(5, 43, 17))',
                color: '#fff',
                borderRadius: '15px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
            }}
        >
            {/* Animated Background */}
            <div className="animated-background"></div>

            {/* Welcome Message */}
            <div className="welcome-message" style={{ textAlign: 'center', zIndex: 1 }}>
                <FancyText
                    gradient={{ from: '#E9EFEC', to: '#C4DAD2 ', type: 'linear' }}
                    animateTo={{ from: '#C4DAD2', to: '#6A9C89' }}
                    animateDuration={2000}
                >
                    <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>
                        {getGreeting()}, {user?.name}!
                    </h1>
                </FancyText>
                <p style={{ fontSize: '1.5rem', opacity: 0.8 }}>
                    Welcome to Pixels Soft Dashboard
                </p>
                <p style={{ fontSize: '1.2rem', opacity: 0.7 }}>
                  {quote[0]?.content}
                </p>
                <p style={{ fontSize: '1.2rem', opacity: 0.7 }}>
                “{quote[0]?.author}“
                </p>
            </div>

            {/* Decorative Icons */}
            <div className="decorative-icons">
                <span role="img" aria-label="star" style={{ fontSize: '2rem', margin: '0 10px' }}>
                    ⭐
                </span>
                <span role="img" aria-label="rocket" style={{ fontSize: '2rem', margin: '0 10px' }}>
                    🚀
                </span>
                <span role="img" aria-label="chart" style={{ fontSize: '2rem', margin: '0 10px' }}>
                    📊
                </span>
            </div>
        </Card> }
    </>
  );
};

export default Dashboard1;
