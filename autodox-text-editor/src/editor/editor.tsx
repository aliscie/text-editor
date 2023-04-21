import React, {useEffect} from 'react';
import './style.css';
import EditorToolBar from "../specific_components/editor_toolbar";
import EditorComponent from "./editor_component";
import EditorContext from "./editor_context";
import {Provider, useSelector} from 'react-redux';
import {createStore} from 'redux';

export type AppState = {
    data: any;
}

type AppAction = {
    id?: any;
    data?: any;
    index?: any;
    type: string;
}

const initialState: AppState = {
    data: [{}],
}

function rootReducer(state: AppState = initialState, action: AppAction): AppState {
    switch (action.type) {
        case 'INIT':
            return {
                data: action.data
            };
        case 'INCREMENT':
            let data = state.data.slice();
            let len = state.data.length;

            let new_item = {"data-empty":"true", id: action.id, tag: 'h3', children: [{content: ""}]};
            data.splice(action.index + 1, 0, new_item)

            return {
                ...state,
                data: data
            };
        default:
            return state;
    }
}

export const store = createStore(rootReducer);

function EditorProvider(props: any) {
    useEffect(() => {
        store.dispatch({type: 'INIT', data: props.data});
    }, [])

    const data = useSelector((state: AppState) => state.data);
    let [state, setState] = React.useState<string>('');

    let elements = document.querySelectorAll('[placeholder]');
    return (
        <span
            onKeyDown={(e) => {
                if (e.key == 'Enter') {
                    e.preventDefault();
                } else {
                    setState(`${e.currentTarget.textContent}`)
                }
            }}

            className="Editor">

            <EditorToolBar/>
            {
                <EditorComponent
                    children={data}
                    tag={"span"}
                />
            }

        </span>
    );
}

function Editor(props: any) {
    let ElementRenderer = props.element_render;

    return <Provider store={store}>
        <EditorContext.Provider value={{element_renderer: ElementRenderer}}>
            <EditorProvider {...props}/>
        </EditorContext.Provider>
    </Provider>
}

export default Editor;
