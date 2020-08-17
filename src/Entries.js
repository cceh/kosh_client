import React from "react";
import EntryCard from "./EntryCard";
import CardColumns from 'react-bootstrap/CardColumns';
import {view} from 'react-easy-state';
import {withRouter} from 'react-router-dom';


const Entries = ({list}) => {
    let entries = <h3>Loading...</h3>;
    if (list) {
        entries = list.map((m, i) => <EntryCard key={i} item={m}/>);
    }
    return (
        <CardColumns>
            {entries}
        </CardColumns>
    );
};


export default withRouter(view(Entries));
