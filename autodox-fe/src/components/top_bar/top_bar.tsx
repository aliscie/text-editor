import React from "react";
import "./style.css";
interface ToolbarProps {
  title: string;
  onButtonClick: () => void;
}

const TopToolbar: React.FC<ToolbarProps> = ({ title, onButtonClick }) => {
  return (
    <div className="top-toolbar">
      <div className="title">{title}</div>
      <button onClick={onButtonClick}>Click me</button>
    </div>
  );
};

export default TopToolbar;
