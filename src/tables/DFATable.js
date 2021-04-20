import React from "react";
import "./DFATable.css";

class DFATable extends React.Component {
  convert = () => {
    this.storeValues();
  };

  storeValues = () => {
    window.localStorage.NFATable = {};
    const inputRows = document.querySelectorAll(".userInputRows");
    for (var i = 0; i < inputRows.length; i++) {
      const rowData = this.getRowValues(inputRows[i]);
      console.log(rowData);
    }
  };

  getRowValues = (row) => {
    const oneRow = row.querySelectorAll(".userInputs");
    var rowData = {};
    for (var i = 0; i < oneRow.length; i++) {
      if (i < 3) {
        rowData[i] = oneRow[i].value;
      } else if (i == oneRow.length - 1) {
        rowData.isFinalState = oneRow[i].checked;
      }
    }
    return rowData;
  };

  render() {
    return (
      <div>
        <button id="convertButton" onClick={this.convert}>
          =&gt;
        </button>
        <table id="DFATable">
          <tbody>
            <tr>
              <th>State</th>
              <th>0</th>
              <th>1</th>
            </tr>
            <tr>
              <th>[q0,q3]</th>
              <th>[q1,q3]</th>
              <th></th>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default DFATable;
