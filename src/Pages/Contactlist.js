import React, { useState, useEffect } from 'react';
import { ContactServices } from '../Services/ContactServices';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';


const Contactlist = () => {

    const [query, setQuery] = useState({
        text: ''
    });

    const [state, setState] = useState({
        loading: false,
        contacts: {},
        filteredContacts: {},
        errorMessage: ''
    });

    useEffect(() => {
        effect();
    }, []);

    const effect = async () => {
        try {
            setState({ ...state, loading: true });
            const response = await ContactServices.getAllContacts();
            setState({
                ...state,
                loading: false,
                contacts: response.data,
                filteredContacts: response.data
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

    //for delete the contacts
    const clickDelete = async (contactId) => {
        try {
            const response = await ContactServices.deleteContact(contactId);
            if (response) {
                setState({ ...state, loading: true });
                const response = await ContactServices.getAllContacts();
                setState({
                    ...state,
                    loading: false,
                    contacts: response.data,
                    filteredContacts: response.data
                });
            }
        }
        catch (error) {
            setState({
                ...state,
                loading: false,
                errorMessage: error.message
            });
        }
    };

    // for searching
    const searchContacts = (e) => {
        setQuery({
            ...query,
            text: e.target.value
        });
        const theseContacts = state.contacts.filter(contact => {
            return contact.name.toLowerCase().includes(e.target.value.toLowerCase())
        });
        setState({
            ...state,
            filteredContacts : theseContacts
        });
    };

    const { loading, contacts, filteredContacts, errorMessage } = state;

    return (
        <>
            <pre>{query.text}</pre>
            <section className="contact-search p-3">
                <div className="container">
                    <div className="grid">
                        <div className="row">
                            <div className="col">
                                <p className="h3">Contact Manager</p>
                            </div>
                            <div className="col">
                                <Link to="/addcontact" className="btn btn-primary ms-2" ><i className="fa fa-plus-circle me-2" />New</Link>
                            </div>
                        </div>
                        <p className="fst-italic">This is a contact manager website where the users contact details will be stored here.</p>
                        <div className="row">
                            <div className="col-md-6">
                                <form className="row">
                                    <div className="col">
                                        <div className="mb-2">
                                            <input name="text" value={query.text} onChange={searchContacts} type="text" className="form-control" placeholder="Search Names..." />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="mb-2">
                                            <input type="submit" className="btn btn-outline-dark" value="Search Names..." />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {
                loading ? <Spinner /> : <>
                    <section className="contact-list">
                        <div className="container">
                            <div className="row">
                                {
                                    filteredContacts.length > 0 &&
                                    filteredContacts.map(contacts => {
                                        return (
                                            <>
                                                <div className="col-md-6" key={contacts.id}>
                                                    <div className="card my-2">
                                                        <div className="card-body">
                                                            <div className="row align-items-center d-flex justify-content-around">
                                                                <div className="col-md-4">
                                                                    <img className="img-fluid" src={contacts.photo} alt="icon" />
                                                                </div>
                                                                <div className="col-md-7">
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
                                                                    </ul>
                                                                </div>
                                                                <div className="col-md-1 d-flex flex-column align-items-center">
                                                                    <Link to={`/viewcontact/${contacts.id}`} className="btn btn-warning my-1" ><i className="fa fa-eye" /></Link>
                                                                    <Link to={`/editcontact/${contacts.id}`} className="btn btn-primary my-1" ><i className="fa fa-edit" /></Link>
                                                                    <button className="btn btn-danger my-1" onClick={() => clickDelete(contacts.id)} ><i className="fa fa-trash" /></button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </section>
                </>
            }
        </>
    );
};

export default Contactlist;