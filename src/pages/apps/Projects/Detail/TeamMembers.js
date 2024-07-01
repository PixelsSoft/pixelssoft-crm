import React from "react";
import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";



const TeamMembers = ( { teamMembers } ) => {
  return (
    <>
      <h5>Team Members:</h5>
      {( teamMembers || [] ).map( ( member, index ) => {
        return (
          <OverlayTrigger
            key={index}
            placement="top"
            overlay={<Tooltip id={member?.userDetails?.id}>{member?.userDetails?.name}</Tooltip>}
          >

            <img
              src={member?.userDetails?.profile_img}
              className="rounded-circle img-thumbnail avatar-sm"
              alt="friend"
            />

          </OverlayTrigger>
        );
      } )}
    </>
  );
};

export default TeamMembers;
