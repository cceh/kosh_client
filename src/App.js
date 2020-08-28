import React from "react";
import {view} from 'react-easy-state';
import {withRouter} from 'react-router-dom';
import SearchResults from "./components/SearchResults";
import SearchSettings from "./components/SearchSettings";
import Footer from "./components/Footer";


class App extends React.Component {


    render() {
        return (
            <div id="app">
                <SearchSettings/>
                <SearchResults/>
                <Footer/>
            </div>
        );
    }
}

export default withRouter(view(App));
