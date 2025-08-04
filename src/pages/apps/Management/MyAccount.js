import { useState, useEffect, useRef } from "react";
import PageTitle from "../../../components/PageTitle";
import { Button, Card, Col, Container, InputGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import Calendar from "../../../components/Calendar";
import { attendance } from "../../../redux/Slices/attendance/Attendance";
import moment from "moment";
import { CONSTANTS } from "../../../constants/constant";
import { FormInput } from "../../../components";
import { toast } from "react-toastify";
import { UpdateEmployee } from "../../../redux/Slices/employee/Employee";
import Spinner from "../../../components/Spinner";
import authService from "../../../redux/Services/auth.services";
import { loginUser } from "../../../redux/Slices/auth/Auth";

export default function MyAccount() {
  const user = useSelector((state) => state.Auth.user);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(user?.profile_img || "");
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { token } = useSelector((state) => ({
    token: state.Auth.token,
  }));
  console.log("user?.profile_imguser?.profile_img", user?.profile_img);

  //   useEffect(() => {
  //     dispatch(attendance(token));
  //   }, []);
  const handleImageError = (event) => {
    // Fallback to the default image URL
    event.target.src = CONSTANTS.API_URLS.AVATAR_IMAGE_URL;
  };
  const defaultEvents = [
    {
      id: "1",
      title: "Must neet to serve 8 hours ",
      start: new Date(),
      className: "bg-success",
    },

    {
      id: "2",
      title: "Meeting with John Deo",
      start: new Date().setDate(new Date().getDate() + 2),
      end: new Date().setDate(new Date().getDate() + 4),
      className: "bg-warning",
    },
    {
      id: "3",
      title: "Buy a Theme",
      start: new Date().setDate(new Date().getDate() + 4),
      end: new Date().setDate(new Date().getDate() + 5),
      className: "bg-primary",
    },
  ];
  const [events, setEvents] = useState([...defaultEvents]);
  const [eventData, setEventData] = useState({});
  const [dateInfo, setDateInfo] = useState({});

  /*
    calendar events
    */
  // on date click
  const onDateClick = (arg) => {
    console.log("date click", arg);
    setDateInfo(arg);
  };

  // on event click
  const onEventClick = (arg) => {
    const event = {
      id: String(arg.event.id),
      title: arg.event.title,
      className: arg.event.classNames[0],
    };
    console.log("event click", event);
    setEventData(event);
  };

  // on drop
  const onDrop = (arg) => {
    const dropEventData = arg;
    const title = dropEventData.draggedEl.title;
    if (title == null) {
    } else {
      let newEvent = {
        id: String(events.length + 1),
        title: title,
        start: dropEventData ? dropEventData.dateStr : new Date(),
        className: dropEventData.draggedEl.attributes["data-class"]["value"],
      };
      const modifiedEvents = [...events];
      modifiedEvents.push(newEvent);

      setEvents(modifiedEvents);
    }
  };
  //   ============================update password====================
  const submitUpdatepassword = async () => {
    try {
      if (password !== confirmPassword) {
        toast.error("Password and Confirm Password do not match", {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
      setLoading(true);
      const formData = new FormData();
      formData.append("password", password);
      await dispatch(UpdateEmployee(user?.user_id, formData, token));
      setPassword("");
      setConfirmPassword("");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //   ============================update Profile====================
  const updateProfileImage = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("profile_img", profilePic);
      await dispatch(UpdateEmployee(user?.user_id, formData, token));
      await dispatch(
        authService
          .getProfile(token)
          .then(async (res) => {
            await dispatch(loginUser(res?.data));
          })
          .catch((err) => console.log("error: ", err))
      );

      setProfilePic(null);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!profilePic) {
      setPreview(user?.profile_img || "");
    }
  }, [user, profilePic]);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleSelectedImage = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setProfilePic(file);
    setPreview(URL.createObjectURL(file));
  };

  /**
   * on event drop
   */
  const onEventDrop = () => {
    const modifiedEvents = [...events];
    // const idx = modifiedEvents.findIndex( ( e ) => e["id"] === eventData.id );
    // modifiedEvents[idx]["title"] = eventData.title;
    // modifiedEvents[idx]["className"] = eventData.classNames;
    // modifiedEvents[idx]["start"] = eventData.start;
    // modifiedEvents[idx]["end"] = eventData.end;
    setEvents(modifiedEvents);
  };

  const SidePanel = () => {
    // external events
    const externalEvents = [
      {
        id: 1,
        className: "bg-success",
        title: "Must need to server 8 hours daily",
      },

      {
        id: 2,
        className: "bg-warning",
        title: "If server less then 7 hours count hald day",
      },
      {
        id: 4,
        className: "bg-danger",
        title: "If server less then 4.5 hours count off day",
      },
    ];

    return (
      <>
        <div id="external-events">
          <br />

          {/* external events */}
          {(externalEvents || []).map((event, index) => {
            return (
              <div
                key={index}
                className={classNames("external-event", event.className)}
                title={event.title}
                data-class={event.className}
              >
                <i className="mdi mdi-checkbox-blank-circle me-2 vertical-middle"></i>
                {event.title}
              </div>
            );
          })}
        </div>

        <div className="mt-5 d-none d-xl-block">
          <h5 className="text-center">How It Works ?</h5>

          <ul className="ps-3">
            <li className="text-muted mb-3">
              It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </li>
            <li className="text-muted mb-3">
              Richard McClintock, a Latin professor at Hampden-Sydney College in
              Virginia, looked up one of the more obscure Latin words,
              consectetur, from a Lorem Ipsum passage.
            </li>
            <li className="text-muted mb-3">
              It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </li>
          </ul>
        </div>
      </>
    );
  };

  return loading ? (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Spinner className="m-2" color={"primary"} />
    </div>
  ) : (
    <>
      <PageTitle title={"My Account"} />
      <Card>
        <Card.Body>
          <div className=" d-flex flex-column align-items-start mb-3">
            <div style={{ display: "inline-block", textAlign: "center" }}>
              <div
                onClick={handleClick}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  overflow: "hidden",
                  cursor: "pointer",
                  marginBottom: 10,
                  border: "2px solid #ccc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#f5f5f5",
                }}
                title="Click to change"
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Profile"
                    onError={handleImageError}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div style={{ fontSize: 12, color: "#666" }}>Pick Image</div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                ref={inputRef}
                style={{ display: "none" }}
                onChange={handleSelectedImage}
              />
            </div>
            {profilePic && (
              <Button onClick={updateProfileImage} variant="success">
                Save
              </Button>
            )}
          </div>

          <Row>
            <Col lg={6}>
              <label className="form-label bold">
                <span className="fw-bold text-dark"> Name:</span> {user?.name}
              </label>{" "}
              <br />
            </Col>
            <Col lg={6}>
              <label className="form-label">
                {" "}
                <span className="fw-bold text-dark"> Father Name:</span>{" "}
                {user?.father_name}
              </label>{" "}
              <br />
            </Col>
          </Row>

          <Row>
            <Col lg={6}>
              <label className="form-label">
                <span className="fw-bold text-dark"> Email:</span>{" "}
                {user?.company_provided_email}{" "}
              </label>{" "}
              <br />
            </Col>
            <Col lg={6}>
              <label className="form-label">
                {" "}
                <span className="fw-bold text-dark"> Date of Birth:</span>{" "}
                {moment(user?.dob).format("MMM-Do-YYYY")}
              </label>{" "}
              <br />
            </Col>
          </Row>
          <Row>
            <Col lg={6}>
              <label className="form-label">
                {" "}
                <span className="fw-bold text-dark"> Joining Date:</span>{" "}
                {user?.joining_date}
              </label>{" "}
              <br />
            </Col>
            <Col lg={6}>
              <label className="form-label">
                <span className="fw-bold text-dark"> Designation: </span>
                {user?.designation}
              </label>{" "}
              <br />
            </Col>
          </Row>
          <Row>
            <Col lg={6}>
              <label className="form-label">
                <span className="fw-bold text-dark"> Employment Type: </span>
                {user?.employmentType}
              </label>{" "}
              <br />
            </Col>
            <Col lg={6}>
              <label className="form-label">
                <span className="fw-bold text-dark"> CNIC No:</span>{" "}
                {user?.cnic_no}
              </label>{" "}
              <br />
            </Col>
          </Row>
          <Row>
            <Col lg={6}>
              <label className="form-label">
                <span className="fw-bold text-dark"> Phone no:</span> +
                {user?.phone_no}
              </label>{" "}
              <br />
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <h3 className="text-decoration-underline">Update Password</h3>
          <Row>
            <Col lg={6}>
              <FormInput
                label="Password"
                type="password"
                name="Password"
                placeholder="Password"
                containerClass={"mb-3"}
                key="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Col>
            <Col lg={6}>
              <FormInput
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                containerClass={"mb-3"}
                key="text"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Col>
          </Row>
          <div className="text-end">
            <Button onClick={submitUpdatepassword} variant="success">
              Update Password
            </Button>
          </div>
        </Card.Body>
      </Card>
      {/* <PageTitle title={"Attendance"} />
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Row>
                <Col lg={3}>
                  <SidePanel />
                </Col>
                <Col lg={9}>
                  <Calendar
                    onDateClick={onDateClick}
                    onEventClick={onEventClick}
                    onDrop={onDrop}
                    onEventDrop={onEventDrop}
                    events={events}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row> */}
    </>
  );
}
