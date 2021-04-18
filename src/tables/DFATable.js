import React from "react";
import "./NFATable.css";

class DFATable extends React.Component {
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
      <div id="DFA">
        <table id="DFATable">
        </table>
        <button id="convertButton">=&gt;</button>
      </div>
    );
  }
}

export default DFATable;
