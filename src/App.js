import React from "react";
import "./App.css";

import NFATable from "./tables/NFATable";
import DFATable from "./tables/DFATable";

class App extends React.Component {
  render() {
    return (
      <div id="mainContainer">
        <NFATable></NFATable>
        <DFATable></DFATable>
      </div>
    );
  }
}

export default App;
