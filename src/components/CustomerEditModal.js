import React, { useEffect, useState } from 'react'
import { Button, Form, Modal, Col } from 'react-bootstrap'
import FormInput from './FormInput'
import { useDispatch, useSelector } from 'react-redux'
import { GetSingleCustomer, UpdateCustomerAPI } from '../redux/Slices/Customer/customer'
import { toast } from 'react-toastify'
import { startLoading, stopLoading } from '../redux/Slices/utiltities/Utiltities'
import Spinner from './Spinner'
import {CountryList} from '../../src/pages/apps/Customers/List/data'
const CustomerEditModal = ( { profileId, editUserModal, toggleClose } ) => {
    const dispatch = useDispatch();

    const { token, plat, category, loading } = useSelector(
        ( state ) => ( {
            token: state.Auth.token,
      
            plat: state.Platform.platform,
            category: state.Category.category,
            loading: state.utiltities.loading,
        } )
    );

  


   
    const [country, setCountry] = useState(profileId?.country);
    const [address, setAddress] = useState(profileId?.address);
    const [name, setName] = useState( profileId?.full_name );
    const [email, setEmail] = useState( profileId?.email );
    const [phone, setPhone] = useState( profileId?.phone );

    const [paidAm, setPaidAm] = useState( profileId?.paid_amount );
 


    const 
    update = async ( e ) => {
        // e.preventDefault();

        if ( !email ) {
            return toast.error( 'Enter Email', { position: toast.POSITION.TOP_RIGHT } );
        };
        
        const formData = new FormData();
        
        formData.append( 'email', email );
        formData.append( 'full_name', name );
        formData.append( 'phone', phone );
        formData.append( 'address', address );
        formData.append( 'paid_amount', paidAm );
        formData.append( 'country', country );
     
        dispatch( startLoading() );
        await dispatch( UpdateCustomerAPI( profileId?.customer_id, formData, token, toggleClose ) );
 

        dispatch( stopLoading() );
    }



   


    return loading ? (
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <Spinner className="m-2" color={'primary'} />
        </div>
    ) : (
        <Modal show={editUserModal} onHide={toggleClose} centered>
            <Modal.Header onHide={toggleClose} closeButton>
                <Modal.Title as="h4">Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormInput
                    label={'Name'}
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    containerClass={'mb-3'}
                    value={name}
                    onChange={( e ) => setName( e.target.value )}
                />

                <FormInput
                    label={'Email'}
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    containerClass={'mb-3'}
                    value={email}
                    onChange={( e ) => setEmail( e.target.value )}
                />

             

                <FormInput
                    label={'Paid Amount'}
                    type="number"
                    name="paid"
                    placeholder="Enter Paid Amount"
                    containerClass={'mb-3'}
                    value={paidAm}
                    onChange={e => setPaidAm( e.target.value )}
                />

            

             

               
                <FormInput
                    label={'Phone #'}
                   type="number"
                    name="phone"
                    placeholder="Enter Phone #"
                    containerClass={'mb-3'}
                    value={phone}
                    onChange={e => setPhone( e.target.value )}
                />
                  <FormInput
                    label={'Address #'}
                    type="text"
                    name="phone"
                    placeholder="Enter Address #"
                    containerClass={'mb-3'}
                    value={address}
                    onChange={e => setAddress( e.target.value )}
                />
                  <FormInput
                                label="Country"
                                name="select"
                                type="select"
                                className="form-select"
                                containerClass={'mb-3'}
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
              
                <Button variant="dark" className="waves-effect waves-light me-1" type="submit" onClick={() => update()}>
                    Update
                </Button>
                <Button variant="danger" className="waves-effect waves-light" onClick={toggleClose}>
                    Cancel
                </Button>
            </Modal.Body>
        </Modal>
    )
}

export default CustomerEditModal