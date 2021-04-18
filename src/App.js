import React from "react";

import NFATable from "./tables/NFATable";
import DFATable from "./tables/DFATable";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NFATable></NFATable>
        <DFATable></DFATable>
      </React.Fragment>
    );
  }
}

export default App;
