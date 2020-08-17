import React, {Component} from "react";
import Entries from "./Entries";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import NavBar from './components/NavBar';
import stateStore from './stateStore'
import {view} from 'react-easy-state';
import {withRouter} from 'react-router-dom';


class App extends Component {


    get renderEntries() {
        let entries = <h1>No entries found</h1>;
        if (stateStore.search.entries) {
            entries = <Entries list={stateStore.search.entries}/>;
        }
        return entries;
    }

    render() {
        return (
            <div id="app">
                <NavBar/>
                <Container fluid="md">
                    <Row> {this.renderEntries}</Row>
                </Container>
            </div>
        );
    }
}

export default withRouter(view(App));
