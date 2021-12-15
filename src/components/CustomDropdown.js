import React from 'react'
import {Form} from "react-bootstrap";
import {withRouter} from "react-router-dom";
import {view} from "@risingstack/react-easy-state";
import stateStore from '../stateStore';

var selectedOptions = (e) => {
    let selectedOptions = []
    for (var option of e.target.options){
        if (option.selected){selectedOptions.push(option.value)}
    }
    stateStore.dict_collection.dict_id = selectedOptions
    return selectedOptions
}

const CustomDropdown = ({options,label,onc,preselected}) => {
    const optionList = options.map((opt) =>  {
        if(opt === preselected[0]){
            return (<option key={'key_'+opt} value={[opt]} selected>{opt}</option>)
        } 
        return (<option key={'key_'+opt} value={[opt]}>{opt}</option>)})
    return (
        <Form key="Dictionaries" inline>
            <Form.Group key="dict_dropdown_group" controlId={"select_"+label}>
            <Form.Label className="mr-1 ml-1">{label}</Form.Label>
            <select name="ids" id="ids" style={{ width:"100px", height:"40px", border:"gray"}} onChange={e => selectedOptions(e)}  multiple>
                {optionList}
            </select>
            </Form.Group>
        </Form>
    )
}

export default withRouter(view(CustomDropdown));
