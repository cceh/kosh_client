import React from "react";
import EntryCard from "./EntryCard";
import CardColumns from 'react-bootstrap/CardColumns';
import {view} from "@risingstack/react-easy-state";
import {withRouter} from 'react-router-dom';


const Cards = ({results,header}) => {
    let entries = <h3>Loading...</h3>;

    if (results) {
        entries = results.map((m, i) => <EntryCard key={i} item={m}/>);

    }
    return (
        <>
        <h2>{header}</h2>
        <CardColumns>
            {entries}
        </CardColumns>
        </>
    );
};


export default withRouter(view(Cards));
