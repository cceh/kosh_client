import React from "react";
import {view} from "@risingstack/react-easy-state";
import {withRouter} from 'react-router-dom';
import stateStore from "../stateStore";
import beautify from 'xml-beautifier';
import Highlight, {defaultProps} from "prism-react-renderer";
import theme from "prism-react-renderer/themes/github";


const CustomRow = props => {

    let row = Object.keys(stateStore.results.display_fields).map(k => {
        if (stateStore.results.display_fields[k] === true) {
            if (Array.isArray(props.item[k])) {
                return <td key={props.item[k]}>{props.item[k].map(r => (<li key={r}>{r}</li>))}</td>
                    ;
            } else {
                if (k === "xml") {
                    let xml = beautify(props.item[k]);
                    return <td key={props.item[k]}>
                        <Highlight {...defaultProps} theme={theme} code={xml} language="xml">
                            {({className, style, tokens, getLineProps, getTokenProps}) => (
                                <pre className={className} style={style}>
                                {tokens.map((line, i) => (
                                    <div {...getLineProps({line, key: i})}>{line.map((token, key) => (
                                        <span {...getTokenProps({token, key})} />))}
                                    </div>))}</pre>)}
                        </Highlight>
                    </td>
                } else if (k === "id") {
                    let url = stateStore.dict_collection.dict_base_url + `/ids?ids=` + props.item[k];
                    return <td key={props.item[k]}><a href={url}>{props.item[k]}</a></td>
                } else {
                    return <td key={k}>
                        <div>{props.item[k]}</div>
                    </td>
                }
            }
        } else {
            return null;
        }
    });
    return (
        <tr>
            {row}
        </tr>
    );
};

export default withRouter(view(CustomRow));
