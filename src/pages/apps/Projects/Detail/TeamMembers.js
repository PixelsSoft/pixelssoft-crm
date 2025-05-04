// import React from "react";
// import { Link } from "react-router-dom";
// import { OverlayTrigger, Tooltip } from "react-bootstrap";

// const TeamMembers = ( { teamMembers } ) => {
//   return (
//     <>
//       <h5>Team Members:</h5>
//       {( teamMembers || [] ).map( ( member, index ) => {
//         return (
//           <OverlayTrigger
//             key={index}
//             placement="top"
//             overlay={<Tooltip id={member?.userDetails?.id}>{member?.userDetails?.name}</Tooltip>}
//           >

//             <img
//               src={member?.userDetails?.profile_img}
//               className="rounded-circle img-thumbnail avatar-sm"
//               alt="friend"
//             />

//           </OverlayTrigger>
//         );
//       } )}
//     </>
//   );
// };

// export default TeamMembers;
import React, { useState } from "react";
import {
  OverlayTrigger,
  Tooltip,
  Button,
  Form,
  Collapse,
} from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import classNames from "classnames";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { useSelector } from "react-redux";

const TeamMembers = ({ teamMembers = [], onRemove, onAdd, employee = [] }) => {
  const [showAddDropdown, setShowAddDropdown] = useState(false);
  const [selectedTeamMembers, setSelectedTeamMembers] = useState([]);
  const { roles } = useSelector((state) => ({
    roles: state.Roles.roles,
  }));
  const [hasSuperAdmin, sethasSuperAdmin] = useState(
    roles[0]?.role
      .split(",")
      .some(
        (role) =>
          role === "SuperAdmin" ||
          role === "Project Manager" ||
          role === "Sales"
      ) || ""
  );
  const handleAddMembers = () => {
    onAdd(selectedTeamMembers); // Send selected to parent
    setSelectedTeamMembers([]); // Reset selection
    setShowAddDropdown(false); // Hide dropdown
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="mb-0">Team Members:</h5>
        {hasSuperAdmin && (
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowAddDropdown(!showAddDropdown)}
          >
            <i className={classNames("mdi", "mdi-plus", "me-1")}></i>
            Add Member
          </Button>
        )}
      </div>

      <Collapse in={showAddDropdown}>
        <div>
          <Form.Group className="mb-3">
            <Form.Label>Select Team Members</Form.Label>
            <Typeahead
              id="team-members-select"
              labelKey="name"
              multiple
              options={employee}
              placeholder="Select team members..."
              onChange={setSelectedTeamMembers}
              selected={selectedTeamMembers}
            />
            {selectedTeamMembers.length > 0 && (
              <div className="mt-2">
                {selectedTeamMembers.map((member, index) => (
                  <OverlayTrigger
                    key={index}
                    placement="top"
                    overlay={<Tooltip id={member.name}>{member.name}</Tooltip>}
                  >
                    <label className="form-check-label me-2">
                      {member.name},
                    </label>
                  </OverlayTrigger>
                ))}
                <Button
                  variant="success"
                  size="sm"
                  className="ms-2"
                  onClick={handleAddMembers}
                >
                  <i className={classNames("mdi", "mdi-check", "me-1")}></i>
                  Confirm
                </Button>
              </div>
            )}
          </Form.Group>
        </div>
      </Collapse>

      <div className="d-flex flex-wrap gap-2">
        {teamMembers.map((member, index) => (
          <div key={index} className="position-relative d-inline-block">
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id={`tooltip-${member?.userDetails?.id}`}>
                  {member?.userDetails?.name}
                </Tooltip>
              }
            >
              <img
                src={member?.userDetails?.profile_img}
                className="rounded-circle img-thumbnail avatar-sm"
                alt="friend"
              />
            </OverlayTrigger>

            {/* Remove Icon */}
            {hasSuperAdmin && (
                  <button
                  type="button"
                  className="btn btn-sm btn-light position-absolute top-0 start-100 translate-middle p-1 rounded-circle"
                  onClick={() => onRemove(member?.userDetails?.id)}
                  title="Remove"
                >
                  <i className={classNames("mdi", "mdi-close", "text-danger")}></i>
                </button>
            )}

        
          </div>
        ))}
      </div>
    </>
  );
};

export default TeamMembers;
