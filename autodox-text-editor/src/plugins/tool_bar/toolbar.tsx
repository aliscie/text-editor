import { useState, useEffect, useRef } from "react";
import "./style.css";

const useSelectPop = () => {
  const [selectedText, setSelectedText] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleSelection = (event: MouseEvent) => {
      const selection = window.getSelection()?.toString().trim();
      if (selection && !popupRef.current?.contains(event.target as Node)) {
        setSelectedText(selection);
        setShowPopup(true);
        setPosition({ top: event.pageY, left: event.pageX });
      } else {
        setShowPopup(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        const target = event.target;
        if (target instanceof Element && !selectedText.includes(target.textContent || "")) {
          setShowPopup(false);
        }
      }
    };

    window.addEventListener("mouseup", handleSelection);
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mouseup", handleSelection);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedText]);

  return { selectedText, showPopup, setShowPopup, position, popupRef };
};

export default useSelectPop;
