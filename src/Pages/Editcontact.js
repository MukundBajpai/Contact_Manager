import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ContactServices } from '../Services/ContactServices';
import Spinner from './Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Editcontact = () => {

    const navigate = useNavigate();

    const { contactId } = useParams();

    const [state, setState] = useState({
        loading: false,
        contacts: {
            name: '',
            photo: '',
            mobile: '',
            email: '',
            title: '',
            company: '',
            // group: ''
        },
        errorMessage: '',
        // groups: {}
    });

    useEffect(() => {
        effect();
    }, [contactId]);

    const effect = async () => {
        try {
            setState({ ...state, loading: true });
            const response = await ContactServices.getContact(contactId);
            const groupresponse = await ContactServices.getGroups();
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

    const updateInput = (event) => {
        setState({
            ...state,
            contacts: {
                ...state.contacts,
                [event.target.name]: event.target.value
            }
        });
    };

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const response = await ContactServices.updateContact(state.contacts, contactId);
            if (response) {
                toast.success("Updated successfully!!", {
                    position: "top-center",
                    autoClose: 1000,
                    theme: "colored"
                });
                setTimeout(() => navigate('/', { replace: true }), 2000);
            }
        }
        catch (error) {
            setState({
                ...state,
                errorMessage: error.message
            });
            navigate(`/editcontact/${contactId}`, { replace: false });
        }

    }

    const { loading, contacts, errorMessage, groups } = state;

    return (
        <>
            <ToastContainer />
            {
                loading ? <Spinner /> : <>
                    <section className="add-contact p-3">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <h4 className="h4 text-info">Edit Contact</h4>
                                    <p className="fst-italic">This is a contact manager website, here we can edit user details.</p>
                                </div>
                            </div>
                            <div className="row align-items-center">
                                <div className="col-md-4">
                                    <form onSubmit={e => onSubmit(e)}>
                                        <div className="mb-2">
                                            <input required="true" name="name" value={contacts.name} onChange={updateInput} type="text" className="form-control" placeholder="Name" />
                                        </div>
                                        <div className="mb-2">
                                            <input required="true" name="photo" value={contacts.photo} onChange={updateInput} type="text" className="form-control" placeholder="Photo URL" />
                                        </div>
                                        <div className="mb-2">
                                            <input required="true" name="mobile" value={contacts.mobile} onChange={updateInput} type="number" className="form-control" placeholder="Mobile No." />
                                        </div>
                                        <div className="mb-2">
                                            <input required="true" name="email" value={contacts.email} onChange={updateInput} type="email" className="form-control" placeholder="Email" />
                                        </div>
                                        <div className="mb-2">
                                            <input required="true" name="title" value={contacts.title} onChange={updateInput} type="text" className="form-control" placeholder="Title" />
                                        </div>
                                        <div className="mb-2">
                                            <input required="true" name="company" value={contacts.company} onChange={updateInput} type="text" className="form-control" placeholder="Company" />
                                        </div>
                                        <div className="mb-2">
                                            <select required="false" name="group" value={contacts.group} onChange={updateInput} className="form-control">
                                                <option value="">Select a Group</option>
                                                {
                                                    groups.length > 0 &&
                                                    groups.map(groups => {
                                                        return (
                                                            <option key={groups.id} value={groups.id}>{groups.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="mb-2">
                                            <input type="submit" className="btn btn-primary" value="Update" />
                                            <Link to={`/`} className="btn  btn-dark ms-2">Cancel</Link>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-md-6">
                                    <img className="img-fluid" src={contacts.photo} alt="icon" />
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            }
        </>
    );
};

export default Editcontact;