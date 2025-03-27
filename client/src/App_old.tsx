import { useState } from "react";

import Button from "./components/exercises/Button";
import Alert from "./components/exercises/Alert";

import RealMadrid from "./components/RealMadrid";

import Standings from "./components/Standings";

/*import ListGroup from "./components/ListGroup";

function App() {
  let items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];

  const handleSelectItem = (item: string) => {
    console.log(item);
  };
  return (
    <div>
      <ListGroup
        items={items}
        heading="Cities"
        onSelectItem={handleSelectItem}
      />
    </div>
  );
}*/

function App() {
  const [alertVisible, setAlertVisibility] = useState(false);

  return (
    <div>
      {alertVisible && (
        <Alert onClose={() => setAlertVisibility(false)}>Hello World</Alert>
      )}
      <RealMadrid></RealMadrid>
      <Button color="primary" onClick={() => setAlertVisibility(true)}>
        My button
      </Button>
      <Standings></Standings>
    </div>
  );
}

export default App;
