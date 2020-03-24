import React from 'react';

const ControlBtn = (props) => {
    return (
        <button onClick={props.click}>{props.children}</button>
    )
}

export default ControlBtn;