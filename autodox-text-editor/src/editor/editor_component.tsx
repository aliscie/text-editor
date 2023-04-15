import React from "react";
// import EditorRenderer from "../element_renderer";
import EditorContext from "./editor_context";
import {AppState, store} from "./editor";
import {useSelector} from "react-redux";

interface Props {
    tag: any;
    content?: string;
    children?: any;
    attributes?: Record<string, string>;
}

function EditorComponent(props: Props): JSX.Element {
    const {element_renderer} = React.useContext(EditorContext);
    const EditorRenderer = element_renderer;

    const count = useSelector((state: AppState) => state.count);

    const handleIncrement = () => {
        store.dispatch({type: 'INCREMENT'});
    }


    return (<EditorRenderer {...props} >
        {props.children ? props.children.map((child: any, childIndex: number) => {
            return <EditorComponent
                placeholder={"enter somthing..."}
                {...child} />;
        }) : (props.content ? <div>
            <button contentEditable={false} onClick={handleIncrement}>Increment</button>
            {props.content + count}</div> : null)}
    </EditorRenderer>)
}

export default EditorComponent;
