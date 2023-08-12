import { useState } from "react";
import "./App.css";
import { Button } from "@chakra-ui/react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="card">
        count is {count}
        <Button
          onClick={() => setCount((count) => count + 1)}
          colorScheme="blue"
        >
          Button
        </Button>
      </div>
    </>
  );
}

export default App;
