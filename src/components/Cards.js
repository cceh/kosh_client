import React from "react";
import EntryCard from "./EntryCard";
import CardColumns from 'react-bootstrap/CardColumns';
import {view} from 'react-easy-state';
import {withRouter} from 'react-router-dom';


const Cards = ({results}) => {
    let entries = <h3>Loading...</h3>;

    if (results) {
        entries = results.map((m, i) => <EntryCard key={i} item={m}/>);

    }
    return (
        <CardColumns>
            {entries}
        </CardColumns>
    );
};


export default withRouter(view(Cards));
