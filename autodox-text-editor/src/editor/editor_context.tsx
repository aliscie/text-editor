import React from "react";

// interface User {
//   name: string;
//   email: string;
// }

interface ContextProps {
  element_renderer: any;
  // setUser: (user: User) => void;
}

const EditorContext = React.createContext<ContextProps>({
  element_renderer: undefined,
  // user: { name: "", email: "" },
  // setUser: () => {}
});

export default EditorContext;
