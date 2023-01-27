import React from "react";
import {view} from "@risingstack/react-easy-state";
import {withRouter} from 'react-router-dom';
import KoshView from "./components/KoshView";


class App extends React.Component {


    render() {
        return (
            <div id="app">
                <KoshView/>
            </div>
        );
    }
}

export default withRouter(view(App));
