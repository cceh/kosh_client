import React from "react";
import {withRouter} from "react-router-dom";
import {view} from "react-easy-state";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import CustomCheckbox from "./CustomCheckbox";
import stateStore from "../stateStore";
import Alert from "react-bootstrap/Alert";
import Container from 'react-bootstrap/Container';
import Entries from "../Entries";

class SearchResults extends React.Component {

    isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }


    handleChange(e, v) {
        stateStore.results.display_fields[v] = e.target.checked
        console.log(stateStore.results.display_fields)
    }

    handleIsItChecked(v) {
        return stateStore.results.display_fields.valueOf(v)

    }


    renderEntries() {

        if (stateStore.search.entries == null) {
            return <Alert key="no_entries" variant="info">Type to search...</Alert>;
        }

        if (this.isEmpty(stateStore.search.entries)) {
            return <Alert key="no_entries" variant="warning"> No entries found</Alert>;
        }

        if (stateStore.search.entries) {
            return <Entries results={stateStore.search.entries}/>;
        }


    }


    render() {
        return (
            <Container fluid>
                <Row>
                    <Col><Navbar bg="light" variant="light" expand="lg" sticky="top">
                        <Navbar.Brand>
                            Search Results
                        </Navbar.Brand></Navbar>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Navbar key="display_checkbox" sticky="top" expand="lg" bg="light">
                            <CustomCheckbox labels={stateStore.search.fields} isChecked={this.handleIsItChecked}
                                            handleChange={this.handleChange}/>
                        </Navbar>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        {this.renderEntries()}
                    </Col>
                </Row>
            </Container>);

    }

}

export default withRouter(view(SearchResults));