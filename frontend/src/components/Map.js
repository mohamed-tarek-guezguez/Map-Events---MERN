import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { useDispatch } from 'react-redux'
import { deleteTask } from '../actions/listing'
import pin from "../images/pin.png";
import { Modal, Button } from "react-bootstrap";

const Map = ({ locations, sector, isAdmin }) => {
    
    const dispatch = useDispatch()

    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const markerStyle = {
        position: "absolute",
        top: "100%",
        left: "50%",
        transform: "translate(-50%, -100%)"
    };
    
    const defaultProps = {
        center: {
            lat: 60.192059,
            lng: 24.945831
        },
        zoom: 11
    };
    
    const [myId, setMyId] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [sectorAdmin, setSectorAdmin] = useState('');

    const details = (myIdTemp, name, address, latitude, longitude, description, image, sectorAdmin) => {
        setMyId(myIdTemp)
        setName(name)
        setAddress(address)
        setLatitude(latitude)
        setLongitude(longitude)
        setDescription(description)
        setImage(image)
        setSectorAdmin(sectorAdmin)
        handleShow()
    }

    const deleteHandler = () => {
        dispatch(deleteTask(myId))
        alert("Successfully deleted")
    }

    return (
        <>
        <div style={{ height: "100vh", width: "100%" }}>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: "AIzaSyA16d9FJFh__vK04jU1P64vnEpPc3jenec"
                }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
            {locations.map((item, index) => {
                if (sector === 'all') {
                    return (
                        <button type="button" onClick={() => details(
                            item._id, 
                            item.name, 
                            item.address,
                            item.latitude,
                            item.longitude,
                            item.description,
                            item.image,
                            item.sector
                        )} key={index} lat={item.latitude} lng={item.longitude}>
                            <img style={markerStyle} src={pin} alt="pin" />
                        </button>
                    );
                } else {
                    if (sector === 'public' && item.sector === 'public') {
                        return (
                            <button type="button" onClick={() => details(
                                item.name, 
                                item.address
                            )} key={index} lat={item.latitude} lng={item.longitude}>
                                <img style={markerStyle} src={pin} alt="pin" />
                            </button >
                        );
                    } else if (sector === 'private' && item.sector === 'private') {
                        return (
                            <button type="button" onClick={() => details(
                                item.name, 
                                item.address
                            )} key={index} lat={item.latitude} lng={item.longitude}>
                                <img style={markerStyle} src={pin} alt="pin" />
                            </button >
                        );
                    } 
                }
            })}
            </GoogleMapReact>
        </div>

        <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>Event Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><b>Name:</b> {name}</p>
                <p><b>Address:</b> {address}</p>
                <p><b>Latitude:</b> {latitude}</p>
                <p><b>Longitude:</b> {longitude}</p>
                <p><b>Description:</b> {description}</p>
                <p><b>Image:</b></p>
                <img src={image} alt="event-picture" className="w-100" />
                {isAdmin && (
                    <>
                    <p className="mt-3"><b>Sector:</b> {sectorAdmin}</p>
                    <p className="text-center mt-4">
                        <button className="btn btn-primary mx-2">update</button>
                        <button className="btn btn-danger mx-2" onClick={() => deleteHandler()}>delete</button>
                    </p>
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" className="btn-sm" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default Map
