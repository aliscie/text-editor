import React, {useEffect} from 'react';
import './style.css';
import EditorToolBar from "../specific_components/editor_toolbar";
import EditorComponent from "./editor_component";
import {Provider} from "react-redux";
import {rootReducer} from "../redux/main";
import {createStore} from "redux";
import EditorContext from "./editor_context";

const store = createStore(rootReducer);


function Editor(props: any) {

    let ElementRenderer = props.element_render;


    let [state, setState] = React.useState<string>('');
    let elements = document.querySelectorAll('[placeholder]');
    useEffect(() => {
        elements.forEach((element: any) => {
            element.addEventListener('keyup', (e: any) => {
                let content = e.currentTarget.textContent;
                if (content.length == 1 && e.currentTarget.getAttribute('data-empty') == 'false') {
                    e.currentTarget.setAttribute('data-empty', 'true');
                } else if (e.currentTarget.getAttribute('data-empty') == 'true') {
                    e.currentTarget.removeAttribute('data-empty');
                }
            });

        });
    }, [elements])


    return (
        <div
            onKeyDown={(e) => {
                setState(`${e.currentTarget.textContent}`)
                if (e.key == 'Enter') {
                    e.preventDefault();
                }
            }}

            suppressContentEditableWarning
            contentEditable
            className="Editor">

            <Provider store={store}>
                <EditorContext.Provider value={{element_renderer: ElementRenderer}}>
                    <EditorToolBar/>
                    {
                        props.data.map((item: any, index: number) => {
                            return <EditorComponent
                                children={item.children}
                                key={index}
                                tag={item.tag}
                                content={item.content}
                                attributes={item.attributes}
                            />
                        })
                    }
                </EditorContext.Provider>
            </Provider>
        </div>
    );
}

export default Editor;
