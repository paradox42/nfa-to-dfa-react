import "./App.css";
import OneRow from "./OneRow.js";
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { totalState: 0 };
  }

  addOneRow = () => {
    console.log("ok");
  };

  render() {
    return (
      <div>
        <table id="userInputTable">
          <tbody>
            <tr>
              <th>State</th>
              <th>0</th>
              <th>1</th>
            </tr>

            <OneRow totalState={this.state.totalState} ></OneRow>
          </tbody>
        </table>
        <button id="addRowButton" onClick={this.addOneRow}>
          +
        </button>
        <button id="convertButton">=&gt;</button>
      </div>
    );
  }
}

export default App;
