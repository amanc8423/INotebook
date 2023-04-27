import React, { useEffect, useState, useRef } from 'react'
import {  useNavigate } from 'react-router-dom'

const Setting = () => {
    let [username, setUsername] = useState("Loading...");
    let [email, setEmail] = useState("Loading...");
    // const host = "https://my-inotebook-api.herokuapp.com"
    const refDelete = useRef(null);

    const history = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token')
        history('/login')
    }

    const getUserData = async () => {
        const response = await fetch(`http://localhost:5000/api/auth/getuser`, {
            method: "GET",
            headers: {
                'Content-Type': 'applicatin/json',
                'auth-token': localStorage.getItem('token')
            }
        })
        const json = await response.json();
        setUsername(json.name)
        setEmail(json.email)
    }

    const deleteClick = () => {
        refDelete.current.click()
    }

    const handleDelete = async () => {
        const response = await fetch(`http://localhost:5000/api/auth/deleteuser`, {
            method: "GET",
            headers: {
                'Content-Type': 'applicatin/json',
                'auth-token': localStorage.getItem('token')
            }
        })
        const json = response.json()
        console.log(json);
        localStorage.clear('token')
        history('/login')


    }

    useEffect(() => {
        getUserData()
    })
    return (
        <>
            <button ref={refDelete} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Do you really want to delete your account ? </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleDelete} type="button" className="btn btn-primary">Delete Account</button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
               
                <div className="my-3">
                    <button onClick={handleLogout} type="button" className="btn btn-outline-danger">Signout</button>
                </div>

            </div>
        </>
    )
}

export default Setting