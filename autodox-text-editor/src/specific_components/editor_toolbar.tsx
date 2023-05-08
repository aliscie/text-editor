import {useState} from "react";
import useSelectPop from "../plugins/tool_bar/toolbar";
import {store} from "../editor/editor";

const EditorToolBar = () => {
    const {selectedElement, selectedText, showPopup, position} = useSelectPop();

    const popoverStyles: React.CSSProperties = {
        position: "absolute",
        top: position.top - 40,
        left: position.left,
        display: showPopup ? "block" : "none",
        userSelect: "none",
    };

    function handleBold() {
        // TODO
        //     store.dispatch({
        //         type: 'INSERT',
        //         id: "new",
        //         item_id: selectedElement?.id,
        //         new_item: {tag: "b", content: "selectedText"},
        //     });
        //     store.dispatch({
        //         type: 'UPDATE',
        //         data: {content: "selectedText"},
        //         item_id: selectedElement?.id
        //     });
    }

    return (
        <>
            <div className="popover" style={popoverStyles}>
                <button onClick={handleBold}>B</button>
                <button>I</button>
                <button>U</button>
            </div>
        </>
    );
};

export default EditorToolBar;
