import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";

// components
import PageTitle from "../../../components/PageTitle";

import ChatUsers from "./ChatUsers";
import ChatArea from "./ChatArea";
// dummy data
import { users, ChatUser } from "./data";
import { useSelector } from "react-redux";
import SearchArea from "./SearchArea";

// ChatApp
const ChatApp = () => {

  const [selectedUser, setSelectedUser] = useState({});
  const [newChat, setNewChat] = useState(true);

  /**
   * On user change
   */
  const onUserChange = (user) => {
    setNewChat(false);

    setSelectedUser(user);
  };
  const onNewChat = () => {
    setNewChat(true);
  };
  

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Apps", path: "/apps/chat" },
          { label: "Chat", path: "/apps/chat", active: true },
        ]}
        title={"Chat"}
      />

      <Row>
        <Col lg={4} xl={3}>
          <ChatUsers onUserSelect={onUserChange} onNewChat={onNewChat} />
        </Col>
        {newChat?
        <Col lg={8} xl={9}>
        <SearchArea onUserSelect={onUserChange} />
      </Col>:
      <Col lg={8} xl={9}>
      <ChatArea selectedUser={selectedUser} />
    </Col>
      }
        
      </Row>
    </>
  );
};

export default ChatApp;
