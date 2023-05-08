import React, {useEffect} from 'react';
import './style.css';
import EditorToolBar from "../specific_components/editor_toolbar";
import EditorComponent from "./editor_component";
import EditorContext from "./editor_context";
import {Provider, useSelector} from 'react-redux';
import {createStore} from 'redux';
import {parentIndex} from "../utiles/parent_index";
import {removeItemAtIndex} from "../utiles/remove_at_Index";
import {updateItem} from "../utiles/update_items";


export type AppState = {
    data: any;
}

type AppAction = {
    id?: any;
    item_id?: any;
    data?: any;
    index?: any;
    type: string;
    new_item?: any;
}

const initialState: AppState = {
    data: [{}],
}


function rootReducer(state: AppState = initialState, action: AppAction): AppState {
    let parent = parentIndex(action.item_id, state.data);
    let data = state.data.slice();

    switch (action.type) {
        case 'INIT':
            return {
                data: action.data
            };
        case 'INSERT':
            parent = parent === -1 ? action.index : parent;
            data.splice(parent + 1, 0, action.new_item)
            return {
                ...state,
                data: data
            };
        case 'UPDATE':
            data = updateItem(action.item_id, data, action.data);
            return {
                ...state,
                data
            };

        case 'DELETE':
            let remove_item = parent;
            remove_item = parent === -1 && action.index;
            data = removeItemAtIndex(data, remove_item);
            return {
                ...state, data
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

    return (
        <span
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
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
