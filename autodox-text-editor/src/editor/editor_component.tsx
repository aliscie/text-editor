import React from "react";
import EditorContext from "./editor_context";
import {store} from "./editor";

interface Props {
    key?: number,
    id?: any;
    tag: any;
    content?: string;
    children?: any;
    attributes?: Record<string, string>;
}

function EditorComponent(props: Props): JSX.Element {
    const {element_renderer} = React.useContext(EditorContext);
    const EditorRenderer = element_renderer;

    // const count = useSelector((state: AppState) => state.count);


    return (<EditorRenderer
        {...props}
    >
        {props.children ? props.children.map((child: any, childIndex: number) => {
            return <EditorComponent
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
                        let id = "id_" + Math.random().toString(36).substring(2, 15);
                        let caretPosition = window.getSelection()?.getRangeAt(0).startOffset;
                        let tag = e.currentTarget.tagName.toLowerCase();
                        tag = tag === "span" ? "p" : tag;
                        if (caretPosition === e.currentTarget.textContent.length) {
                            let new_item = {id: id, tag: tag, children: [{content: ""}]};
                            store.dispatch({
                                "data-empty": "true",
                                type: 'INSERT',
                                index: childIndex,
                                id,
                                item_id: child.id,
                                new_item
                            });
                        } else {
                            let remaining = e.currentTarget.textContent.substring(caretPosition);
                            e.currentTarget.textContent = e.currentTarget.textContent.substring(0, caretPosition);
                            let new_item = {id: id, tag: tag, children: [{content: remaining}]};
                            store.dispatch({
                                //TODO ...e.currentTarget.attributes,
                                type: 'INSERT',
                                index: childIndex,
                                id,
                                item_id: child.id,
                                new_item
                            });


                            setTimeout(() => {
                                const element = document.getElementById(id);
                                if (element) {
                                    element.focus()
                                }
                            }, 1);


                        }
                    } else if (e.key === 'Backspace' && e.currentTarget.textContent.length === 0) {
                        const element: HTMLElement | null = document.getElementById(child.id);

                        store.dispatch({
                            type: 'DELETE',
                            index: childIndex,
                            item_id: child.id,
                        });
                        // TODO e.currentTarget.parentElement.previousSibling.focus()
                    }
                }}
                key={childIndex}
                placeholder={"enter somthing..."}
                {...child} />;
        }) : props.content}
    </EditorRenderer>)
}

export default EditorComponent;
