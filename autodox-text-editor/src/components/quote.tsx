import React from 'react';
import './style.css';

export function Quote(props:any) {
    let ref = React.useRef<HTMLParagraphElement>(null);
    let content = ref.current?.textContent || "";
    if (content.length == 0) {
        ref.current?.setAttribute('data-empty', 'true');
    } else {
        ref.current?.setAttribute('data-empty', 'false');
    }

    return (
        <p
            style={{margin: 0, color: "lightgreen"}}
            ref={ref}
            placeholder={"enter somthing..."}>
            {props.children}
        </p>
    );

}
