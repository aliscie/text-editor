import {useState} from "react";
import useSelectPop from "../plugins/tool_bar/toolbar";

const EditorToolBar = () => {
    const {selectedText, showPopup, position} = useSelectPop();
    // const [textColor, setTextColor] = useState<string>("#000");
    // const [bgColor, setBgColor] = useState<string>("#fff");

    const popoverStyles: React.CSSProperties = {
        position: "absolute",
        top: position.top - 40,
        left: position.left,
        display: showPopup ? "block" : "none",
        userSelect: "none",
    };
    // const selectionStyles: React.CSSProperties = {
    //   color: textColor,
    //   backgroundColor: bgColor,
    //   display: showPopup ? "inline" : "none",
    // };

    return (
        <>
            {/*<div className="selected-text" style={selectionStyles}>*/}
            {/*  {selectedText}*/}
            {/*</div>*/}
            <div className="popover" style={popoverStyles}>
                <button>B</button>
                <button>I</button>
                <button>U</button>
            </div>
        </>
    );
};

export default EditorToolBar;
