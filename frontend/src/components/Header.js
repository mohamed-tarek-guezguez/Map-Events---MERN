import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/user'

const Header = () => {

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>Events</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            {
                                userInfo ? (
                                    <NavDropdown title={userInfo.name} id='username'>
                                        {userInfo && userInfo.isAdmin && (
                                            <LinkContainer to='/dashboard'>
                                                <NavDropdown.Item><i className='fas fa-wrench'></i>&nbsp;Dashboard</NavDropdown.Item>
                                            </LinkContainer>
                                        )}
                                        <NavDropdown.Item onClick={logoutHandler}>
                                        <i className='fas fa-sign-out-alt'></i>&nbsp;Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                ) : (
                                    <>
                                    <LinkContainer to='/signin'>
                                        <Nav.Link>
                                            <i className='fas fa-user'></i>&nbsp;Login
                                        </Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to='/signup'>
                                        <Nav.Link>
                                            <i className='fas fa-user-plus'></i>&nbsp;Register
                                        </Nav.Link>
                                    </LinkContainer>
                                    </>
                                )
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
