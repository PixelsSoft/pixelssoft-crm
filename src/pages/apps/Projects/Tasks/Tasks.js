

import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { Row, Col, Card, Dropdown, Modal, Button } from "react-bootstrap";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";


// components
import PageTitle from "../../../../components/PageTitle";
import HyperDatepicker from "../../../../components/Datepicker";
import { FormInput } from "../../../../components";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';
import TaskItem from "./Task";
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
// dummy data
import { tasks, TaskTypes } from "../../Tasks/Board/data";

import { useDispatch, useSelector } from "react-redux";
import { CreateBoard, CreateTask, DeleteBoard, DeleteTask, DropTask, EditBoard, EditTask, GetBoard } from "../../../../redux/Slices/Project/Project";

import Spinner from "../../../../components/Spinner";

const Tasks = ( props ) => {
  const { data } = props
  const {  token, Boards,user } = useSelector( ( state ) => ( {
   
    token: state.Auth.token,
    Boards: state.Projects.Boards,
    user: state.Auth.user,
  } ) );

 
  const dispatch = useDispatch()


  const fetchBoard = async () => {
    try {
      await dispatch( GetBoard( data?.id, token ) )
    } catch ( error ) {

    }
  }

  useEffect( () => {
    fetchBoard()
  }, [] )


  const [totalTasks, setTotalTasks] = useState( tasks.length );
  const [newTaskModal, setNewTaskModal] = useState( false );
  const [editorState, setEditorState] = useState( "" );
  const [dueDate, setDueDate] = useState( new Date() );
  const [priority, setPriority] = useState( "" );
  const [taskTitle, setTaskTitle] = useState( "" );
  const [taskDescription, setTaskDescription] = useState( "" );
  const [selectedBoardId, setSelectedBoardId] = useState( "" );
  const [selectedTaskId, setselectedTaskId] = useState( "" );
  const [boardTitle, setBoardTitle] = useState( "" );
  const [boardDes, setBoardDes] = useState( "" );
  const [newTaskDetails, setNewTaskDetails] = useState( null );
  const [newBoardModal, setNewBoardModal] = useState( false );
  const [editTask, setEditTask] = useState( false );
  const [editBoard, setEditBoard] = useState( false );
  const [file, setFile] = useState( "" );
  const [loading, setLoading] = useState( false );





  /**
   * Toggles the new task modal
   */
  const toggleNewTaskModal = () => {
    setNewTaskModal( ( prevstate ) => !prevstate );
  };

  /**
   * Toggles the new board modal
   */
  const toggleNewBoardModal = () => {
    setNewBoardModal( ( prevState ) => !prevState );
  };



  const handleNewBoard = async () => {
  
    try {
      setLoading(true)


      const formdata = new FormData()
      formdata.append( "id", data?.id )
      formdata.append( "title", boardTitle )
      formdata.append( "description", boardDes )
      if ( editBoard ) {
        formdata.append( "BoardId", selectedBoardId )

        await dispatch( EditBoard( formdata, token, data?.id ) )

      } else {

        await dispatch( CreateBoard( formdata, token, data?.id ) )
      }
      setBoardDes( "" )
      setBoardTitle( "" )
      setNewBoardModal( false );
      setLoading(false)



    } catch ( error ) {
      setLoading(false)

      console.log(error)

    }


  };
  // ================================================================delete board================================================
  const onDeleteBoard = async ( id ) => {
    try {
     
      setLoading(true)

      await dispatch( DeleteBoard( token, id, data?.id ) )
      setLoading(false)


    } catch ( error ) {
      setLoading(false)

    }
  }
  // ================================================================delete board================================================
  const onEditBoard = async ( board ) => {
  
    try {
      setLoading(true)


      setEditBoard( true )
      setBoardTitle( board?.title )
      setBoardDes( board?.description )
      setSelectedBoardId( board?.id )
      toggleNewBoardModal()
      // await dispatch( DeleteBoard( token, id, data?.id ) )
      setLoading(false)

    } catch ( error ) {
      setLoading(false)

    }
  }
  /**
   * On drag end
   */
  const onDragEnd = async ( result ) => {

    try {
      setLoading(true)


      const { source, destination } = result;
      const boardId = Number( source?.droppableId );
      const taskIndex = Number( source?.index );

      const taskId = Boards
        .find( board => board.id === boardId )
        ?.task[taskIndex]?.id;
      const formData = new FormData();
      formData.append( 'BoardId', destination?.droppableId );
      formData.append( 'taskId', taskId );
      await dispatch( DropTask( formData, token, data?.id ) )
      setLoading(false)

    } catch ( error ) {
      setLoading(false)

    }

  };

  // ================================================================edit Task================================================
  const onEditTask = async ( task ) => {
    try {
      setLoading(true)
      setEditTask( true )
      setselectedTaskId( task.id );
      setSelectedBoardId( task?.boards_id )
      setTaskTitle( task?.title )
      setDueDate( new Date() )
      if (task?.desciption) {
        const blocksFromHTML = convertFromHTML(task?.desciption);
        const contentState = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap
        );
        const newEditorState = EditorState.createWithContent(contentState);
        setEditorState(newEditorState);
    }
      // setTaskDescription(task?.desciption)
      // setEditorState( task?.desciption )
      setPriority( task?.priority )
      toggleNewTaskModal()
      setLoading(false)

    } catch ( error ) {
      setLoading(false)
      console.log(error)

    }
  }



  // ================================================================add new task================================================

  const handleNewTask = async () => {
    
    try {
      setLoading(true)
      const formData = new FormData();

      if(editorState){
        const contentState = editorState.getCurrentContent();
        const rawContent = convertToRaw( contentState );
        const html = draftToHtml( rawContent );
        formData.append( 'desciption', html ); 
      }
     
      formData.append( 'id', selectedBoardId );
      formData.append( 'title', taskTitle );
      formData.append( 'file', file );
   
      formData.append( 'priority', priority );
      formData.append( 'due_Date', dueDate );
      if ( editTask ) {
        formData.append( 'taskId', selectedTaskId );
        await dispatch( EditTask( formData, token, data?.id ) )

      }
      else {

        await dispatch( CreateTask( formData, token, data?.id ) )
      }
      setSelectedBoardId( '' )
      setEditTask( false )
      setTaskTitle( "" )
      setEditorState( "" )
      setPriority( "" )
      setDueDate( new Date() )

      setNewTaskModal( false );
      setLoading(false)

    } catch ( error ) {
      console.log(error)
      setLoading(false)

    }

  };
  const handleFileUpload = async ( event ) => {
    if ( event.target.files ) {
        const file = event.target.files[0];

        setFile( file );
    }
};

  // ================================================================delete Task================================================
  const onDeleteTask = async ( id ) => {
    try {
      setLoading(true)


      await dispatch( DeleteTask( token, id, data?.id ) )
      setLoading(false)

    } catch ( error ) {
      setLoading(false)

    }
  }

  return loading ? ( <div className='d-flex justify-content-center align-items-center  vh-100'>
    <Spinner className="m-2" color={'primary'} />
  </div> ) : (
    <React.Fragment>
      <Row style={{ justifyContent: "center", alignItems: "center" }}>
        <Col>
          <PageTitle title={"Tasks Board"} />
        </Col>
        <Col>
          <Button
            variant="primary"
            className="mt-3"
            onClick={toggleNewBoardModal}
          >
            Add New Board
          </Button>
        </Col>

        {/* Button to toggle new board modal */}
      </Row>

      <Row>
        <DragDropContext onDragEnd={onDragEnd}>
          {(Boards||[]).map( ( board ) => (
            <Droppable key={board.id} droppableId={board.id.toString()}>
              {( provided, snapshot ) => (
                <Col lg={4} ref={provided.innerRef}>
                  <Card>
                    <Card.Body>
                    {user?.id===board?.user_id && 
                      <Dropdown className="float-end" align="end">
                        <Dropdown.Toggle as="a" className="cursor-pointer">
                          <i className="mdi mdi-dots-vertical m-0 text-muted h3"></i>
                        </Dropdown.Toggle>
                             <Dropdown.Menu>
                          <Dropdown.Item onClick={() => { onEditBoard( board ) }} >Edit</Dropdown.Item>
                          <Dropdown.Item onClick={() => { onDeleteBoard( board?.id ) }}>Delete</Dropdown.Item>
                        </Dropdown.Menu>
                   
                      </Dropdown>}

                      <h5 className="header-title">{board.title}</h5>
                      <p className="sub-header">{board.description}</p>
                      {board.task.length === 0 && (
                        <p className="text-center text-muted pt-2 mb-0">
                          No Tasks
                        </p>
                      )}

                      <ul className="sortable-list tasklist list-unstyled">
                        {board.task.map( ( item, index ) => (

                          <Draggable
                            key={item.id}
                            draggableId={item.id + ""}
                            index={index}
                          >
                            {( provided ) => (
                              <li
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <TaskItem task={item} onDelete={onDeleteTask} onEdit={onEditTask} />
                              </li>
                            )}
                          </Draggable>
                        ) )}
                        {provided.placeholder}
                      </ul>

                      <Link
                        to="#"
                        className="btn btn-primary w-100 mt-3 waves-effect waves-light"
                        onClick={() => {
                          setNewTaskModal( !newTaskModal )
                          setSelectedBoardId( board.id )
                        }

                        }
                      >
                        <i className="mdi mdi-plus-circle"></i> Add New
                      </Link>
                    </Card.Body>
                  </Card>
                  {provided.placeholder}
                </Col>
              )}
            </Droppable>
          ) )}
        </DragDropContext>
      </Row>

      {/* Add new task modal */}

      <Modal
        show={newTaskModal}
        onHide={() => {
          toggleNewTaskModal()
          setEditTask( false )
          setselectedTaskId( "" );
          setSelectedBoardId( "" )
          setTaskTitle( '' )

          // setEditorState( task?.desciption )
          setPriority( '' )
        }
        }
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <h4 className="modal-title">{editTask ? "Edit task" : "Create New Task"}</h4>
        </Modal.Header>
        <Modal.Body>
          <div className="px-2">
            <FormInput
              name="title"
              label="Title"
              value={taskTitle}
              onChange={( e ) => {
                setTaskTitle( e.target.value )
              }}
              placeholder="Enter title"
              type="text"
              containerClass="mb-3"
              className="form-control form-control-light"

              key="title"

            />
            <label className="form-label">Description</label>{" "}
            <Editor
       
              className={"md:6"}
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={setEditorState}
              editorStyle={{
                minHeight: '200px',
                border: '1px solid #ccc',
                marginBottam: 20,
                paddinghorizontal:10
              }}
            />
             <FormInput
                                                        label="File Upload"
                                                        type="file"
                                                        name="file"
                                                        
                                                        containerClass={'mb-3'}
                                                        key="file"
                                                        onChange={handleFileUpload}
                                                    />

            <Row>
              <Col md={6}>
                <FormInput
                  name="priority"
                  label="Priority"
                  type="select"
                  value={priority}
                  onChange={( e ) => {
                    setPriority( e.target.value )
                  }}
                  containerClass="mb-3"
                  className="form-select form-control-light"

                  key="priority"

                >
                  <option value="">Select</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </FormInput>
              </Col>
              <Col md={6}>
                <div className="mb-3">
                  <label className="form-label">Due Date</label> <br />
                  <HyperDatepicker
                    hideAddon
                    dateFormat="yyyy-MM-dd"
                    value={dueDate}
                    inputClass="form-control-light"
                    onChange={( date ) => {
                      setDueDate( date );
                    }}
                  />
                </div>
              </Col>
            </Row>
            <div className="text-end">
              <Button
                variant="light"
                className="me-1"
                onClick={toggleNewTaskModal}
              >
                Cancel
              </Button>
              <Button onClick={handleNewTask} variant="primary" type="submit">
                {editTask ? "Edit" : "Create"}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>


      {/* Add new board modal */}
      <Modal
        show={newBoardModal}
        onHide={() => {
          toggleNewBoardModal()
          setEditBoard( false )
          setBoardDes( "" )
          setSelectedBoardId( "" )
          setBoardTitle( "" )
        }}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <h4 className="modal-title">{editBoard ? "Edit Board" : "Create New Board"}</h4>
        </Modal.Header>
        <Modal.Body>
          <FormInput
            name="title"
            value={boardTitle}
            onChange={( e ) => {
              setBoardTitle( e.target.value )
            }}
            label="Title"
            placeholder="Enter board title"
            type="text"
            containerClass="mb-3"
            className="form-control form-control-light"

            key="title"

          />
          <FormInput
            value={boardDes}
            onChange={( e ) => {
              setBoardDes( e.target.value )
            }}
            name="Description"
            label="Description"
            placeholder="Enter board Description"
            type="text"
            containerClass="mb-3"
            className="form-control form-control-light"

            key="Description"

          />

          <div className="text-end">
            <Button
              variant="light"
              className="me-1"
              onClick={toggleNewBoardModal}
            >
              Cancel
            </Button>
            <Button
              onClick={handleNewBoard}
              variant="primary" type="submit">
              {editBoard ? "Edit" : "Create"}
            </Button>
          </div>

        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default Tasks;
