import React from "react";
import {view} from 'react-easy-state';
import {withRouter} from 'react-router-dom';
import SearchResults from "./components/SearchResults";
import SearchSettings from "./components/SearchSettings";


class App extends React.Component {


    render() {
        return (
            <div id="app">
                <SearchSettings/>
                <SearchResults/>
            </div>
        );
    }
}

export default withRouter(view(App));
