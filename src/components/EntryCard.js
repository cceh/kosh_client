import React from "react";
import {Card, Badge} from 'react-bootstrap';
import {view} from 'react-easy-state';
import {withRouter} from 'react-router-dom';
import stateStore from "../stateStore";
import beautify from 'xml-beautifier';
import Highlight, {defaultProps} from "prism-react-renderer";
import theme from "prism-react-renderer/themes/github";


const EntryCard = props => {

    let row = Object.keys(props.item).sort(function (a, b) {
        return stateStore.search.fields.indexOf(a) - stateStore.search.fields.indexOf(b);
    }).map(k => {
        if (stateStore.results.display_fields[k] === true) {
            if (Array.isArray(props.item[k])) {
                return <div key={k}>
                    <Badge variant="primary">{k}:</Badge>
                    <div>
                        {props.item[k].map(r => (<li key={r}>{r}</li>))}</div>
                </div>;
            } else {
                if (k === "xml") {
                    let xml = beautify(props.item[k]);
                    return <div key={k}>
                        <Badge variant="primary">{k}:</Badge>
                        <Highlight {...defaultProps} theme={theme} code={xml} language="xml">
                            {({className, style, tokens, getLineProps, getTokenProps}) => (
                                <pre className={className} style={style}>
                                {tokens.map((line, i) => (
                                <div {...getLineProps({line, key: i})}>{line.map((token, key) => (
                                <span {...getTokenProps({token, key})} />))}
                            </div>))}</pre>)}
                        </Highlight>
                    </div>
                } else if (k === "id") {
                    let url = stateStore.dict_collection.dict_base_url + `/ids?ids=` + props.item[k];
                    return <div key={k}>
                        <Badge variant="primary">{k}:</Badge>
                        <div><a href={url}>{props.item[k]}</a></div>
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
        <Card className="card h-100">
            <Card.Body>
                {row}
            </Card.Body>
        </Card>
    );
};

export default withRouter(view(EntryCard));
