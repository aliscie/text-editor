import React from 'react';
import './style.css';
import EditorToolBar from "../specific_components/editor_toolbar";


function Editor(props: any) {
    let ElementRenderer = props.element_render;
    let [state, setState] = React.useState<string>('');


    return (
        <div
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
            <EditorToolBar/>
            {
                props.data.map((item: any, index: number) => {
                    return <ElementRenderer
                        children={item.children}
                        key={index}
                        tag={item.tag}
                        content={item.content}
                        attributes={item.attributes}
                    />
                })
            }
        </div>
    );
}

export default Editor;
