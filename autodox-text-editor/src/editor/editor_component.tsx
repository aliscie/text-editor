import React from "react";
// import EditorRenderer from "../element_renderer";
import EditorContext from "./editor_context";

interface Props {
    tag: any;
    content?: string;
    children?: any;
    attributes?: Record<string, string>;
}

function EditorComponent(props: Props): JSX.Element {
    const {element_renderer} = React.useContext(EditorContext);
    const EditorRenderer = element_renderer;

    return (<EditorRenderer {...props} >
        {props.children ? props.children.map((child: any, childIndex: number) => {
            return <EditorComponent
                placeholder={"enter somthing..."}
                {...child} />;
        }) : (props.content ? props.content : null)}
    </EditorRenderer>)
}

export default EditorComponent;
