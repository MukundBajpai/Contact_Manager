import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ContactServices } from '../Services/ContactServices';
import Spinner from './Spinner';

const Viewcontact = () => {

    const { contactId } = useParams();

    const [state, setState] = useState({
        loading: false,
        contacts: {},
        errorMessage: '',
        groups : {}
    });

    useEffect(() => {
        effect();
    }, [contactId]);

    const effect = async () => {
        try {
            setState({ ...state, loading: true });
            const response = await ContactServices.getContact(contactId);
            const groupresponse = await ContactServices.getGroup(response.data);
            setState({
                ...state,
                loading: false,
                contacts: response.data,
                groups: groupresponse.data
            });
        }
        catch (error) {
            setState({
                ...state,
                loading: false,
                errorMessage: error.message
            });
        }
    };

    const { loading, contacts, errorMessage, groups } = state;

    return (
        <>
            <section className="view-contact-intro p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h4 className="h4 text-warning">View Contact</h4>
                            <p className="fst-italic">This is a contact manager website, here we can view the details of a particular user.</p>
                        </div>
                    </div>
                </div>
            </section>
            {
                loading ? <Spinner /> : <>
                    {
                        Object.keys(contacts).length > 0 && Object.keys(groups).length > 0 &&
                        <section className="view-contact mt-3">
                            <div className="container">
                                <div className="card">
                                    <div className="row align-items-center p-5">
                                        <div className="col-md-4">
                                            <img className="img-fluid" src={contacts.photo} alt="icon" />
                                        </div>
                                        <div className="col-md-8">
                                            <ul className="list-group" >
                                                <li className="list-group-item list-group-item-action" >
                                                    Name : <span className="fw-bold">{contacts.name}</span>
                                                </li>
                                                <li className="list-group-item list-group-item-action" >
                                                    Mobile No. : <span className="fw-bold">{contacts.mobile}</span>
                                                </li>
                                                <li className="list-group-item list-group-item-action" >
                                                    Email : <span className="fw-bold">{contacts.email}</span>
                                                </li>
                                                <li className="list-group-item list-group-item-action" >
                                                    Group : <span className="fw-bold">{groups.name}</span>
                                                </li>
                                                <li className="list-group-item list-group-item-action" >
                                                    Company : <span className="fw-bold">{contacts.company}</span>
                                                </li>
                                                <li className="list-group-item list-group-item-action" >
                                                    Title : <span className="fw-bold">{contacts.title}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <Link to={`/`} className="btn btn-warning my-2">Back</Link>
                                    </div>
                                </div>
                            </div>
                        </section>
                    }
                </>
            }
        </>
    );
};

export default Viewcontact;