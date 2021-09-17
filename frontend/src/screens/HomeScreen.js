import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listListings } from '../actions/listing'
import Loader from '../components/Loader'
import Map from '../components/Map'
import { Modal, Button, Form } from "react-bootstrap";
import { createTask } from '../actions/listing';


const HomeScreen = ({ history }) => {

    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [sector, setSector] = useState('all')

    const dispatch = useDispatch()

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [sectorAdmin, setSectorAdmin] = useState('public');

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const listingList = useSelector(state => state.listingList)
    const { loading, error, listings } = listingList

    const taskCreate = useSelector(state => state.taskCreate)
    const { success: successCreate } = taskCreate

    const taskDelete = useSelector(state => state.taskDelete)
    const { success: successDelete } = taskDelete

    const addModal = () => {
        handleShow()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const obj = {
            "name": name,
            "address": address,
            "latitude": latitude,
            "longitude": longitude,
            "description": description,
            "image": "https://media.spacebase.com/media/cache/spaces/12008/10_szGxH8p_1280.jpg",
            "sector": sectorAdmin,
            "userId": userInfo._id,
        }
        dispatch(createTask(obj))
        handleClose()
        setName('')
        setAddress('')
        setLatitude('')
        setLongitude('')
        setDescription('')
        setSectorAdmin('')
        alert('Created successfully')
    }

    useEffect(() => {
        if (error) {
            alert(error)
        }

        if (!userInfo) {
            history.push('/signin')
        } else {
            dispatch(listListings())
        }
    }, [history, userInfo, error, dispatch, successCreate, successDelete])

    return (
        <>
        {userInfo && userInfo.isAdmin && (
            <div className="my-3 w-100 d-flex justify-content-between">
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button 
                        type="button" 
                        className="btn btn-secondary"
                        onClick={() => setSector('all')}
                    >All</button>
                    <button 
                        type="button" 
                        className="btn btn-secondary"
                        onClick={() => setSector('public')}
                    >Public</button>
                    <button 
                        type="button" 
                        className="btn btn-secondary"
                        onClick={() => setSector('private')}
                    >Private</button>
                </div>
                <div>
                    <button type="button" className="btn btn-success" onClick={addModal}>
                        add
                    </button>
                </div>
            </div>
        )}

        {loading ? <Loader /> : <Map locations={listings} sector={sector} isAdmin={userInfo ? userInfo.isAdmin : false} />}

        <Modal size="lg" show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
            <Modal.Header>
                <Modal.Title>Add Event</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Enter name" required value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Enter address" required value={address} onChange={(e) => setAddress(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Enter latitude" required value={latitude} onChange={(e) => setLatitude(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Enter longitude" required value={longitude} onChange={(e) => setLongitude(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control as="textarea" rows={3} placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Control type="file" />
                </Form.Group>

                <Form.Check inline label="Public" name="group1" type="radio" value="public" checked={sectorAdmin === 'public'} onChange={(e) => setSectorAdmin(e.target.value)} />
                <Form.Check inline label="Private" name="group1" type="radio" value="private" checked={sectorAdmin === 'private'} onChange={(e) => setSectorAdmin(e.target.value)} />

            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" className="btn-sm" type="submit">
                    Save
                </Button>
                <Button variant="danger" className="btn-sm" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
            </Form>
        </Modal>
        </>
    )
}

export default HomeScreen
