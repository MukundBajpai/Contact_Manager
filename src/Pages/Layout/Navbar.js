import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

    return (
        <>
            <nav className="navbar navbar-dark bg navbar-expand-lg">
                <div className="container-fluid">
                    <Link className="navbar-brand font" to="/">Contact<span className="text">Manager</span></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="nav-link" aria-current="page" to="/">ContactList</Link>
                            {/* <Link className="nav-link" to="/addcontact">AddContact</Link>
                            <Link className="nav-link" to="/editcontact">EditContact</Link>
                            <Link className="nav-link" to="/viewcontact/:contactId">ViewContact</Link> */}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;