import {useEffect, useRef, useState} from "react";
import "./style.css";

const useSelectPop = (editor: any) => {
    const [selectedText, setSelectedText] = useState<string>("");
    const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [position, setPosition] = useState<{ top: number; left: number }>({top: 0, left: 0});
    const popupRef = useRef<HTMLDivElement>(null);
    const toolbarRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        const textEditor = document.getElementById("text-editor");
        const handleSelection = () => {
            const selection = window.getSelection();
            if (selection?.toString()) {
                const range = selection?.getRangeAt(0);
                const selectedNode = range?.commonAncestorContainer.parentElement;
                if (selectedNode) {
                    setSelectedText(selection?.toString());
                    setSelectedElement(selectedNode);
                    if (!showPopup) {
                        const {x, y} = range?.getBoundingClientRect() ?? {x: 0, y: 0};
                        setPosition({top: y, left: x});
                    }
                    setShowPopup(true);
                }
            } else {
                setShowPopup(false);
                setSelectedElement(null);
            }
        };

        const handleClick = (event: MouseEvent) => {
            const target = event.target as Node;
            if (selectedText && popupRef.current && !popupRef.current.contains(target)) {
                setShowPopup(false);
                setSelectedElement(null);
            }
        };

        editor?.addEventListener("mouseup", handleSelection);
        editor?.addEventListener("mouseup", handleClick);
        return () => {
            editor?.removeEventListener("mouseup", handleSelection);
            editor?.removeEventListener("mouseup", handleClick);
        };
    }, [selectedText, selectedElement, showPopup]);

    return {selectedText, selectedElement, showPopup, setShowPopup, position, popupRef, toolbarRef};
};

export default useSelectPop;
