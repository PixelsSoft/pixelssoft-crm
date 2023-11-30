import { useEffect, useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { Navigate, Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";


// actions
import { login } from "../../redux/Slices/auth/Auth";

// store
import { RootState, AppDispatch } from "../../redux/store";

// components
import { FormInput } from "../../components";

import AuthLayout from "./AuthLayout";
import { startLoading, stopLoading } from "../../redux/Slices/utiltities/Utiltities";
import Spinner from "../../components/Spinner";


interface UserData {
    username: string;
    password: string;
}

/* bottom links */
const BottomLink = () => {
    const { t } = useTranslation();

    return (
        <Row className="mt-3">
            <Col className="text-center">
                <p>
                    <Link to={"/auth/forget-password"} className="text-white-50 ms-1">
                        {t("Forgot your password?")}
                    </Link>
                </p>
                <p className="text-white-50">
                    {t("Don't have an account?")}{" "}
                    <Link to={"/auth/register"} className="text-white ms-1">
                        <b>{t("Sign Up")}</b>
                    </Link>
                </p>
            </Col>
        </Row>
    );
};



const Login = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();
    const [email, setEmail] = useState("info@admin.com")
    const [password, setPassword] = useState("demo1234")


    const { token, loading } = useSelector(
        (state: RootState) => ({
            token: state.Auth.user,
            loading: state.utiltities.loading,
        })
    );

    /*
    handle form submission
    */
    const onSubmit = async () => {
        const params = {
            email: email,
            password: password
        }
        dispatch(startLoading())
        await dispatch(login(params)).then(() => {
            dispatch(stopLoading())
        }).catch(() => {
            dispatch(stopLoading())
        })
    };
    const location = useLocation();
    //
    // const redirectUrl = location.state && location.state.from ? location.state.from.pathname : '/';
    const redirectUrl = location?.search?.slice(6) || "/";

    return (

        <>
            {(token) && <Navigate to={redirectUrl}></Navigate>}


            <AuthLayout
                helpText={t(
                    "Enter your email address and password to access admin panel."
                )}
                bottomLinks={<BottomLink />}
            >

                <FormInput
                    label={t("Email")}
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                    type="text"
                    name="email"
                    placeholder="Enter your Username"
                    containerClass={"mb-3"}
                />

                <FormInput
                    label={'Password'}
                    type="password"
                    value={password}
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    containerClass={'mb-3'}></FormInput>


                <div className="text-center d-grid ">
                    {loading ?
                        <div className="text-center d-grid d-flex justify-content-center">
                            <Spinner
                                size={"md"}
                                color="blue" />
                        </div>
                        :
                        <Button variant="primary" type="submit"
                            // disabled={loading}
                            onClick={onSubmit}
                        >
                            {t("Log In")}
                        </Button>}
                </div>



            </AuthLayout>





        </>
    );
};

export default Login;
