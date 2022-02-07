import React from "react";
import Table from 'react-bootstrap/Table';
import {view} from "@risingstack/react-easy-state";
import {withRouter} from 'react-router-dom';
import stateStore from "../stateStore";
import CustomRow from "./CustomRow";
import './table.css';

const CustomTable = ({results,header}) => {
    let entries = <h3>Loading...</h3>;
    let head = "";
    if (results && results.length >0) {
        head = Object.keys(stateStore.results.display_fields).map(k => {
            if (stateStore.results.display_fields[k] === true) {
                return <th key={Math.random()}>{k}</th>
            } else return null
        })
        entries = results.map((m, i) => <CustomRow key={i} item={m}/>);
    }
    return (
        <Table size="sm" responsive="sm" striped hover style={{width:"100%"}}>
            <thead>
                <tr>
                    <th colspan="100%" style={{"text-align": "center"}}>{header}</th>    
                </tr>
            <tr key="t_head">
                {head}
            </tr>
            </thead>
            <tbody key="tbody">{entries}</tbody>
        
        </Table>
    );
};


export default withRouter(view(CustomTable));
