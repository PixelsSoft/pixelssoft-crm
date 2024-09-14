import { yupResolver } from "@hookform/resolvers/yup";
import classnames from "classnames";
import { onValue, push, ref, update, remove } from 'firebase/database';
import moment from 'moment';
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Card,
  Col,
  Dropdown,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";
import * as yup from "yup";
import { getDownloadURL, ref as storageRef, uploadBytesResumable, getMetadata } from 'firebase/storage';

import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
// components
import { FormInput } from "../../../components";
import Loader from "../../../components/Loader";

// default data
import { messages } from "./data";

import { useDispatch, useSelector } from "react-redux";
import avatar1 from "../../../assets/images/users/user-1.jpg";
import { database, storage } from "../../../firebase/firebase";
import { get, off } from "firebase/database";
import { getFileDetails, getFileFormat, handleUpload } from "../../../utils/FileUpload";

// ChatArea
const ChatArea = ( { selectedUser } ) => {
  const [loading, setLoading] = useState( false );
  const [userMessages, setUserMessages] = useState( [] );
  const [file, setFile] = useState( null );
  const [msgs, setMsgs] = useState( [] );
  const dispatch = useDispatch()
  const [inputMessage, setInputMessage] = useState( '' );
  const flatListRef = useRef( null ); // Adjust to your scrollable component in React.js
  const profile = useSelector( ( state ) => ( {
    user: state.Auth.user,
  } ) );

  const UserMessage = ( {
    message,

  } ) => {


    return (
      <li className={classnames( "clearfix", { odd: message?.senderId === profile?.user?.id } )} >
        {/* <div className="chat-avatar">
            <img src={message?.image} className="rounded" alt="" />
            <i>{moment( message?.time).fromNow()}</i>
          </div>
     */}
        <div className="conversation-text">
          {message?.type === "text" && (
            <div className="ctext-wrap">
              <i>{message?.name}</i>
              {message?.type === "text" && <p>{message?.message}</p>}
            </div>
          )}

          {message?.type === "file" && (
            <Card className="mb-1 shadow-none border">
              <div className="p-2">
                <Row className="align-items-center">
                  <div className="col-auto">
                    <div className="avatar-sm">
                      <span className="avatar-title badge-soft-primary text-primary rounded">
                        {message?.message?.fileFormat}
                      </span>
                    </div>
                  </div>
                  <div className="col ps-0">
                    <div className="text-muted fw-bold">
                      {message?.message?.fileName}
                    </div>
                    <p className="mb-0"> {message?.message?.fileSize} MB</p>
                  </div>
                  <div className="col-auto">
                    <Link to={message?.message?.fileURL} target="_blank"
                      className="btn btn-link btn-lg text-muted"
                    >
                      <i className="dripicons-download"></i>
                    </Link>
                  </div>
                </Row>
              </div>
            </Card>
          )}
          <p>
            {moment( message?.time ).fromNow()}
          </p>
        </div>

        <Dropdown
          className="conversation-actions"
          align={message?.senderId === profile?.user?.id ? "start" : "end"}
        >
          <Dropdown.Toggle as="a" className="btn-sm card-drop cursor-pointer">
            <i className="mdi mdi-dots-vertical font-16"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleCopyMessage( message )}>Copy Message</Dropdown.Item>
            <Dropdown.Item onClick={() => handleEditMessage( message )}>Edit</Dropdown.Item>
            <Dropdown.Item onClick={() => handleDeleteMessage( message )}>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </li>
    );
  };
  useEffect( () => {
    try {

      // Reference for chat messages
      const chatRef = ref( database, `chat/${profile?.user?.user_id.toString()}/${selectedUser?.id.toString()}/message` );

      // Listen to chat messages
      const onValueChange = onValue( chatRef, ( dataSnapshot ) => {
        const msgs = [];
        dataSnapshot.forEach( ( child ) => {
          msgs.push( {
            key: child.key,
            senderId: child.val().senderId,
            message: child.val().message,
            time: child.val().time,
            type: child.val().type,
            image: child.val()?.profile_img,
          } );
        } );
        setMsgs( msgs );

        // Scroll to the end of the list
        flatListRef.current?.scrollIntoView( { behavior: 'smooth' } );
      } );

      // Reference for chat list
      const userRef = ref( database, `ChatList/${profile?.user?.user_id.toString()}/${selectedUser?.id.toString()}` );

      get( userRef ).then( snapshot => {
        if ( snapshot.exists() ) {
          update( userRef, {
            id: selectedUser?.id,
            un_read_count: 0,
          } );
        } else {
          console.log( 'Node does not exist.' );
        }
      } ).catch( ( error ) => {
        console.error( 'Error checking node existence:', error );
      } );

      return () => {
        // Cleanup listener on unmount
        off( chatRef, 'value', onValueChange );
      };
    } catch ( error ) {
      console.log( error )
    }

  }, [profile?.user?.user_id, selectedUser.id] );


  // Function to handle file selection
  const handleFileChange = ( event ) => {
    setFile( event.target.files[0] ); // Store the selected file
  };


  const sendMessage = async () => {
    const time = moment().toString();

    let newMessage = {
      time,
      type: "text", // Default to text
      senderId: profile?.user?.user_id,
      senderName: profile?.user?.name,
      receiverId: selectedUser?.id,
      receiverName: selectedUser?.name || selectedUser?.first_name,
      message: inputMessage,
      profile_img: profile?.user?.profile_img || null,
    };

    // If a file is selected, upload it to Firebase Storage

    if ( file ) {

      await handleUpload( dispatch, file ).then( async res => {
        const fileDetails = await getFileDetails( res );

        // Update the newMessage object to include file metadata
        newMessage = {
          ...newMessage,
          type: "file",
          message: fileDetails,
        };
        // Send the message with file details
        await sendMessageToFirebase( newMessage );
        setFile( null ); // Clear the file after sending
      } )

      // uploadTask.on(
      //   'state_changed',
      //   ( snapshot ) => {
      //     // Optionally track the upload progress
      //   },
      //   ( error ) => {
      //     console.error( 'File upload error:', error );
      //   },
      //   async () => {



      //   }
      // );
    } else {
      // If no file, send a regular text message
      await sendMessageToFirebase( newMessage );
    }

    // Clear the input message after sending
    setInputMessage( '' );
  };

  // Function to send the message to Firebase Database
  const sendMessageToFirebase = async ( message ) => {
    try {
      // Send message to sender's path
      await push( ref( database, `chat/${profile?.user?.user_id}/${selectedUser?.id}/message` ), message );

      // Send message to receiver's path
      await push( ref( database, `chat/${selectedUser?.id}/${profile?.user?.user_id}/message` ), message );

      // Update sender's chat list
      await update( ref( database, `ChatList/${profile?.user?.user_id}/${selectedUser?.id}` ), {
        Last_message: message?.type === 'text' ? message.message : 'File shared',
        time: message.time,
        id: selectedUser?.id,
        name: selectedUser?.name || selectedUser?.first_name,
        un_read_count: '0',
        profile_img: selectedUser?.profile_img || null,
      } );

      // Update receiver's chat list and increment unread count
      const receiverChatRef = ref( database, `ChatList/${selectedUser?.id}/${profile?.user?.user_id}` );
      await update( receiverChatRef, {
        Last_message: message?.type === 'text' ? message.message : 'File shared',
        time: message.time,
        id: profile?.user?.user_id.toString(),
        name: profile?.user?.name,
        un_read_count: '1', // or increment unread count if necessary
        profile_img: profile?.user?.profile_img || null,
      } );
    } catch ( error ) {
      console.error( 'send msg error', error );
    }
  };

  const handleCopyMessage = ( message ) => {
    navigator.clipboard.writeText( message?.type === 'text' ? message.message : message?.message?.fileName )
      .then( () => alert( 'Message copied!' ) )
      .catch( () => alert( 'Failed to copy message' ) );
  };

  const handleEditMessage = ( message ) => {
    const newMessage = prompt( "Edit your message:", message.message );
    if ( newMessage !== null && newMessage !== message.message ) {
      const updatedMessage = { ...message, message: newMessage };
      updateMessageInFirebase( updatedMessage );
    }
  };

  const updateMessageInFirebase = async ( message ) => {
    try {
      const messageRef = ref( database, `chat/${profile?.user?.user_id}/${selectedUser?.id}/message/${message.key}` );
      await update( messageRef, { message: message.message } );
    } catch ( error ) {
      console.error( 'Error updating message:', error );
    }
  };

  const handleDeleteMessage = async ( message ) => {
    console.log( "Message to delete:", message ); // Log entire message object for debugging
    if ( window.confirm( "Are you sure you want to delete this message?" ) ) {
      try {
        // Ensure message.key is present and valid
        if ( !message.key ) {
          console.error( 'Message key is missing' );
          return;
        }

        // Construct the reference for the message
        const messageRef = ref( database, `chat/${profile?.user?.user_id}/${selectedUser?.id}/message/${message.key}` );
        await remove( messageRef );

        // Optionally handle any additional cleanup or state updates
        console.log( 'Message deleted successfully' );
      } catch ( error ) {
        console.error( 'Error deleting message:', error );
      }
    }
  };


  const handleDeleteChat = async () => {
    if ( window.confirm( "Are you sure you want to delete this chat?" ) ) {
      try {
        const userChatRef = ref( database, `chat/${profile?.user?.user_id}/${selectedUser?.id}` );
        const userChatListRef = ref( database, `ChatList/${profile?.user?.user_id}/${selectedUser?.id}` );
        // const receiverChatRef = ref( database, `chat/${selectedUser?.id}/${profile?.user?.user_id}` );
        // const receiverChatListRef = ref( database, `ChatList/${selectedUser?.id}/${profile?.user?.user_id}` );
        await remove( userChatRef )
        await remove( userChatListRef )
        // await update( userChatRef, null ); // Clear chat for the current user
        // await update( userChatListRef, null ); // Remove from current user's chat list
        // await update( receiverChatRef, null ); // Clear chat for the receiver
        // await update( receiverChatListRef, null ); // Remove from receiver's chat list

        alert( "Chat deleted successfully" );
      } catch ( error ) {
        console.error( 'Failed to delete chat:', error );
      }
    }
  };



  const [toUser] = useState( {
    id: 9,
    name: "Geneva M",
    avatar: avatar1,
    email: "support@coderthemes.com",
    phone: "+1 456 9595 9594",
    location: "California, USA",
    languages: "English, German, Spanish",
    groups: "Work, Friends",
  } );


  const getMessagesForUser = useCallback( () => {
    if ( selectedUser ) {
      setLoading( true );
      setTimeout( () => {
        setUserMessages(
          [...messages].filter(
            ( m ) =>
              ( m.to.id === toUser.id && m.from.id === selectedUser.id ) ||
              ( toUser.id === m.from.id && m.to.id === selectedUser.id )
          )
        );
        setLoading( false );
      }, 750 );
    }
  }, [selectedUser, toUser] );

  useEffect( () => {
    getMessagesForUser();
  }, [getMessagesForUser] );

  /*
   * form validation schema
   */
  const schemaResolver = yupResolver(
    yup.object().shape( {
      newMessage: yup.string().required( "Please enter your messsage" ),
    } )
  );

  /*
   * form methods
   */
  const methods = useForm( { resolver: schemaResolver } );
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    reset,
  } = methods;


  return (
    <>
      <Card>
        <Card.Body className="d-fle py-2 px-3 border-bottom border-light mb-3">
          <Row className="justify-content-between py-1">
            <Col sm={7}>
              <div className="d-flex align-items-start">
                <img
                  src={selectedUser?.profile_img}
                  className="me-2 rounded-circle"
                  height="36"
                  width={"36"}
                  alt={selectedUser?.name}
                />
                <div>
                  <h5 className="mt-0 mb-0 font-15">
                    <Link to="/apps/contacts/profile" className="text-reset">
                      {selectedUser?.name}
                    </Link>
                  </h5>
                  <p className="mt-1 mb-0 text-muted font-12">
                    <small className="mdi mdi-circle text-success"></small>{" "}
                    Online
                  </p>
                </div>
              </div>
            </Col>
            <Col className="col-auto">
              <div id="tooltips-container">
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id="">Voice Call</Tooltip>}
                >
                  <Link
                    to="#"
                    className="text-reset font-19 py-1 px-2 d-inline-block"
                  >
                    <i className="fe-phone-call"></i>
                  </Link>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id="">Video Call</Tooltip>}
                >
                  <Link
                    to="#"
                    className="text-reset font-19 py-1 px-2 d-inline-block"
                  >
                    <i className="fe-video"></i>
                  </Link>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id="">Add Users</Tooltip>}
                >
                  <Link
                    to="#"
                    className="text-reset font-19 py-1 px-2 d-inline-block"
                  >
                    <i className="fe-user-plus"></i>
                  </Link>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id="">Delete Chat</Tooltip>}
                >
                  <Link
                    to="#"
                    onClick={handleDeleteChat}
                    className="text-reset font-19 py-1 px-2 d-inline-block"
                  >
                    <i className="fe-trash-2"></i>
                  </Link>
                </OverlayTrigger>
              </div>
            </Col>
          </Row>
        </Card.Body>
        <Card.Body>
          {loading && <Loader />}

          <SimpleBar
            style={{ height: "465px", width: "100%" }}
            id="chatScrollBar"
          >
            <ul
              className="conversation-list"
            >
              {( msgs || [] ).map( ( message, index ) => {

                return (
                  <UserMessage key={index} message={message} />
                );
              } )}

            </ul>
          </SimpleBar>

          <Row>
            <Col>
              <div className="mt-3 bg-light p-3 rounded">
                <form
                  noValidate
                  name="chat-form"
                  id="chat-form"
                  onSubmit={( e ) => {
                    e.preventDefault(); // Prevent the form from refreshing the page
                    sendMessage(); // Call the sendMessage function
                  }}

                >
                  <div className="row">
                    {!file
                      &&

                      <div className="col mb-2 mb-sm-0">
                        <FormInput
                          type="text"
                          value={inputMessage}
                          onChange={( e ) => setInputMessage( e.target.value )}
                          name="newMessage"
                          className="border-0"
                          placeholder="Enter your text"
                          register={register}
                          key="newMessage"
                          errors={errors}
                          control={control}
                        />
                      </div>

                    }

                    <div className="col-sm-auto">
                      <div className="btn-group">
                        {/* <Link to="#" className="btn btn-light"> */}
                        <input type="file" onChange={handleFileChange} className="form-control" />
                        {/* </Link> */}
                        <button
                          type="submit" // Submit the form when clicking
                          className="btn btn-success chat-send w-100"
                        >
                          <i className="fe-send"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default ChatArea;
