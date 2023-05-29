import EditorToolBar from "../specific_components/editor_toolbar";
import React from "react";

let plugins = (editor: any) => {
    return [
        <EditorToolBar editor={editor}/>,
    ]
}
export default plugins;