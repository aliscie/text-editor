import React from 'react';
import './style.css';
import {Component} from "../components/main_component";

function Editor() {
    let [state, setState] = React.useState<string>('');

    return (
        <div
            // onChange={(e) => {
            //     console.log(e.currentTarget.textContent);
            // }}

            onKeyDown={(e) => {
                if (e.key == 'Enter') {
                    e.preventDefault();
                }
            }}
            onKeyUp={(e) => {
                setState(`${e.currentTarget.textContent}`)
            }}
            suppressContentEditableWarning
            contentEditable
            className="Editor">
            <Component/>
            <Component/>
            <Component/>
            <Component/>
        </div>
    );
}

export default Editor;
