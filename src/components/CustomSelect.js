import {Form} from  "react-bootstrap";
import React from "react";
import {withRouter} from "react-router-dom";
import {view} from "react-easy-state";


const CustomSelect = ({list, onc, label, preselected}) => {
    if (!list.length) {
        return null;
    }
    return (
        <Form  inline>
            <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label className="mr-1 ml-1">{label}</Form.Label>
                <Form.Control value={preselected} as="select" onChange={v => onc(v)} custom>
                    {list.map(v => (
                        <option
                            key={'quick_field_' + v}
                            value={v}
                            className="secondary-font">
                            {v}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>
        </Form>

    );
}

export default withRouter(view(CustomSelect));
