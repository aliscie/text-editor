import React, {useEffect} from 'react';
import './style.css';
import EditorToolBar from "../specific_components/editor_toolbar";
import EditorComponent from "./editor_component";
import EditorContext from "./editor_context";
import {Provider} from 'react-redux';
import { createStore } from 'redux';

export type AppState = {
  count: number;
}

type AppAction = {
  type: string;
}

const initialState: AppState = {
  count: 0,
}

function rootReducer(state: AppState = initialState, action: AppAction): AppState {
  switch(action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1,
      };
    default:
      return state;
  }
}

export const store = createStore(rootReducer);


function Editor(props: any) {


    let ElementRenderer = props.element_render;


    // let data = store.getState().data.;
    // const data: any = useSelector(
    //     (state: RootState) => state.data
    // );
    let [data, setData] = React.useState<any>(props.data);
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

                if (e.key == 'Enter') {
                    e.preventDefault();
                } else {
                    setState(`${e.currentTarget.textContent}`)
                }
            }}

            suppressContentEditableWarning
            contentEditable
            className="Editor">

            <Provider store={store}>
                <EditorContext.Provider value={{element_renderer: ElementRenderer}}>
                    <EditorToolBar/>
                    {
                        <EditorComponent
                            children={data}
                            tag={"span"}
                        />
                    }
                </EditorContext.Provider>
            </Provider>
        </div>
    );
}

export default Editor;
