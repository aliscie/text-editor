import React from "react";
import EditorContext from "./editor_context";
import {store} from "./editor";
import {generateId} from "../utiles/generate_id";

interface Props {
    key?: number,
    id?: any;
    tag: any;
    content?: string;
    children?: any;
    attributes?: Record<string, string>;
}

function handleInsertion(props: any, caretPosition: any, e: any, id: any) {
    let tag = e.currentTarget.tagName.toLowerCase();
    tag = tag === "span" ? "p" : tag;
    if (caretPosition === e.currentTarget.textContent.length) {
        let new_item = {id: "parent_" + id, tag: 'p', children: [{id, content: ""}]};
        store.dispatch({
            type: 'INSERT',
            index: props.key,
            id,
            item_id: props.id,
            new_item
        });
    } else {
        let remaining = e.currentTarget.textContent.substring(caretPosition);
        e.currentTarget.textContent = e.currentTarget.textContent.substring(0, caretPosition);
        let new_item = {
            id: "parent_" + id,
            tag: 'div',
            children: [{id, tag, content: remaining}]
        };
        store.dispatch({
            type: 'INSERT',
            index: props.key,
            id,
            item_id: props.id,
            new_item,
        });
        const element = document.getElementById(id);
        element && element.setAttribute('data-empty', 'true');

    }

}

function EditorComponent(props: Props): JSX.Element {
    const {element_renderer} = React.useContext(EditorContext);
    const EditorRenderer = element_renderer;

    // const count = useSelector((state: AppState) => state.count);

    return (<EditorRenderer
        {...props}
        id={"parent_" + props.id}
    >
        {props.children ? props.children.map((child: any, childIndex: number) => {
            return <EditorComponent
                {...child} />;
        }) : <EditorRenderer
            {...props}
            suppressContentEditableWarning
            contentEditable
            onKeyDown={(e: any) => {
                let content = e.currentTarget.textContent;
                let condition = e.currentTarget.getAttribute('data-empty') === 'false' || e.currentTarget.getAttribute('data-empty') == null;
                if (content.length === 1 && condition) {
                    e.currentTarget.setAttribute('data-empty', 'true');
                } else if (e.currentTarget.getAttribute('data-empty') == 'true') {
                    e.currentTarget.removeAttribute('data-empty');
                }
                if (e.key === 'Enter') {
                    let id = generateId();
                    let caretPosition = window.getSelection()?.getRangeAt(0).startOffset;
                    if (caretPosition) {
                        caretPosition += 1
                    }
                    handleInsertion(props, caretPosition, e, id);

                    setTimeout(() => {
                        const element = document.getElementById(id);
                        if (element) {
                            element.focus();

                        }
                    }, 1);
                } else if (e.key === 'Backspace' && e.currentTarget.textContent.length === 0) {
                    const element: HTMLElement | null = document.getElementById(props.id);

                    store.dispatch({
                        type: 'DELETE',
                        index: props.key,
                        item_id: props.id,
                    });
                    // TODO focus the previous item e.currentTarget.parentElement.previousSibling.focus()
                }
            }}
            key={props.key}
            placeholder={"enter somthing..."}
        > {props.content}</EditorRenderer>}
    </EditorRenderer>)
}

export default EditorComponent;
