import {Form} from "react-bootstrap";
import React from "react";
import {withRouter} from "react-router-dom";
import {view} from "@risingstack/react-easy-state";


const CustomCheckbox = ({labels, handleChange, isChecked}) => {
    if (!labels.length) {
        return null;
    }
    return (
        <Form key="display_fields">
            {['checkbox'].map((type) => (
                <div key={`inline-${type}`}>Display fields : {labels.map(v => (
                    <Form.Check onChange={e => handleChange(e, v)} defaultChecked={isChecked(v)} className="ml-1" inline
                                label={v} type={type} id={`inline-${Math.random()}`} key={Math.random()}/>))}
                </div>
            ))}
        </Form>
    );
}

export default withRouter(view(CustomCheckbox));
