import React from "react";
import {ToggleButton, ToggleButtonGroup} from 'react-bootstrap'
import {withRouter} from "react-router-dom";
import {view} from "react-easy-state";
import stateStore from "../stateStore";

const ViewSettings = ({onc}) => {

    return (
        <ToggleButtonGroup type="checkbox"
                           onChange={e => onc(e)}>
            {stateStore.views.map((view, idx) => (
                <ToggleButton key={idx}
                              type="radio"
                              variant="primary"
                              name="radio"
                              value={view.value}
                              checked={stateStore.view.value === view.value}
                              onChange={(e) => onc(e.currentTarget.value)}> {view.name}
                </ToggleButton>
            ))}

        </ToggleButtonGroup>
    );

}

export default withRouter(view(ViewSettings));
