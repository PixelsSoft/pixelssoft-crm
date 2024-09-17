import React, { useEffect, useState } from "react";
import { Card, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

import avatar1 from "../../../../assets/images/users/user-1.jpg";
import avatar2 from "../../../../assets/images/users/user-2.jpg";
import avatar3 from "../../../../assets/images/users/user-3.jpg";
import avatar4 from "../../../../assets/images/users/user-4.jpg";
import { useDispatch, useSelector } from "react-redux";
import { GetComments, SendComments, SendCommentsReply } from "../../../../redux/Slices/Project/Project";
import { toast } from "react-toastify";
import moment from "moment";

const Comments = ( props ) => {
  const { projectId } = props
  const [content, setContent] = useState( '' );
  const [replyContent, setreplyContent] = useState( '' );
  const [loading, setLoading] = useState( false );
  const [selectedComment, setSelectedComment] = useState( '' );
  const [isReply, setIsReply] = useState( false );

  const dispatch = useDispatch()
  const { token, commnents } = useSelector( ( state ) => ( {
    token: state.Auth.token,
    commnents: state.Projects.commnents
  } ) );

  const postComments = async () => {
    try {

      setLoading( true )
      const formData = new FormData()
      if ( isReply ) {
        formData.append( "comment_id", selectedComment )
        formData.append( "reply", replyContent )

        await dispatch( SendCommentsReply( formData, token, projectId ) )
        setIsReply( false )
      } else {
        if ( content !== '' ) {
          formData.append( "comment", content )
          formData.append( "project_id", projectId )

          await dispatch( SendComments( formData, token, projectId ) )
          setContent( '' )

        }
        else {
          setLoading( false )

          toast.error( "please write something in commecnt", { position: toast.POSITION.TOP_RIGHT } );
        }
        setLoading( false )
      }


    } catch ( error ) {
      console.log( { error } )
    }
  }







  return (
    <>
      {loading ?
        <div className="text-center mt-2">
          <Link to="#" className="text-danger">
            <i className="mdi mdi-spin mdi-loading me-1 font-16"></i>
            Loading{" "}
          </Link>
        </div>
        :
        <Card>
          <Card.Body>
            <h4 className="mt-0 mb-3">Comments </h4>
            <textarea
              className="form-control form-control-light mb-2"
              placeholder="Write message"
              id="example-textarea"
              value={content}
              onChange={e => {
                setContent( e.target.value )
              }}
              rows={3}
            ></textarea>
            <div className="text-end">


              <div className="btn-group mb-2 ms-2">
                <button type="button" onClick={postComments} className="btn btn-primary btn-sm">
                  Submit
                </button>
              </div>
            </div>

            <div className="mt-2">
              {( commnents ||[]).map( ( item ) => {

                return (
                  <>

                    <div className="d-flex align-items-start mt-2">
                      <img
                        className="me-2 avatar-sm rounded-circle"
                        src={item?.userDetails?.profile_img}
                        alt=""
                      />
                      <div className="w-100">
                        <h5 className="mt-0 ">

                          {item?.userDetails?.name}   {" "}
                          <small className="text-muted ml-5"> {moment( item?.date ).fromNow()}</small>
                        </h5>
                        {item?.content}
                        <br />
                        <div
                          onClick={() => {
                            setSelectedComment( item?.id )
                            setIsReply( true );
                          }}
                          className="text-muted font-13 d-inline-block mt-2">
                          <i className="mdi mdi-reply" ></i> Reply
                        </div>
                        {item.comment_replies.map( ( item ) => {
                          return (
                            <>
                              <div className="d-flex align-items-start mt-3">
                                <Link to="#" className="pe-2">
                                  <img
                                    src={item?.userDetails?.profile_img}
                                    className="avatar-sm rounded-circle"
                                    alt=""
                                  />
                                </Link>
                                <div className="w-100">
                                  <h5 className="mt-0">

                                    {item?.userDetails?.name}
                                    {" "}
                                    <small className="text-muted"> {moment( item?.date ).fromNow()}</small>
                                  </h5>
                                  {item?.content}
                                </div>

                              </div>


                            </>
                          )
                        } )}
                      </div>

                    </div>
                    {isReply && selectedComment === item?.id &&
                      <div className="d-flex align-items-start mt-3">
                        <Link to="#" className="pe-2">
                          <img
                            src={avatar1}
                            className="rounded-circle"
                            alt="ge"
                            height="31"
                          />
                        </Link>
                        <div className="w-100 ">
                          <input
                            value={replyContent}
                            onChange={e => {
                              setreplyContent( e.target.value )
                            }}
                            type="text"
                            id="simpleinput"
                            className="form-control form-control-sm form-control-light"
                            placeholder="Add Reply"
                          />

                        </div>
                        {replyContent !== '' &&
                          <button type="button" onClick={postComments} className="btn btn-primary btn-sm ml-5">
                            Submit
                          </button>
                        }

                      </div>
                    }
                  </>
                )
              } )}
            </div>
          </Card.Body>
        </Card>
      }

    </>

  );
};

export default Comments;
