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

    renderEntries() {

        if (stateStore.search.entries == null) {
            return <Alert key="no_entries" variant="info">Type to search...</Alert>;
        }

        if (this.isEmpty(stateStore.search.entries)) {
            console.log(stateStore.search.entries[0])
            return <Alert key="no_entries" variant="warning"> No entries found</Alert>;
        }

        if (stateStore.search.entries) {
            var c = [];
            for(var i=0;i<=stateStore.search.entries.length;i++){
                c.push([stateStore.search.entries[i],stateStore.dict_collection.dict_id[i]])
            }
              console.log(c)
            if (stateStore.view.table === true) {
                var tableList = c.map((entry) => <Table results={entry[0]} header={entry[1]}/>)
                return tableList;
            } else {
                var cardList = c.map((entry) => <Cards results={entry[0]} header={entry[1]}/>)
                return cardList;
            }
        }
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