import React from "react";
import "./NFATable.css";
import NFARows from "./NFARows.js";

class NFATable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { totalState: 1 };
  }

  addOneRow = () => {
    this.setState((state) => {
      return {
        totalState: state.totalState + 1,
      };
    });
  };

  render() {
    return (
      <div id="NFA">
        <table id="userInputTable">
          <tbody>
            <tr>
              <th>State</th>
              <th>0</th>
              <th>1</th>
            </tr>

            <NFARows totalState={this.state.totalState}></NFARows>
          </tbody>
        </table>
        <button id="addRowButton" onClick={this.addOneRow}>
          +
        </button>
      </div>
    );
  }
}

export default NFATable;
