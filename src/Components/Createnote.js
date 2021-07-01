import React, { useEffect, Component, useState } from 'react';
import { db } from '../helper/firebase'
import '@fortawesome/fontawesome-free/css/all.min.css';
import Button from '@material-ui/core/Button';
import { MDBInput } from "mdbreact";
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './Createtodo.css';
import Modal from 'react-bootstrap/Modal';
const CreateTodo = ({ uid }) => {
    const [newTopic, setNewTopic] = useState('')
    const [newDecription, setNewDecription] = useState('')
    const [allNotesTopics, setAllNotesTopics] = useState([])
    const [allNotesDescription, setAllNotesDescription] = useState([])

    useEffect(() => {
        toast.configure()
        if (uid) {
            const docRef = db.collection('notes').doc(uid);
            docRef.onSnapshot((userData) => {
                if (userData.exists) {
                    setAllNotesTopics(userData.data().topic);
                    setAllNotesDescription(userData.data().description);
                }
                else {
                    console.log('userData not exist');
                }
            })
        }
        else {
            console.log('please login');
        }
    }, [])
    const saveTodo = () => {
        if (!newTopic) {
            toast.error(<h6>Topic Should not be Empty</h6>, { autoClose: 2500 })
            return
        }
        console.log(`uid ${uid}`);
        db.collection('notes').doc(uid).get().then((res) => {
            console.log('res');
            console.log(res);
        })
        db.collection('notes').doc(uid).set({
            topic: [...allNotesTopics, newTopic],
            description: [...allNotesDescription, newDecription]
        })
        setNewTopic('');
        setNewDecription('');
        toast.success(<h6>Note added</h6>, { autoClose: 2000 })
    }

    const deleteNote = (index) => {
        allNotesTopics.splice(index, 1);
        allNotesDescription.splice(index, 1);
        db.collection('notes').doc(uid).update({
            topic: allNotesTopics,
            description: allNotesDescription
        })
        toast.warning(<h6>Note deleted</h6>, { autoClose: 2000 })
    }



    const Note = ({ topic, index }) => {
        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
        return (
            <>
                <br />
                <div className="oneNote-container">
                    <Button className="oneNote-left" variant="primary" onClick={handleShow}>
                        <div className="oneNote-topic">{topic}</div>
                    </Button>
                    <div className="oneNote-delete">
                        <Link to='#' className="fas fa-trash " onClick={() => { deleteNote(index) }} />
                    </div>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{topic}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <h4 className="modal-description">{allNotesDescription[index]}</h4>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => { deleteNote(index) }}>Delete</Button>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>

                    </Modal.Footer>
                </Modal>
            </>
        )
    }

    return (
        <div className='createnote-main'>
            <div className="createnote-container">
                <MDBInput
                    value={newTopic}
                    className='textarea-sign'
                    onChange={(e) => { setNewTopic(e.target.value) }}
                    label="Topic"
                    icon="pencil-alt" />
                <MDBInput
                    type="textarea"
                    label="Description"
                    rows="3"
                    icon="edit"
                    className='textarea-sign'
                    value={newDecription}
                    onChange={(e) => { setNewDecription(e.target.value) }}
                />
                <Button style={{ marginBottom: '20px' }} onClick={saveTodo} variant="contained" color="primary">
                    Add
                </Button>

                <div className="show-notes">
                    {
                        allNotesTopics.length ?
                            allNotesTopics.map((topic, index) => {
                                return <Note key={index} topic={topic} index={index} />
                            })
                            : <div className="noNote">
                                No Notes Created
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default CreateTodo
