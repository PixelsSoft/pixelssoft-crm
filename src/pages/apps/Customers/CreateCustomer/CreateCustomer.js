import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageTitle from '../../../../components/PageTitle';
import { toast } from 'react-toastify';
import { CreateCustomerAPI } from '../../../../redux/Slices/Customer/customer';
import Spinner from '../../../../components/Spinner';
import { startLoading, stopLoading } from '../../../../redux/Slices/utiltities/Utiltities';
import { useNavigate } from 'react-router-dom';
import utils from '../../../../utils/utils';
import { FormInput } from '../../../../components';
import {CountryList} from '../List/data'

const CreateCustomer = () => {
    const navigate = useNavigate();
 
    const dispatch = useDispatch()
    const [email, setEmail] = useState( '' );
    const [fullName, setFullName] = useState( '' );
    const [phoneNumber, setPhoneNumber] = useState( '' );
    const [paidAm, setPaidAm] = useState( 0 );
   
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');


    const reset = () => {
        setEmail( '' );
        setFullName( '' );
        setPhoneNumber( '' );
        setPaidAm( 0 );
        setAddress('')
        setCountry('')

    }

    const { token, user, category, plat, loading } = useSelector(
        ( state ) => ( {
            token: state.Auth.token,
            user: state.Auth,
            category: state.Category.category,
            plat: state.Platform.platform,
            loading: state.utiltities.loading,
        } )
    );

    const onSubmit = async ( e ) => {
        e.preventDefault();

        if ( email === "" || fullName==="" || phoneNumber ===""|| paidAm==="" || country===''
         ) {
            return toast.error( 'Enter All Field please', { position: toast.POSITION.TOP_RIGHT } );
        };
     

        if ( !utils.validateEmail( email ) ) {
            return toast.error( 'Enter correct email', { position: toast.POSITION.TOP_RIGHT } );
        };
        const formData = new FormData();
        formData.append( 'email', email );
        formData.append( 'full_name', fullName );
        formData.append( 'phone', phoneNumber );
        formData.append( 'address', address );
        formData.append( 'paid_amount', paidAm );
        formData.append( 'country', country );
     
      
        dispatch( startLoading() );
        await dispatch( CreateCustomerAPI( formData, token, reset ) )
        navigate(-1);
        dispatch( stopLoading() );
    };



    const phoneFunc = ( e ) => {
        if ( e.target.value >= 0 ) {
            setPhoneNumber( e.target.value );
        }
    }

    const paidFunc = ( e ) => {
        if ( e.target.value >= 0  ) {
            setPaidAm( e.target.value );
        }
    }



    return loading ? (
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <Spinner className="m-2" color={'primary'} />
        </div>
    ) : (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: "Customer", path: "/apps/customer/" },
                    { label: "Add Customer", path: "/apps/customer/addCustomer", active: true },
                ]}
                title={"Add Customer"}
            />
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={onSubmit}>
                                {/* {error && (
                                    <Alert variant="danger" className="my-2">
                                        {error}
                                    </Alert>
                                )}
                                {data && (
                                    <Alert variant="success" className="my-2">
                                        {data.message}
                                    </Alert>
                                )} */}
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Email"
                                            value={email}
                                            onChange={( e ) => setEmail( e.target.value )}
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control value={fullName} onChange={( e ) => setFullName( e.target.value )} />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control
                                            type='number'
                                            value={phoneNumber}
                                            onChange={( e ) => phoneFunc( e )}
                                        />
                                    </Form.Group>
                                </Row>


                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control
                                            value={address}
                                            onChange={( e ) => setAddress( e.target.value )}
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Paid Amount</Form.Label>
                                        <Form.Control
                                            type='number'
                                            value={paidAm}
                                            onChange={( e ) => paidFunc( e )}
                                        />
                                    </Form.Group>
                                    <FormInput
                                label="Country"
                                name="select"
                                type="select"
                                className="form-select"
                                key="select"
                                value={country}
                                onChange={( e ) => setCountry( e.target.value )}
                            >
                                <option>no Selected</option>
                                {CountryList?.map( val => {
                                    return (
                                        <option key={val.id} value={val.name}> {val.name} </option>
                                    );
                                } )}
                            </FormInput>

                                </Row>

                      
                                <Row>
                                    <Col>
                                        <Button
                                            type="button"
                                            className="waves-effect waves-light"
                                            variant="outline-primary"
                                            onClick={() => navigate( '/apps/customers' )}
                                        >
                                            Cancel
                                        </Button>
                                        <Button type="submit" className="waves-effect waves-light mx-2">
                                            Save
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default CreateCustomer;
