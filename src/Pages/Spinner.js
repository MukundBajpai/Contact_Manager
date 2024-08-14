import React from 'react';
import spinnerImg from '../Assets/img/spinner.gif';

const Spinner = () => {

    return (
        <>
            <img src={spinnerImg} alt="spinner" className="d-block m-auto" style={{ width: "5vw" }} />
        </>
    );
};

export default Spinner;