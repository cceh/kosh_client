import {Container, Nav, Navbar} from "react-bootstrap";
import {withRouter} from "react-router-dom";
import {view} from "react-easy-state";
import React from "react";

const Footer = () => {

    return (
        <Container>
            <Navbar className="justify-content-center" bg="dark" variant="dark" expand="lg" fixed="bottom">
                <Nav className="px-5">
                    <a href="https://uni-koeln.de" target="_blank" rel="noopener noreferrer">
                        <img
                            src="../logo_uzk_weiss.png"
                            width="100px"
                            className="d-inline-block align-top"
                            alt=""
                            target="_blank" rel="noopener noreferrer"/>
                    </a>
                </Nav>
                <Nav className="px-5">
                    <a href="https://cceh.uni-koeln.de" target="_blank" rel="noopener noreferrer">
                        <img

                            src="../logo_cceh_weiss.png"
                            width="100px"
                            className="d-inline-block align-top"
                            alt=""
                        />
                    </a>
                </Nav>
                <Nav className="px-5">
                    <a href="https://dch.uni-koeln.de" target="_blank" rel="noopener noreferrer">
                        <img
                            src="../logo_dch_weiss.png"
                            width="100px"
                            className="d-inline-block align-top"
                            alt=""/>
                    </a>
                </Nav>
            </Navbar>
        </Container>
    );

}

export default withRouter(view(Footer));
