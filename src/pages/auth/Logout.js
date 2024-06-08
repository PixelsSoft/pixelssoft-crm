import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

//actions
import { logout } from "../../redux/Slices/auth/Auth";

import { AppDispatch, RootState } from "../../redux/store";

// components
import AuthLayout from "./AuthLayout";

const LogoutIcon = () => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 130.2 130.2"
    >
      {" "}
      <circle
        className="path circle"
        fill="none"
        stroke="#4bd396"
        strokeWidth="6"
        strokeMiterlimit="10"
        cx="65.1"
        cy="65.1"
        r="62.1"
      />{" "}
      <polyline
        className="path check"
        fill="none"
        stroke="#4bd396"
        strokeWidth="6"
        strokeLinecap="round"
        strokeMiterlimit="10"
        points="100.2,40.2 51.5,88.8 29.8,67.5 "
      />{" "}
    </svg>
  );
};

/* bottom link */
const BottomLink = () => {
  const { t } = useTranslation();
  return (
    <Row className="mt-3">
      <Col className="text-center">
        <p className="text-white-50">
          {t( "Back to" )}{" "}
          <Link to={"/auth/login"} className="text-white ms-1">
            <b>{t( "Sign In" )}</b>
          </Link>
        </p>
      </Col>
    </Row>
  );
};

const Logout = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    // Format the time as needed (e.g., 24-hour format, leading zeros)
    return `${hours}:${minutes}:${seconds}`;
  };

  useEffect( () => {
    dispatch( logout() );
    const data = {
      time: getCurrentTime()
    }
    if ( window.electron && window.electron.ipcRenderer ) {
      window.electron.ipcRenderer.send( 'logout-success', data );
    }
  }, [] );

  return (
    <>
      <AuthLayout bottomLinks={<BottomLink />}>
        <div className="text-center">
          <div className="mt-4">
            <div className="logout-checkmark">
              <LogoutIcon />
            </div>
          </div>

          <h3>{t( "See you again !" )}</h3>

          <p className="text-muted">
            {" "}
            {t( "You are now successfully sign out." )}{" "}
          </p>
        </div>
      </AuthLayout>
    </>
  );
};

export default Logout;
