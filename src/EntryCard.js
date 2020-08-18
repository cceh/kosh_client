import React from "react";
import {Card, Badge} from 'react-bootstrap';
import {view} from 'react-easy-state';
import {withRouter} from 'react-router-dom';


const EntryCard = props => {


    delete props.item.created;
    delete props.item.xml;
    delete props.item.id;


    var row = Object.keys(props.item).map(key => {

        if (Array.isArray(props.item[key])) {
            return <div key={key}>
                <Badge variant="primary">{key}:</Badge>
                <div>
                    {props.item[key].map(r => (<li key={r}>{r}</li>))}</div>
            </div>;
        } else {
            return <div key={key}>
                <Badge variant="primary">{key}:</Badge>
                <div>{props.item[key]}</div>
            </div>
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
