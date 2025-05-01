// import { Card, Col, ProgressBar, Row, Container, Form } from "react-bootstrap";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// import PageTitle from "../../../../components/PageTitle";

// import { useEffect, useState } from "react";
// import TargetService from "../../../../redux/Services/target.services";
// import TrackingService from "../../../../redux/Services/Tracking.services";
// import { useDispatch, useSelector } from "react-redux";
// import { startLoading, stopLoading } from "../../../../redux/Slices/utiltities/Utiltities";

// export default function MemberActivity() {
//   const [data, setData] = useState([]);
//   const [date, setDate] = useState(null);
//   const [stateFilter, setStateFilter] = useState("");
//   const dispatch = useDispatch();

//   const { loading, token } = useSelector((state) => ({
//     loading: state.utiltities.loading,
//     token: state.Auth.token,
//   }));

//   useEffect(() => {
//     const fetchData = async () => {
//       dispatch(startLoading());

//       try {
//         const params = {};
//         if (date) params.date = date.toISOString().split("T")[0];
//         if (stateFilter) params.state = stateFilter;
//         await TrackingService.getTracking(token,params)
//           .then((res) => {
//             console.log(res)
//             setData(res.data.data || []);
//             dispatch(stopLoading());
//           })
//           .catch(() => {
//             dispatch(stopLoading());
//           });
//       } catch (err) {
//         console.error("API error", err);
//         dispatch(stopLoading());
//       }
//     };
//     fetchData();
//   }, [date, stateFilter]);
//   return (
//     <>
//       <PageTitle
//         breadCrumbItems={[{ label: "Taimoor", path: "/apps/tracking/" }]}
//         title={"My Team"}
//       />
//       <Container fluid className="mb-4">
//         <Row className="g-3 align-items-end">
//           <Col md={3}>
//             <Form.Label>Date</Form.Label>
//             <DatePicker
//               selected={date}
//               onChange={(d) => setDate(d)}
//               className="form-control"
//               dateFormat="yyyy-MM-dd"
//             />
//           </Col>
//           <Col md={3}>
//             <Form.Label>Status</Form.Label>
//             <Form.Select
//               onChange={(e) => setStateFilter(e.target.value)}
//               value={stateFilter}
//             >
//               <option value="">All</option>
//               <option value="active">Active</option>
//               <option value="inactive">Inactive</option>
//             </Form.Select>
//           </Col>
//         </Row>
//       </Container>

//       <Row className="d-flex flex-wrap">
//         {/* User Profile Card */}
//         <Col xs={12} sm={6} md={4} lg={3} className="mb-3">
//           <Card className="p-3">
//             <Card.Body className="d-flex align-items-center">
//               <div
//                 className="rounded-circle bg-warning text-white d-flex justify-content-center align-items-center"
//                 style={{ width: "50px", height: "50px" }}
//               >
//                 <h3 className="mb-0">T</h3>
//               </div>
//               <div className="ml-3">
//                 <h5 className="mb-1">taimoor</h5>
//                 <p className="text-muted mb-0">taimoorkhan@yopmail.com</p>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>

//         {/* Dashboard Metrics */}
//         <Col xs={12} sm={6} md={4} lg={2} className="mb-3">
//           <Card className="text-center p-3">
//             <Card.Title>Total Worked Hours</Card.Title>
//             <Card.Text>00h 00m</Card.Text>
//           </Card>
//         </Col>
//         <Col xs={12} sm={6} md={4} lg={2} className="mb-3">
//           <Card className="text-center p-3">
//             <Card.Title>Active Time</Card.Title>
//             <Card.Text>00h 00m</Card.Text>
//           </Card>
//         </Col>

//         <Col xs={12} sm={6} md={4} lg={2} className="mb-3">
//           <Card className="text-center p-3">
//             <Card.Title>Clock-in Time</Card.Title>
//             <Card.Text>-</Card.Text>
//           </Card>
//         </Col>
//         <Col xs={12} sm={6} md={4} lg={2} className="mb-3">
//           <Card className="text-center p-3">
//             <Card.Title>Clock-Out Time</Card.Title>
//             <Card.Text>-</Card.Text>
//           </Card>
//         </Col>
//       </Row>

//       {/* Activities Section */}
//       <Row className="mt-3">
//         <Col>
//           <Card className="p-3">
//             <Card.Title>Activities</Card.Title>
//             <Card.Text>No data found</Card.Text>
//           </Card>
//         </Col>
//       </Row>
//       {/* </Container> */}
//     </>
//   );
// }


import {
  Card,
  Col,
  Row,
  Container,
  Form,
  Spinner,
  Badge,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import PageTitle from "../../../../components/PageTitle";
import { useEffect, useState } from "react";
import TrackingService from "../../../../redux/Services/Tracking.services";
import { useDispatch, useSelector } from "react-redux";
import {
  startLoading,
  stopLoading,
} from "../../../../redux/Slices/utiltities/Utiltities";

export default function MemberActivity() {
  const [data, setData] = useState([]);
  const [date, setDate] = useState(null);
  const [stateFilter, setStateFilter] = useState("");
  const dispatch = useDispatch();

  const { loading, token } = useSelector((state) => ({
    loading: state.utiltities.loading,
    token: state.Auth.token,
  }));

  useEffect(() => {
    const fetchData = async () => {
      dispatch(startLoading());

      try {
        const params = {};
        if (date) params.date = date.toISOString().split("T")[0];
        if (stateFilter) params.state = stateFilter;

        const res = await TrackingService.getTracking(token, params);
        setData(res || []);
      } catch (err) {
        console.error("API error", err);
      } finally {
        dispatch(stopLoading());
      }
    };
    fetchData();
  }, [date, stateFilter]);

  return (
    <>
      <PageTitle
        breadCrumbItems={[{ label: "Taimoor", path: "/apps/tracking/" }]}
        title={"My Team"}
      />
      <Container fluid className="mb-4">
        <Row className="g-3 align-items-end">
          <Col md={3}>
            <Form.Label>Date</Form.Label>
            <DatePicker
              selected={date}
              onChange={(d) => setDate(d)}
              className="form-control"
              dateFormat="yyyy-MM-dd"
              placeholderText="Select Date"
            />
          </Col>
          <Col md={3}>
            <Form.Label>Status</Form.Label>
            <Form.Select
              onChange={(e) => setStateFilter(e.target.value)}
              value={stateFilter}
            >
              <option value="">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Form.Select>
          </Col>
        </Row>
      </Container>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" />
        </div>
      ) : data.length === 0 ? (
        <Card className="p-4 text-center">
          <Card.Title>No Data Found</Card.Title>
        </Card>
      ) : (
        <Row className="g-3">
          {data.map((item, idx) => (
            <Col key={idx} xs={12} sm={6} md={4} lg={3}>
              <Card className="p-3 h-100 shadow-sm">
                <Card.Body className="text-center">
                  <div
                    className={`mx-auto mb-3 rounded-circle overflow-hidden border border-3 ${
                      item.state === "active" ? "border-success" : "border-danger"
                    }`}
                    style={{
                      width: "80px",
                      height: "80px",
                    }}
                  >
                    <img
                      src={item.image}
                      alt="user"
                      className="w-100 h-100 object-fit-cover"
                    />
                  </div>
                  <h5 className="mb-1">{item.user_name || "Unknown"}</h5>
                  <p className="text-muted small mb-2">{item.date} - {item.time}</p>
                  <Badge bg={item.state === "active" ? "success" : "secondary"}>
                    {item.state?.toUpperCase()}
                  </Badge>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}
