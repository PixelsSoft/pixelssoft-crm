import { useEffect, useState } from "react";
import PageTitle from "../../../components/PageTitle";
import { Row, Col, Button, Card, Form } from "react-bootstrap";
import { FormInput } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { GetReport } from "../../../redux/Slices/Report/report";
import {
  startLoading,
  stopLoading,
} from "../../../redux/Slices/utiltities/Utiltities";
import Spinner from "../../../components/Spinner";
import { toast } from "react-toastify";

const Report = () => {
  const [startDate, setStartData] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState("");
  const dispatch = useDispatch();

  const { loading, token } = useSelector((state) => ({
    loading: state.utiltities.loading,
    token: state.Auth.token,
  }));
  const getReport = async () => {
    try {
      await dispatch(startLoading());
      const params={
        start_date:startDate,
        end_date:endDate
    }
      const response = await dispatch(GetReport(token,params));
      setData(response);
      await dispatch(stopLoading());
    } catch (error) {
      dispatch(stopLoading());
    }
  };
  const filterReport = async () => {
    try {
      await dispatch(startLoading());
      if(startDate!=="" && endDate!=='' ){
        const params={
            start_date:startDate,
            end_date:endDate
        }
        const response = await dispatch(GetReport(token, params));
       
        setData(response);
      }else{
        toast.error("Please select both Date", { position: toast.POSITION.TOP_RIGHT })
      }

     
   
      await dispatch(stopLoading());
    } catch (error) {
      dispatch(stopLoading());
    }
  };

  useEffect(() => {
    getReport();
  }, []);

  return loading ? (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Spinner className="m-2" color={"primary"} />
    </div>
  ) : (
    <>
      <PageTitle title={"Reports"} />
      <Card>
        <Card.Body>
          <Row>
            <Col md={6} xl={3}>
              <FormInput
                label="Start Date"
                type="date"
                name="date"
                containerClass={"mb-3"}
                key="date"
                value={startDate}
                onChange={(e) => setStartData(e.target.value)}
              />
            </Col>
            <Col md={6} xl={3}>
              <FormInput
                label="End Date"
                type="date"
                name="date"
                containerClass={"mb-3"}
                key="date"
                value={endDate}
                onChange={(e) =>
                   {
                    console.log(e.target.value)
                    setEndDate(e.target.value)
                }
                }
              />
            </Col>
            <Col md={6} xl={3}>
              <Button 
              onClick={filterReport}
              className="rounded-pill mt-3" type="button">
                Filter
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          {/* <Row>
                        <Col md={6} xl={3}>
                            <Form.Label>Start Date: </Form.Label>
                            <Form.Label> 17-10-2023</Form.Label>
                        </Col>
                        <Col md={6} xl={3}>
                            <Form.Label>End Date: </Form.Label>
                            <Form.Label> 17-10-2023</Form.Label>
                        </Col>
                    </Row> */}
          <Row>
            <Col md={6} xl={4}>
              <Form.Label>Sales</Form.Label>
            </Col>
            <Col md={6} xl={4}>
              <Form.Label>Expenditure</Form.Label>
            </Col>
            <Col md={6} xl={4}>
              <Form.Label>Net Profit</Form.Label>
            </Col>
          </Row>
          <Row>
            <Col md={6} xl={4}>
              <h1 className="display-6 d-flex justify-content-end">
                {data?.total_sales || 0}
              </h1>
            </Col>
            <Col md={6} xl={4}>
              <h1 className="display-6 d-flex justify-content-end">
                {data?.total_expense || 0}
              </h1>
            </Col>
            <Col md={6} xl={4}>
              <h1 className="display-6 d-flex justify-content-end">
                {data?.net_profit || 0}
              </h1>
            </Col>
          </Row>
          <br />
          <br />
          <br />
          <Row className="d-flex justify-content-center">
            <Col md={4} xl={4}>
              <hr />
            </Col>
            <Col md={4} xl={2}>
              <p className="header-title mt-2 d-flex justify-content-center">
                Summary
              </p>
            </Col>
            <Col md={4} xl={4}>
              <hr />
            </Col>
          </Row>
          {/* <Row className="d-flex justify-content-center">
            <Col xl={8}>
              <div className="d-flex justify-content-between">
                <Form.Label>Lead Projects</Form.Label>
                <Form.Label>100,000</Form.Label>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <Form.Label>Projects</Form.Label>
                <Form.Label>25,000</Form.Label>
              </div>
              <hr />
            </Col>
          </Row> */}
          <Row className="d-flex justify-content-center">
            <Col xl={8}>
              <h4>Expences</h4>
              {(data?.expense_by_category || []).map((item) => {
                return (
                  <>
                    <div className="d-flex justify-content-between">
                      <Form.Label>{item?.title}</Form.Label>
                      <Form.Label>${item?.amount}</Form.Label>
                    </div>
                    <hr />
                  </>
                );
              })}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default Report;
