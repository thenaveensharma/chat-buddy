import { useContext } from "react";
import "./App.css";
import ChatContext from "./Context/ChatProvider";

function App() {
  const data = useContext(ChatContext);
  console.log("🚀 ~ file: App.jsx:7 ~ App ~ data:", data);
  return (
    <>
      <div className="App"></div>
    </>
  );
}

export default App;
