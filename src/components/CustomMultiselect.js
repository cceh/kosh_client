import React from 'react'
import { Form } from 'react-bootstrap';

const CustomMultiselect = ({labels,preselected,onc}) => {
    var checkboxList = labels.map((label) => (<Form.Check
        inline
        label={label}
        name="group1"
        type="checkbox"
        id={label}
        defaultChecked={preselected.includes(label)}
        key={Math.random()}
        onChange={onc}
        />))

    return (
        <>
        Dictionaries:
        {checkboxList}
        </>
    )
}

export default CustomMultiselect
