import React from "react";
import {withRouter} from "react-router-dom";
import {view} from "@risingstack/react-easy-state";
import {Row, Col, Container, Navbar, Alert, Nav} from 'react-bootstrap';
import CustomCheckbox from "./CustomCheckbox";
import stateStore from "../stateStore";
import Table from "./CustomTable";
import ViewSettings from "./ViewSettings";
import Cards from "./Cards";

class SearchResults extends React.Component {

    isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }


    changeView = e => {

        if (e === 'table') {
            stateStore.view.table = true;
            stateStore.view.value = 'table';
        } else if (e === 'card') {
            stateStore.view.table = false;
            stateStore.view.value = 'card';
        }
        console.log(e)
        console.log(stateStore.view.table)
    }


    handleChange = (e, v) => {
        stateStore.results.display_fields[v] = e.target.checked
        console.warn(stateStore.results.display_fields[v], e.target.checked)
    }

    handleIsItChecked(v) {
        return stateStore.results.display_fields[v]
    }

    renderEntries(){
        if (stateStore.search.entries == null) {
            return <Alert key="no_entries" variant="info">Type to search...</Alert>;
        }

        if (this.isEmpty(stateStore.search.entries)) {
            return <Alert key="no_entries" variant="warning"> No entries found</Alert>;
        }

        
        var viewList = Object.keys(stateStore.search.entries).map((key) => {
            if (!this.isEmpty(stateStore.search.entries[key])) {
                if (stateStore.view.table === true) {
                    return <Table key={"table_"+key} results={stateStore.search.entries[key]} header={key}/>
                }
                else {
                    return <Cards key={"cards_"+key} results={stateStore.search.entries[key]} header={key}/>
                    
                }
            }
            return null

        })
        return viewList;
    }


    render() {
        return (
            <Container fluid className="mb-5">
                <Row>
                    <Col>
                        <Navbar bg="light" variant="light" expand="lg" sticky="top">
                            <Navbar.Brand>
                                <h5>Search Results</h5>
                            </Navbar.Brand>
                        </Navbar>
                    </Col>
                </Row>
                <Row>
                </Row>
                <Row>
                    <Col>
                        <Navbar key="display_results" sticky="top" expand="lg" bg="light">
                            <CustomCheckbox labels={stateStore.search.fields} isChecked={this.handleIsItChecked}
                                            handleChange={this.handleChange}/>

                            <Nav className="ml-auto">
                                <ViewSettings onc={this.changeView} />
                            </Nav>

                        </Navbar>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        {this.renderEntries()}
                    </Col>
                </Row>
                <br/>
            </Container>);

    }

}

export default withRouter(view(SearchResults));