// import { useEffect, useState } from 'react'
// import { Button, Col, Form, Modal } from 'react-bootstrap'
// import FormInput from './FormInput';
// import { useDispatch, useSelector } from 'react-redux';
// import { GetProjectById, UpdateProject } from '../redux/Slices/Project/Project';
// import Spinner from './Spinner';
// import { startLoading, stopLoading } from '../redux/Slices/utiltities/Utiltities';
// import { GetPortalProjectById } from '../redux/Slices/PortalProject/PortalProject';

// const EditPortalProject = ( { projectId, editUserModal, toggleEditModal } ) => {

//     const { token, project, loading, plat, employee, category } = useSelector(
//         ( state ) => ( {
//             token: state.Auth.token,
//             category: state.Category.category,
//             project: state.Projects.proectById,
//             loading: state.utiltities.loading,
//             plat: state.Platform.platform,
//             employee: state.Employees.employees,
//         } )
//     );

//     const dispatch = useDispatch();
//     const [title, setTitle] = useState( project?.title );
//     const [desc, setDesc] = useState( project?.description );
//     const [platform, setPlatform] = useState( project?.platform_id )
//     const [salePerson, setSalePerson] = useState( project?.category_id );
//     const [data, setData] = useState( [] );
//     const [bidBy, setBidBy] = useState( project?.bidby?.id );
//     const [perName, setPerName] = useState( project?.closedby?.id );
//     const [total, setTotal] = useState( project?.total_amount );
//     const [paidAm, setPaidAm] = useState( project?.platform_id );
//     const [currency, setCurrency] = useState("USD");

//     const update = async () => {
//         const data = {
//             title: title,
//             description: desc,
//             bid_by: bidBy,
//             closed_by: salePerson,
//             platform_id: platform,
//             category_id: perName,
//             paid_amount: paidAm,
//             amount: total
//         };
//         dispatch( startLoading() );
//         await dispatch( UpdateProject( projectId, data, token, toggleEditModal ) );
//         dispatch( stopLoading() );
//     }

//     const selectPlat = ( e ) => {
//         setPlatform( e.target.value );
//     };

//     const changeCat = ( e ) => {
//         setSalePerson( e.target.value );
//     };

//     const getProject = async () => {
//         // dispatch(startLoading());

//         const response=await dispatch( GetPortalProjectById( projectId, token ) );
//         console.log( "response", response );
//         setTitle( response?.title );
//         setDesc( response?.description );
//         setPlatform( response?.platform_id );

//         setSalePerson( response?.category_id );
//         // setBidBy( response?.bidby?.id );
//         setPerName( response?.closedby?.id );
//         setPaidAm( response?.paid_amount );
//         setTotal( response?.amount );
//         setCurrency( response?.currency );
//         // dispatch(stopLoading());
//     };

//     const filterSales = () => {
//         if ( employee.length > 0 ) {
//             const filteredArray = employee.filter( ( item ) => item.roles.some( ( role ) => role.name === "Sales" ) );
//             setData( filteredArray );
//         };
//     };

//     useEffect( () => {
//         filterSales();
//     }, [employee] );

//     useEffect( () => {
//         getProject();
//     }, [] );

//     return loading ? (
//         <div className='d-flex justify-content-center align-items-center vh-100'>
//             <Spinner className="m-2" color={'primary'} />
//         </div>
//     ) : (
//         <Modal show={editUserModal} onHide={toggleEditModal} centered>
//             <Modal.Header closeButton>
//                 <Modal.Title as="h4">Edit Project</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <FormInput
//                     label={'Title'}
//                     type="text"
//                     name="name"
//                     placeholder="Enter title"
//                     containerClass={'mb-3'}
//                     value={title}
//                     onChange={e => setTitle( e.target.value )}
//                 />

//                 <FormInput
//                     label={'Description'}
//                     type="text"
//                     name="position"
//                     placeholder="Enter description"
//                     containerClass={'mb-3'}
//                     value={desc}
//                     onChange={e => setDesc( e.target.value )}
//                 />
//                       <Form.Group as={Col} controlId="formGridState">
//                                     <Form.Label>Currency</Form.Label>
//                                     <Form.Select
//                                       value={currency}
//                                       onChange={(e) => setCurrency(e.target.value)}
//                                     >
//                                       <option value={undefined}>Choose...</option>
//                                       <option value="PKR">Pakistani Rupee (PKR)</option>
//                                       <option value="GBP">UK Pound (GBP)</option>
//                                       <option value="USD">US Dollars (USD)</option>
//                                       <option value="EUR">Europe EURO (EUR)</option>
//                                       <option value="CAD">Canadian Dollars (CAD)</option>
//                                     </Form.Select>
//                                   </Form.Group>

//                 {/* <FormInput
//                     label="Bid By"
//                     name="select"
//                     type="select"
//                     className="form-select"
//                     key="Bid"
//                     value={bidBy}
//                     onChange={( e ) => setBidBy( e.target.value )}
//                 >
//                     <option>no Selected</option>
//                     {data?.map( val => {
//                         return (
//                             <option key={val.id} value={val.id}>{val.name}</option>
//                         );
//                     } )}
//                 </FormInput>
//                 <FormInput
//                     label="Close By"
//                     name="select"
//                     type="select"
//                     className="form-select"
//                     key="Close"
//                     value={perName}
//                     onChange={( e ) => setPerName( e.target.value )}
//                 >
//                     <option>no Selected</option>
//                     {data?.map( val => {
//                         return (
//                             <option key={val.id} value={val.id}>{val.name}</option>
//                         );
//                     } )}
//                 </FormInput> */}
//                 <FormInput
//                     label="Platform"
//                     name="select"
//                     type="select"
//                     className="form-select"
//                     key="Platform"
//                     value={platform}
//                     onChange={( e ) => selectPlat( e )}
//                 >
//                     <option>no Selected</option>
//                     {plat?.map( val => {
//                         return (
//                             <option key={val.id} value={val.id}>{val.title}</option>
//                         );
//                     } )}
//                 </FormInput>
//                 <FormInput
//                     label="category"
//                     name="select"
//                     type="select"
//                     className="form-select"
//                     key="category"
//                     value={salePerson}
//                     onChange={( e ) => changeCat( e )}
//                 >
//                     <option>no Selected</option>
//                     {category?.map( val => {
//                         return (
//                             <option key={val.id} value={val.id}>{val.title}</option>
//                         );
//                     } )}
//                 </FormInput>

//                 {/* <FormInput
//                     label={'Paid amount'}
//                     type="number"
//                     name="salary"
//                     placeholder="Enter Paid Amount"
//                     containerClass={'mb-3'}
//                     value={paidAm}
//                     onChange={e => setPaidAm( e.target.value )}
//                 /> */}

//                 <FormInput
//                     label={'Total amount'}
//                     type="number"
//                     name="phone"
//                     placeholder="Enter Total Amount"
//                     containerClass={'mb-3'}
//                     value={total}
//                     onChange={e => setTotal( e.target.value )}
//                 />
//                 <Button variant="dark" className="waves-effect waves-light me-1" type="submit" onClick={update}>
//                     Save
//                 </Button>
//                 <Button variant="danger" className="waves-effect waves-light" onClick={toggleEditModal}>
//                     Cancel
//                 </Button>
//             </Modal.Body>
//         </Modal>
//     )
// }

// export default EditPortalProject


import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import FormInput from "./FormInput";
import { useDispatch, useSelector } from "react-redux";

import { useRef } from "react";


import Spinner from "./Spinner";
import {
  startLoading,
  stopLoading,
} from "../redux/Slices/utiltities/Utiltities";
import {
  GetPortalProjectById,
  UpdateProject,
} from "../redux/Slices/PortalProject/PortalProject";

const EditPortalProject = ({ projectId, editUserModal, toggleEditModal }) => {
  const dispatch = useDispatch();
  const { token, project, plat, category } = useSelector((state) => ({
    token: state.Auth.token,
    category: state.Category.category,
    project: state.Projects.proectById,
   
    plat: state.Platform.platform,
  }));

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    platform_id: "",
    category_id: "",
    amount: "",
    currency: "USD",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const isFetched = useRef(false);

useEffect(() => {
 
    getProject();
  
}, [ projectId]);

  const update = async () => {
    const data = new FormData();
    data.append("id", projectId);
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("platform_id", formData.platform_id);
    data.append("category_id", formData.category_id);
    data.append("amount", formData.amount);
    data.append("currency", formData.currency);

    dispatch(startLoading());
    await dispatch(UpdateProject(data, token, toggleEditModal));
    dispatch(stopLoading());
  };

  const getProject = async () => {
    setLoading(true);
    const response = await dispatch(GetPortalProjectById(projectId, token));
    setFormData({
      title: response?.title || "",
      description: response?.description || "",
      platform_id: response?.platform_id || "",
      category_id: response?.category_id || "",
      amount: response?.amount || "",
      currency: response?.currency || "USD",
    });
    setLoading(false);

    // dispatch(stopLoading());
  };


  const isLoading = loading || !project;

  return (
    <Modal show={editUserModal} onHide={toggleEditModal} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title as="h4">Edit Project</Modal.Title>
      </Modal.Header>
    {isLoading ?
        <div className="d-flex justify-content-center align-items-center ">
        <Spinner className="m-2" color="primary" />
      </div>:

      <Modal.Body>
        <Form>
          <Row className="mb-3">
            <Col md={6}>
              <FormInput
                label="Title"
                type="text"
                placeholder="Enter title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </Col>
            <Col md={6}>
              <FormInput
                label="Description"
                type="text"
                placeholder="Enter description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="currencySelect">
                <Form.Label>Currency</Form.Label>
                <Form.Select
                  value={formData.currency}
                  onChange={(e) => handleChange("currency", e.target.value)}
                >
                  <option value="">Choose...</option>
                  <option value="PKR">Pakistani Rupee (PKR)</option>
                  <option value="GBP">UK Pound (GBP)</option>
                  <option value="USD">US Dollars (USD)</option>
                  <option value="EUR">Europe EURO (EUR)</option>
                  <option value="CAD">Canadian Dollars (CAD)</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Platform</Form.Label>
                <Form.Select
                  value={formData.platform_id}
                  onChange={(e) => handleChange("platform_id", e.target.value)}
                >
                  <option value="">Select Platform</option>
                  {plat?.map((val) => (
                    <option key={val.id} value={val.id}>
                      {val.title}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Select
                  value={formData.category_id}
                  onChange={(e) => handleChange("category_id", e.target.value)}
                >
                  <option value="">Select Category</option>
                  {category?.map((val) => (
                    <option key={val.id} value={val.id}>
                      {val.title}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <FormInput
                label="Total Amount"
                type="number"
                placeholder="Enter Total Amount"
                value={formData.amount}
                onChange={(e) => handleChange("amount", e.target.value)}
              />
            </Col>
          </Row>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button variant="dark" onClick={update}>
              Save
            </Button>
            <Button variant="danger" onClick={toggleEditModal}>
              Cancel
            </Button>
          </div>
        </Form>
      </Modal.Body>
}
    </Modal>
  );
};

export default EditPortalProject;
