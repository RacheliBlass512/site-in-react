import React, { useState, useEffect } from 'react'
import Modal from "react-bootstrap/Modal";
import Form from "./../Form/Form";
import Login from "./../Login/Login";
import Book from '../Book/Book'
import './BooksList.css'

export default function BooksList({
    userDetails,
    updateUserDetails,
    type,
    dataBooks,
    dataUsers
}) {

    const [errorOccurred, seterrorOccurred] = useState(0)
    const f1 = (val) => seterrorOccurred(val);

    const [showErrore, setshowErrore] = useState(false);
    const openErrore = () => setshowErrore(true);
    const closeErrore = () => setshowErrore(false);

    const [showForm, setshowForm] = useState(false);
    const openForm = () => setshowForm(true);
    const closeForm = () => setshowForm(false);

    const [showLogin, setshowLogin] = useState(false);
    const openLogin = () => setshowLogin(true);
    const closeLogin = () => setshowLogin(false);

    useEffect(() => {
        if (errorOccurred) openErrore()
    }, [errorOccurred])

    const list = dataBooks[type].map((item) =>
        <Book key={item.id} itemDetails={item} type={type} userDetails={userDetails} updateUserDetails={updateUserDetails} dataUsers={dataUsers} seterrorOccurred={f1}/>
    )
    return (
        <div>
            <Modal show={showErrore} onHide={closeErrore} centered="true">
                <div className="err">
                    <div className="oops-r">
                        <h3 className="btn-h" dir="rtl">{"אופס..."}</h3>
                        <h5 className="btn-h" dir="rtl">{"נראה שאינך רשום עדיין"}</h5>
                    </div>
                    <button className="err-btn" onClick={() => { closeErrore(); openForm(); }}>
                        <i className="fas fa-user-plus"></i>
                        <p className="btn-p">{"להרשמה"}</p>
                    </button>
                    <button className="err-btn" onClick={() => { closeErrore(); openLogin(); }}>
                        <i className="fas fa-sign-in-alt"></i>
                        <p className="btn-p">{"לכניסה"}</p>
                    </button>
                </div>
            </Modal>
            <Modal show={showForm} onHide={closeForm} centered="true">
                <Form updateUserDetails={updateUserDetails} closeForm={closeForm} />
            </Modal>
            <Modal show={showLogin} onHide={closeLogin} centered="true">
                <Login
                    updateUserDetails={updateUserDetails}
                    closeForm={closeLogin}
                    dataUsers={dataUsers}
                />
            </Modal>

            <div className="grid-container">
                {list}
            </div>
        </div>
    )
}