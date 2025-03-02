import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import moment from "moment";
import { Dropdown } from "react-bootstrap";
import { CONSTANTS } from "../../../../constants/constant";
import { useSelector } from "react-redux";




// task item
const TaskItem = ( props ) => {
  const task = props.task || {};
const handleImageError = (event) => {
    // Fallback to the default image URL
    event.target.src = CONSTANTS.API_URLS.AVATAR_IMAGE_URL;
};
  const {  user } = useSelector((state) => ({
    user: state.Auth.user,
  }));

  return (
    <>
    {user?.id==task?.user_id && 
      <Dropdown className="float-end" align="end">
        <Dropdown.Toggle as="a" className="cursor-pointer">
          <i className="mdi mdi-dots-vertical m-0 text-muted h3"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => { props.onEdit( task ) }}>Edit</Dropdown.Item>
         <Dropdown.Item onClick={() => { props.onDelete( task?.id ) }}>Delete</Dropdown.Item>

        </Dropdown.Menu>
      </Dropdown>}
      <span
        className={classNames( "badge", "float-end", {
          "bg-soft-danger text-danger": task.priority === "High",
          "bg-soft-secondary text-secondary": task.priority === "Medium",
          "bg-soft-success text-success": task.priority === "Low",
        } )}
      >
        {task.priority}

      </span>


      <h5 className="mt-0">
        <Link to="#" className="text-dark">
          {task.title}
        </Link>
      </h5>

      <div className="form-check float-end ps-0">
        <input className="form-check-input" type="checkbox" value="" />
      </div>

      {/* <p>{task.description}</p> */}
      <p dangerouslySetInnerHTML={{ __html: task.desciption }}></p>

      <div className="clearfix"></div>

      <div className="row">
        <div className="col">
          <p className="font-13 mt-2 mb-0">
            <i className="mdi mdi-calendar"></i>{moment( task?.due_Date ).format( "DD-MM-YYYY" )}
          </p>
        </div>
        <div className="col-auto">
          <div className="text-end">
            {/* {( task.userAvatar || [] ).map( ( avatar, index ) => {
              return (
                <Link key={index} to="#" className="text-muted">
                  <img
                    src={avatar}
                    alt=""
                    className="avatar-sm img-thumbnail rounded-circle"
                  />
                </Link>
              );
            } )} */}
            
            <Link to="#" className="text-muted">
              <img
                  onError={handleImageError}
                src={task?.userDetails?.profile_img}
                alt={task?.userDetails?.name}
                className="avatar-sm img-thumbnail rounded-circle"
              />
           
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskItem;
