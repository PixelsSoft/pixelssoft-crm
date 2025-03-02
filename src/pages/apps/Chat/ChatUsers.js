import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, Button } from "react-bootstrap";
import classnames from "classnames";
import SimpleBar from "simplebar-react";
import {  ref, onValue } from 'firebase/database';

// dummy data
import { users, ChatUser } from "./data";

import profilePic from "../../../assets/images/users/user-1.jpg";
import { useSelector } from "react-redux";
import { database } from "../../../firebase/firebase";
import { CONSTANTS } from "../../../constants/constant";


// ChatUsers
const ChatUsers = ({ onUserSelect,onNewChat }) => {
  const [user, setUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState(users[1]);
  const profile = useSelector((state) => ({
    user: state.Auth.user,
  }));
  
  const [chats, setChats] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
      getList();
      return () => {
  
      };
  }, []); 

  const getList = async () => {
    const chatRef = ref(database, `ChatList/${profile?.user?.user_id.toString()}`);
    onValue(chatRef, (dataSnapshot) => {
        let list = [];
        dataSnapshot.forEach((child) => {
            list.push({
                un_read_count: child.val()?.un_read_count,
                id: child.val()?.id,
                Last_message: child.val()?.Last_message,
                name: child.val()?.name,
                time: child.val()?.time,
                profile_img: child.val()?.profile_img,
            });
        });
        setList(list);

    });
}







  /**
   * Search the user
   * @param {*} text
   */
  const search = (text) => {
    setUser(
      text
        ? [...users].filter(
            (u) => u?.name?.toLowerCase().indexOf(text.toLowerCase()) >= 0
          )
        : [...users]
    );
  };

  /**
   * Activates the user
   * @param {*} user
   */
  const activateUser = (user) => {
    setSelectedUser(user);
    if (onUserSelect) {
      onUserSelect(user);
    }
  };
  const handleImageError = (event) => {
    // Fallback to the default image URL
    event.target.src = CONSTANTS.API_URLS.AVATAR_IMAGE_URL;
};
  return (
    <>
      <Card>
        <Card.Body>
          <div className="d-flex align-items-start mb-3">
            <img
              src={profile?.user?.profile_img||"https://cdn-icons-png.flaticon.com/512/3607/3607444.png"}
              className="me-2 rounded-circle"
              height="42"
              width="42" // Added this line to ensure a square aspect ratio
              style={{ borderRadius: "50%" }}
              onError={handleImageError}
              alt=""
            />
            <div className="w-100">
              <h5 className="mt-0 mb-0 font-15">
                <Link to="#" className="text-reset">
                  {profile?.user?.name}
                </Link>
              </h5>
              <p className="mt-1 mb-0 text-muted font-14">
                <small className="mdi mdi-circle text-success"></small> Online
              </p>
            </div>
            <Link to="#" className="text-reset font-20">
              <i className="mdi mdi-cog-outline"></i>
            </Link>
          </div>

          <form className="search-bar mb-3">
            <div className="position-relative">
              <input
                type="text"
                className="form-control form-control-light"
                placeholder="People, groups & messages..."
                onKeyUp={(e) => search(e.target.value)}
              />
              <span className="mdi mdi-magnify"></span>
            </div>
          </form>
          <Button
            onClick={onNewChat}
            variant={"success"}
            className="waves-effect waves-light  "
          >
            New Chat
          </Button>
          <h6 className="font-13 text-muted text-uppercase">Group Chats</h6>
          <div className="p-2">
            <Link to="#" className="text-reset mb-2 d-block">
              <i className="mdi mdi-checkbox-blank-circle-outline me-1 text-success"></i>
              <span className="mb-0 mt-1">App Development</span>
            </Link>

            <Link to="#" className="text-reset mb-2 d-block">
              <i className="mdi mdi-checkbox-blank-circle-outline me-1 text-warning"></i>
              <span className="mb-0 mt-1">Office Work</span>
            </Link>
          </div>

          <h6 className="font-13 text-muted text-uppercase">Contacts</h6>
          <Row>
            <Col>
              <SimpleBar style={{ height: "375px", width: "100%" }}>
                {(list || []).map((user, index) => {
                 
                  return (
                    <Link
                      to="#"
                      key={index}
                      className="text-body"
                      onClick={(e) => {
                        activateUser(user);
                      }}
                    >
                      <div
                        className={classnames(
                          "d-flex",
                          "align-items-start",
                          "p-2",
                          {
                            "bg-light": user.id === selectedUser.id,
                          }
                        )}
                      >
                        <img
                          src={user?.profile_img}
                          className="me-2 rounded-circle"
                          height="40"
                          width="40"
                          
                          onError={handleImageError}
                          alt={user.name}
                        />

                        <div className="w-100">
                          <h5 className="mt-0 mb-0 font-14">
                            <span className="float-end text-muted fw-normal font-12">
                              {user?.Last_message}
                            </span>
                            {user.name}
                          </h5>
                          <p className="mt-1 mb-0 text-muted font-14">
                            <span className="w-25 float-end text-end">
                              {user.un_read_count !== "0" && (
                                <span className="badge badge-soft-danger">
                                  {user?.un_read_count}
                                </span>
                              )}
                            </span>
                            <span className="w-75">{user.lastMessage}</span>
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </SimpleBar>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default ChatUsers;
