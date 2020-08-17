import React from "react";
import Card from 'react-bootstrap/Card';
import {view} from 'react-easy-state';
import {withRouter} from 'react-router-dom';


const EntryCard = props => {
    //const {headword} = props.item;
    //const {translation} = props.item;
    console.log(props)


    var row = Object.keys(props.item).map(function (key) {

        if (Array.isArray(props.item[key])) {
            return <Card.Text><p>{key}</p> {props.item[key].map(r => (<li>{r}</li>))}</Card.Text>;
        } else {
            return <Card.Text>{key}: {props.item[key]}
            </Card.Text>
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
