import React from "react";
import {Card, Badge} from 'react-bootstrap';
import {view} from 'react-easy-state';
import {withRouter} from 'react-router-dom';
import stateStore from "./stateStore";


const EntryCard = props => {


    var row = Object.keys(props.item).map(k => {

        if (stateStore.results.display_fields[k] === true) {
            if (Array.isArray(props.item[k])) {
                return <div key={k}>
                    <Badge variant="primary">{k}:</Badge>
                    <div>
                        {props.item[k].map(r => (<li key={r}>{r}</li>))}</div>
                </div>;
            } else {
                if (k === "xml") {
                    const format = require('xml-formatter');
                    let xml = props.item[k];
                    let formattedXml = format(xml);
                    return <div key={k}>
                        <Badge variant="primary">{k}:</Badge>
                        <pre>{formattedXml}</pre>
                    </div>
                } else {
                    return <div key={k}>
                        <Badge variant="primary">{k}:</Badge>
                        <div>{props.item[k]}</div>
                    </div>
                }
            }
        } else {
            return null;
        }
    });

    return (
        <Card>
            <Card.Body>
                {row}
            </Card.Body>
        </Card>
    );
};

export default withRouter(view(EntryCard));
