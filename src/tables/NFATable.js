import React from "react";
import "./NFATable.css";
import NFARows from "./NFARows.js";

class NFATable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { totalState: 1 };
    window.localStorage.setItem("totalState", 1);
  }

  addOneRow = () => {
    this.setState(
      (state) => {
        return {
          totalState: state.totalState + 1,
        };
      },
      () => {
        window.localStorage.setItem("totalState", this.state.totalState);
      }
    );
  };

  render() {
    return (
      <div>
        <h1>Input your NFA table below</h1>
        <table id="userInputTable">
          <tbody>
            <tr>
              <th>State</th>
              <th>a</th>
              <th>b</th>
              <th>E</th>
              <th>Make accepting</th>
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
