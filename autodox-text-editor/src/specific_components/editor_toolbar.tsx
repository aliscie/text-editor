import {useState} from "react";
import useSelectPop from "../plugins/tool_bar/toolbar";

const EditorToolBar = () => {
    const {selectedText, showPopup, position} = useSelectPop();

    const popoverStyles: React.CSSProperties = {
        position: "absolute",
        top: position.top - 40,
        left: position.left,
        display: showPopup ? "block" : "none",
        userSelect: "none",
    };

    return (
        <>
            <div className="popover" style={popoverStyles}>
                <button>B</button>
                <button>I</button>
                <button>U</button>
            </div>
        </>
    );
};

export default EditorToolBar;
