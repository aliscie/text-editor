import React from 'react';
import './style.css';

export function Component() {
    let [state, setState] = React.useState(false);
    let ref = React.useRef<HTMLParagraphElement>(null);
    let content = ref.current?.textContent || "";
    if (content.length == 0) {
        ref.current?.setAttribute('data-empty', 'true');
    } else {
        ref.current?.setAttribute('data-empty', 'false');
    }

    return (
        <p
            ref={ref}
            placeholder={"enter somthing..."}>
            text is here.
        </p>
    );

}
