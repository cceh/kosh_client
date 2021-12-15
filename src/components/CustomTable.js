import React from "react";
import Table from 'react-bootstrap/Table';
import {view} from "@risingstack/react-easy-state";
import {withRouter} from 'react-router-dom';
import stateStore from "../stateStore";
import CustomRow from "./CustomRow";


const CustomTable = ({results,header}) => {
    let entries = <h3>Loading...</h3>;
    let head = "";
    if (results && results.length >0) {

        head = Object.keys(stateStore.results.display_fields).map(k => {
            if (stateStore.results.display_fields[k] === true) {
                return <th key={Math.random()}>{k}</th>
            } else {
                return null;
            }
        })
        entries = results.map((m, i) => <CustomRow key={i} item={m}/>);

    }
    return (
        <>
        <h3>{header}</h3>
        <Table hover responsive="sm">
            <thead>
            <tr key="t_head">
                {head}
            </tr>
            </thead>
            <tbody key="tbody">{entries}</tbody>
        </Table>
        </>
    );
};


export default withRouter(view(CustomTable));
