import React from "react";
import EditorContext from "./editor_context";
import {store} from "./editor";

interface Props {
    tag: any;
    content?: string;
    children?: any;
    attributes?: Record<string, string>;
}

function EditorComponent(props: Props): JSX.Element {
    const {element_renderer} = React.useContext(EditorContext);
    const EditorRenderer = element_renderer;

    // const count = useSelector((state: AppState) => state.count);

    const handleIncrement = (childIndex: number) => {
        const id = "id_" + Math.random().toString(36).substring(2, 15);
        store.dispatch({type: 'INCREMENT', index: childIndex, id: id});
        return id;
    }

    return (<EditorRenderer
        {...props}
    >
        {props.children ? props.children.map((child: any, childIndex: number) => {
            return <EditorComponent
                suppressContentEditableWarning
                contentEditable
                onKeyDown={(e: any) => {
                    let content = e.currentTarget.textContent;
                    let condition = e.currentTarget.getAttribute('data-empty') == 'false' || e.currentTarget.getAttribute('data-empty') == null;
                    if (content.length == 1 && condition) {
                        e.currentTarget.setAttribute('data-empty', 'true');
                    } else if (e.currentTarget.getAttribute('data-empty') == 'true') {
                        e.currentTarget.removeAttribute('data-empty');
                    }
                    if (e.key == 'Enter') {
                        let id = handleIncrement(childIndex)
                        setTimeout(() => {
                            const element = document.getElementById(id);
                            if (element) {
                                element.focus()
                            }


                        }, 1);


                    }
                }}
                key={childIndex}
                placeholder={"enter somthing..."}
                {...child} />;
        }) : props.content}
    </EditorRenderer>)
}

export default EditorComponent;
