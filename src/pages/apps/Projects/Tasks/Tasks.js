// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { Link } from "react-router-dom";
// import { Row, Col, Card, Dropdown, Modal, Button } from "react-bootstrap";
// import {
//     DragDropContext,
//     Droppable,
//     Draggable,
//     DropResult,
// } from "react-beautiful-dnd";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";

// // components
// import PageTitle from "../../../../components/PageTitle";
// import HyperDatepicker from "../../../../components/Datepicker";
// import { FormInput } from "../../../../components";

// import TaskItem from "./Task";

// // dummy data
// import { tasks, TaskTypes } from "../../Tasks/Board/data";

// import defaultAvatar from "../../../../assets/images/users/user-1.jpg";

// const Tasks = () => {
//     const [state, setState] = useState( {
//         upcomingTasks: tasks.filter( ( t ) => t.status === "Upcoming" ),
//         inprogressTasks: tasks.filter( ( t ) => t.status === "Inprogress" ),
//         completedTasks: tasks.filter( ( t ) => t.status === "Completed" ),
//     } );
//     const [totalTasks, setTotalTasks] = useState( tasks.length );
//     const [newTaskModal, setNewTaskModal] = useState( false );
//     const [newTaskDetails, setNewTaskDetails] = useState( null );

//     /*
//      * Form validation schema
//      */
//     const schemaResolver = yupResolver(
//         yup.object().shape( {
//             title: yup.string().required(),
//             priority: yup.string().required(),
//             description: yup.string().required(),
//         } )
//     );

//     /*
//      * Form methods
//      */
//     const methods = useForm( { resolver: schemaResolver } );
//     const {
//         handleSubmit,
//         register,
//         control,
//         reset,
//         formState: { errors },
//     } = methods;

//     /**
//      * Toggles the new task modal
//      */
//     const toggleNewTaskModal = () => {
//         setNewTaskModal( ( prevstate ) => !prevstate );
//     };

//     /**
//      * Creates new empty task with given status
//      * @param status
//      * @param queue
//      */
//     const newTask = ( status, queue ) => {
//         setNewTaskDetails( {
//             dueDate: new Date(),
//             userAvatar: [defaultAvatar],
//             status: status,
//             queue: queue,
//         } );
//         setNewTaskModal( true );
//     };

//     /**
//      * When date changes
//      * @param {} date
//      */
//     const handleDateChange = ( date ) => {
//         if ( newTaskDetails ) {
//             // setState({
//             //     ...state,
//             //     newTask: { ...state.newTask, dueDate: date },
//             // });
//             setNewTaskDetails( { ...newTaskDetails, dueDate: date } );
//         }
//     };

//     // a little function to help us with reordering the result
//     const reorder = ( list, startIndex, endIndex ) => {
//         const result = Array.from( list );
//         const [removed] = result.splice( startIndex, 1 );
//         result.splice( endIndex, 0, removed );

//         return result;
//     };

//     /**
//      * Moves an item from one list to another list.
//      */
//     const move = (
//         source,
//         destination,
//         droppableSource,
//         droppableDestination,
//     ) => {
//         const sourceClone = Array.from( source );
//         const destClone = Array.from( destination );
//         const [removed] = sourceClone.splice( droppableSource.index, 1 );
//         destClone.splice( droppableDestination.index, 0, removed );
//         const result = {};
//         result[droppableSource.droppableId] = sourceClone;
//         result[droppableDestination.droppableId] = destClone;

//         return result;
//     };

//     /**
//      * Gets the list
//      */
//     const getList = ( id ) => {
//         const modifiedState = { ...state };
//         const stateTasks = modifiedState[id] && modifiedState[id];
//         return stateTasks;
//     };

//     /**
//      * On drag end
//      */
//     const onDragEnd = ( result ) => {
//         const { source, destination } = result;

//         // dropped outside the list
//         if ( !destination ) {
//             return;
//         }
//         if ( source.droppableId === destination.droppableId ) {
//             const items = reorder(
//                 getList( source.droppableId ),
//                 source.index,
//                 destination.index
//             );
//             let localState = { ...state };
//             localState[source.droppableId] = items;
//             setState( localState );
//         } else {
//             const result = move(
//                 getList( source.droppableId ),
//                 getList( destination.droppableId ),
//                 source,
//                 destination
//             );
//             const localState = { ...state, ...result };
//             setState( localState );
//         }
//     };

//     /**
//      * Handles the new task form submission
//      */

//     const handleNewTask = ( values ) => {
//         const formData = {
//             title: values["title"],
//             priority: values["priority"],
//             description: values["description"],
//         };

//         const newTask = {
//             ...newTaskDetails,
//             ...formData,
//             id: totalTasks + 1,
//             dueDate: newTaskDetails.dueDate.toLocaleDateString( "en-US", {
//                 year: "numeric",
//                 month: "short",
//                 day: "numeric",
//             } ),
//         };

//         let modifiedState = { ...state };
//         let tasks = [...getList( newTaskDetails.queue ), newTask];
//         modifiedState[newTaskDetails.queue] = [...tasks];

//         setState( modifiedState );
//         setNewTaskModal( false );
//         setTotalTasks( totalTasks + 1 );

//         // reset the form after submission
//         reset();
//     };

//     return (
//         <React.Fragment>
//             <PageTitle
//                 title={"Tasks Board"}
//             />
//             <Row>
//                 <DragDropContext onDragEnd={onDragEnd}>
//                     {/* todo */}
//                     <Droppable droppableId="upcomingTasks">
//                         {( provided, snapshot ) => (
//                             <Col lg={4} ref={provided.innerRef}>
//                                 <Card>
//                                     <Card.Body>
//                                         <Dropdown className="float-end" align="end">
//                                             <Dropdown.Toggle as="a" className="cursor-pointer">
//                                                 <i className="mdi mdi-dots-vertical m-0 text-muted h3"></i>
//                                             </Dropdown.Toggle>
//                                             <Dropdown.Menu>
//                                                 <Dropdown.Item>Edit</Dropdown.Item>
//                                                 <Dropdown.Item>Delete</Dropdown.Item>
//                                                 <Dropdown.Item>Add Members</Dropdown.Item>
//                                                 <Dropdown.Item>Add Due Date</Dropdown.Item>
//                                             </Dropdown.Menu>
//                                         </Dropdown>

//                                         <h5 className="header-title">Upcoming</h5>
//                                         <p className="sub-header">
//                                             Your awesome text goes here. Your awesome text goes here.
//                                         </p>
//                                         {state.upcomingTasks.length === 0 && (
//                                             <p className="text-center text-muted pt-2 mb-0">
//                                                 No Tasks
//                                             </p>
//                                         )}

//                                         <ul
//                                             className="sortable-list tasklist list-unstyled"
//                                             id="upcoming"
//                                         >
//                                             {( state.upcomingTasks || [] ).map( ( item, index ) => (
//                                                 <Draggable
//                                                     key={item.id}
//                                                     draggableId={item.id + ""}
//                                                     index={index}
//                                                 >
//                                                     {( provided, snapshot ) => (
//                                                         <li
//                                                             ref={provided.innerRef}
//                                                             {...provided.draggableProps}
//                                                             {...provided.dragHandleProps}
//                                                         >
//                                                             <TaskItem task={item} />
//                                                         </li>
//                                                     )}
//                                                 </Draggable>
//                                             ) )}
//                                             {provided.placeholder}
//                                         </ul>
//                                         <Link
//                                             to="#"
//                                             className="btn btn-primary w-100 mt-3 waves-effect waves-light"
//                                             onClick={() => newTask( "Pending", "upcomingTasks" )}
//                                         >
//                                             <i className="mdi mdi-plus-circle"></i> Add New
//                                         </Link>
//                                     </Card.Body>
//                                 </Card>
//                                 {provided.placeholder}
//                             </Col>
//                         )}
//                     </Droppable>

//                     {/* in progress */}
//                     <Droppable droppableId="inprogressTasks">
//                         {( provided, snapshot ) => (
//                             <Col lg={4} ref={provided.innerRef}>
//                                 <Card>
//                                     <Card.Body>
//                                         <Dropdown className="float-end" align="end">
//                                             <Dropdown.Toggle as="a" className="cursor-pointer">
//                                                 <i className="mdi mdi-dots-vertical m-0 text-muted h3"></i>
//                                             </Dropdown.Toggle>
//                                             <Dropdown.Menu>
//                                                 <Dropdown.Item>Edit</Dropdown.Item>
//                                                 <Dropdown.Item>Delete</Dropdown.Item>
//                                                 <Dropdown.Item>Add Members</Dropdown.Item>
//                                                 <Dropdown.Item>Add Due Date</Dropdown.Item>
//                                             </Dropdown.Menu>
//                                         </Dropdown>

//                                         <h5 className="header-title">In Progress</h5>
//                                         <p className="sub-header">Your awesome text goes here.</p>

//                                         {state.inprogressTasks.length === 0 && (
//                                             <p className="text-center text-muted pt-2 mb-0">
//                                                 No Tasks
//                                             </p>
//                                         )}

//                                         <ul
//                                             className="sortable-list tasklist list-unstyled"
//                                             id="inprogress"
//                                         >
//                                             {( state.inprogressTasks || [] ).map( ( item, index ) => (
//                                                 <Draggable
//                                                     key={item.id}
//                                                     draggableId={item.id + ""}
//                                                     index={index}
//                                                 >
//                                                     {( provided, snapshot ) => (
//                                                         <li
//                                                             ref={provided.innerRef}
//                                                             {...provided.draggableProps}
//                                                             {...provided.dragHandleProps}
//                                                         >
//                                                             <TaskItem task={item} />
//                                                         </li>
//                                                     )}
//                                                 </Draggable>
//                                             ) )}
//                                             {provided.placeholder}
//                                         </ul>
//                                         <Link
//                                             to="#"
//                                             className="btn btn-primary w-100 mt-3 waves-effect waves-light"
//                                             onClick={() => newTask( "Inprogress", "inprogressTasks" )}
//                                         >
//                                             <i className="mdi mdi-plus-circle"></i> Add New
//                                         </Link>
//                                     </Card.Body>
//                                 </Card>
//                                 {provided.placeholder}
//                             </Col>
//                         )}
//                     </Droppable>

//                     {/* done */}
//                     <Droppable droppableId="completedTasks">
//                         {( provided, snapshot ) => (
//                             <Col lg={4} ref={provided.innerRef}>
//                                 <Card>
//                                     <Card.Body>
//                                         <Dropdown className="float-end" align="end">
//                                             <Dropdown.Toggle as="a" className="cursor-pointer">
//                                                 <i className="mdi mdi-dots-vertical m-0 text-muted h3"></i>
//                                             </Dropdown.Toggle>
//                                             <Dropdown.Menu>
//                                                 <Dropdown.Item>Edit</Dropdown.Item>
//                                                 <Dropdown.Item>Delete</Dropdown.Item>
//                                                 <Dropdown.Item>Add Members</Dropdown.Item>
//                                                 <Dropdown.Item>Add Due Date</Dropdown.Item>
//                                             </Dropdown.Menu>
//                                         </Dropdown>

//                                         <h5 className="header-title">Completed</h5>
//                                         <p className="sub-header">
//                                             Your awesome text goes here. Your awesome text goes here.
//                                         </p>
//                                         {state.completedTasks.length === 0 && (
//                                             <p className="text-center text-muted pt-2 mb-0">
//                                                 No Tasks
//                                             </p>
//                                         )}

//                                         <ul
//                                             className="sortable-list tasklist list-unstyled"
//                                             id="done"
//                                         >
//                                             {( state.completedTasks || [] ).map( ( item, index ) => (
//                                                 <Draggable
//                                                     key={item.id}
//                                                     draggableId={item.id + ""}
//                                                     index={index}
//                                                 >
//                                                     {( provided, snapshot ) => (
//                                                         <li
//                                                             ref={provided.innerRef}
//                                                             {...provided.draggableProps}
//                                                             {...provided.dragHandleProps}
//                                                         >
//                                                             <TaskItem task={item} />
//                                                         </li>
//                                                     )}
//                                                 </Draggable>
//                                             ) )}
//                                             {provided.placeholder}
//                                         </ul>

//                                         <Link
//                                             to="#"
//                                             className="btn btn-primary w-100 mt-3 waves-effect waves-light"
//                                             onClick={() => newTask( "Done", "completedTasks" )}
//                                         >
//                                             <i className="mdi mdi-plus-circle"></i> Add New
//                                         </Link>
//                                     </Card.Body>
//                                 </Card>
//                                 {provided.placeholder}
//                             </Col>
//                         )}
//                     </Droppable>
//                     {/* </div> */}
//                 </DragDropContext>
//             </Row>

//             {/* add new task modal */}
//             {newTaskDetails && (
//                 <Modal
//                     show={newTaskModal}
//                     onHide={toggleNewTaskModal}
//                     size="lg"
//                     centered
//                 >
//                     <Modal.Header closeButton>
//                         <h4 className="modal-title">Create New Task</h4>
//                     </Modal.Header>
//                     <Modal.Body>
//                         <form onSubmit={handleSubmit( handleNewTask )} className="px-2">
//                             <FormInput
//                                 name="title"
//                                 label="Title"
//                                 placeholder="Enter title"
//                                 type="text"
//                                 containerClass="mb-3"
//                                 className="form-control form-control-light"
//                                 register={register}
//                                 key="title"
//                                 errors={errors}
//                                 control={control}
//                             />

//                             <FormInput
//                                 name="description"
//                                 label="Description"
//                                 type="textarea"
//                                 containerClass="mb-3"
//                                 className="form-control form-control-light"
//                                 rows="3"
//                                 register={register}
//                                 key="description"
//                                 errors={errors}
//                                 control={control}
//                             />

//                             <Row>
//                                 <Col md={6}>
//                                     <FormInput
//                                         name="priority"
//                                         label="Priority"
//                                         type="select"
//                                         containerClass="mb-3"
//                                         className="form-select form-control-light"
//                                         register={register}
//                                         key="priority"
//                                         errors={errors}
//                                         control={control}
//                                     >
//                                         <option value="">Select</option>
//                                         <option value="Low">Low</option>
//                                         <option value="Medium">Medium</option>
//                                         <option value="High">High</option>
//                                     </FormInput>
//                                 </Col>
//                                 <Col md={6}>
//                                     <div className="mb-3">
//                                         <label className="form-label">Due Date</label> <br />
//                                         <HyperDatepicker
//                                             hideAddon
//                                             dateFormat="yyyy-MM-dd"
//                                             value={newTaskDetails.dueDate}
//                                             inputClass="form-control-light"
//                                             onChange={( date ) => {
//                                                 handleDateChange( date );
//                                             }}
//                                         />
//                                     </div>
//                                 </Col>
//                             </Row>

//                             <div className="text-end">
//                                 <Button
//                                     variant="light"
//                                     className="me-1"
//                                     onClick={toggleNewTaskModal}
//                                 >
//                                     Cancel
//                                 </Button>
//                                 <Button variant="primary" type="submit">
//                                     Create
//                                 </Button>
//                             </div>
//                         </form>
//                     </Modal.Body>
//                 </Modal>
//             )}
//         </React.Fragment>
//     );
// };

// export default Tasks;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Row, Col, Card, Dropdown, Modal, Button } from "react-bootstrap";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// components
import PageTitle from "../../../../components/PageTitle";
import HyperDatepicker from "../../../../components/Datepicker";
import { FormInput } from "../../../../components";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import TaskItem from "./Task";

// dummy data
import { tasks, TaskTypes } from "../../Tasks/Board/data";

import defaultAvatar from "../../../../assets/images/users/user-1.jpg";
import { useDispatch } from "react-redux";
import { CreateBoard } from "../../../../redux/Slices/Project/Project";

const Tasks = (props) => {
    const {data}=props
    console.log({data})
    const dispatch=useDispatch()
  const [state, setState] = useState({
    boards: [
      {
        id: "upcomingTasks",
        title: "Upcoming",
        tasks: tasks.filter((t) => t.status === "Upcoming"),
      },
      {
        id: "inprogressTasks",
        title: "In Progress",
        tasks: tasks.filter((t) => t.status === "Inprogress"),
      },
      {
        id: "completedTasks",
        title: "Completed",
        tasks: tasks.filter((t) => t.status === "Completed"),
      },
    ],
  });

  const [totalTasks, setTotalTasks] = useState(tasks.length);
  const [newTaskModal, setNewTaskModal] = useState(false);
  const [editorState, setEditorState] = useState(false);
  const [boardTitle, setBoardTitle] = useState(false);
  const [boardDes, setBoardDes] = useState(false);
  const [newTaskDetails, setNewTaskDetails] = useState(null);
  const [newBoardModal, setNewBoardModal] = useState(false); // State for new board modal

  /*
   * Form validation schema
   */
  const schemaResolver = yupResolver(
    yup.object().shape({
      title: yup.string().required(),
      priority: yup.string().required(),
      description: yup.string().required(),
    })
  );

  /*
   * Form methods
   */
  const methods = useForm({ resolver: schemaResolver });
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = methods;

  /**
   * Toggles the new task modal
   */
  const toggleNewTaskModal = () => {
    setNewTaskModal((prevstate) => !prevstate);
  };

  /**
   * Toggles the new board modal
   */
  const toggleNewBoardModal = () => {
    setNewBoardModal((prevState) => !prevState);
  };

  /**
   * Creates new empty task with given status and queue (board id)
   * @param status
   * @param queue
   */
  const newTask = (status, queue) => {
    setNewTaskDetails({
      dueDate: new Date(),
      userAvatar: [defaultAvatar],
      status: status,
      queue: queue,
    });
    setNewTaskModal(true);
  };

  /**
   * Creates a new board
   * @param values - Form values from new board form
   */
  const handleNewBoard = async() => {
  try {
    const formdata=new FormData()
    formdata.append("project_id",1)
    formdata.append("title",boardTitle)
    formdata.append("desciption",boardDes)
       // Close the modal after adding the new board
       dispatch(CreateBoard(formdata))
       setNewBoardModal(false);
       
    
  } catch (error) {
    
  }

 
  };

  /**
   * When date changes
   * @param {} date
   */
  const handleDateChange = (date) => {
    if (newTaskDetails) {
      setNewTaskDetails({ ...newTaskDetails, dueDate: date });
    }
  };

  // a little function to help us with reordering the result
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  /**
   * Moves an item from one list to another list.
   */
  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    destClone.splice(droppableDestination.index, 0, removed);
    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;
    return result;
  };

  /**
   * Gets the list
   */
  const getList = (id) => {
    const board = state.boards.find((board) => board.id === id);
    return board ? board.tasks : [];
  };

  /**
   * On drag end
   */
  const onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        getList(source.droppableId),
        source.index,
        destination.index
      );
      const updatedBoards = state.boards.map((board) => {
        if (board.id === source.droppableId) {
          return { ...board, tasks: items };
        } else {
          return board;
        }
      });
      setState({ boards: updatedBoards });
    } else {
      const result = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      );
      const updatedBoards = state.boards.map((board) => {
        if (board.id === source.droppableId) {
          return { ...board, tasks: result[source.droppableId] };
        } else if (board.id === destination.droppableId) {
          return { ...board, tasks: result[destination.droppableId] };
        } else {
          return board;
        }
      });
      setState({ boards: updatedBoards });
    }
  };

  /**
   * Handles the new task form submission
   */
  const handleNewTask = (values) => {
    const formData = {
      title: values["title"],
      priority: values["priority"],
      description: values["description"],
    };

    const newTask = {
      ...newTaskDetails,
      ...formData,
      id: totalTasks + 1,
      dueDate: newTaskDetails.dueDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    };

    const updatedBoards = state.boards.map((board) => {
      if (board.id === newTaskDetails.queue) {
        return { ...board, tasks: [...board.tasks, newTask] };
      } else {
        return board;
      }
    });

    setState({ boards: updatedBoards });
    setNewTaskModal(false);
    setTotalTasks(totalTasks + 1);

    // reset the form after submission
    reset();
  };

  return (
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
          {state.boards.map((board) => (
            <Droppable key={board.id} droppableId={board.id}>
              {(provided, snapshot) => (
                <Col lg={4} ref={provided.innerRef}>
                  <Card>
                    <Card.Body>
                      <Dropdown className="float-end" align="end">
                        <Dropdown.Toggle as="a" className="cursor-pointer">
                          <i className="mdi mdi-dots-vertical m-0 text-muted h3"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item>Edit</Dropdown.Item>
                          <Dropdown.Item>Delete</Dropdown.Item>
                          <Dropdown.Item>Add Members</Dropdown.Item>
                          <Dropdown.Item>Add Due Date</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>

                      <h5 className="header-title">{board.title}</h5>
                      <p className="sub-header">Your awesome text goes here.</p>
                      {board.tasks.length === 0 && (
                        <p className="text-center text-muted pt-2 mb-0">
                          No Tasks
                        </p>
                      )}

                      <ul className="sortable-list tasklist list-unstyled">
                        {board.tasks.map((item, index) => (
                          <Draggable
                            key={item.id}
                            draggableId={item.id + ""}
                            index={index}
                          >
                            {(provided) => (
                              <li
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <TaskItem task={item} />
                              </li>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </ul>

                      <Link
                        to="#"
                        className="btn btn-primary w-100 mt-3 waves-effect waves-light"
                        onClick={() => newTask("Pending", board.id)}
                      >
                        <i className="mdi mdi-plus-circle"></i> Add New
                      </Link>
                    </Card.Body>
                  </Card>
                  {provided.placeholder}
                </Col>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </Row>

      {/* Add new task modal */}
      {newTaskDetails && (
        <Modal
          show={newTaskModal}
          onHide={toggleNewTaskModal}
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <h4 className="modal-title">Create New Task</h4>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit(handleNewTask)} className="px-2">
              <FormInput
                name="title"
                label="Title"
                placeholder="Enter title"
                type="text"
                containerClass="mb-3"
                className="form-control form-control-light"
                register={register}
                key="title"
                errors={errors}
                control={control}
              />
              <label className="form-label">Description</label>{" "}
              <Editor
              className={"md:6"}
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={setEditorState}
                editorStyle={{ minHeight: '200px',
                    border: '1px solid #ccc' ,
                    marginBottam:20
                 }}
              />
              
              <Row>
                <Col md={6}>
                  <FormInput
                    name="priority"
                    label="Priority"
                    type="select"
                    containerClass="mb-3"
                    className="form-select form-control-light"
                    register={register}
                    key="priority"
                    errors={errors}
                    control={control}
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
                      value={newTaskDetails.dueDate}
                      inputClass="form-control-light"
                      onChange={(date) => {
                        handleDateChange(date);
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
                <Button variant="primary" type="submit">
                  Create
                </Button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      )}

      {/* Add new board modal */}
      <Modal
        show={newBoardModal}
        onHide={toggleNewBoardModal}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <h4 className="modal-title">Create New Board</h4>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(handleNewBoard)} className="px-2">
            <FormInput
              name="title"
              value={boardTitle}
              onChange={(e)=>{
                setBoardTitle(e.target.value)
              }}
              label="Title"
              placeholder="Enter board title"
              type="text"
              containerClass="mb-3"
              className="form-control form-control-light"
              register={register}
              key="title"
              errors={errors}
              control={control}
            />
            <FormInput
             value={boardDes}
             onChange={(e)=>{
               setBoardDes(e.target.value)
             }}
              name="Description"
              label="Description"
              placeholder="Enter board Description"
              type="text"
              containerClass="mb-3"
              className="form-control form-control-light"
              register={register}
              key="Description"
              errors={errors}
              control={control}
            />

            <div className="text-end">
              <Button
                variant="light"
                className="me-1"
                onClick={toggleNewBoardModal}
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Create
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default Tasks;
