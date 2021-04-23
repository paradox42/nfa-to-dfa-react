import React from "react";
import "./DFATable.css";
import NFATable from "./NFATable";

class DFATable extends React.Component {
  convert = () => {
    const userInputs = this.getUserInputs();
    this.convertToDFA(userInputs);
  };

  convertToDFA = (inputJSON) => {
    var DFAJson = {};
    DFAJson = this.getDFAJson(inputJSON, Object.keys(inputJSON)[0]);
  };

  getDFAJson = (inputJSON, initialState) => {
    var newRow = {};
    var newStates = this.getStates(inputJSON, initialState, [initialState]);
    console.log(newStates);
  };

  getStates = (inputJSON, NFAState, DFAStates) => {
    var lambdaTransStates =
      inputJSON[NFAState] && inputJSON[NFAState]["2"]
        ? inputJSON[NFAState]["2"]
        : null;
    lambdaTransStates &&
      lambdaTransStates.forEach((state) => {
        if (lambdaTransStates && !DFAStates.includes(state) && state) {
          DFAStates.push(state);
          this.getStates(inputJSON, state, DFAStates);
        }
      });
    return DFAStates;
    // currentStates.forEach((state) => {
    //   var lambdaTransStates = inputJSON[state]["2"];
    //   if (lambdaTransStates) {
    //     lambdaTransStates.forEach((state) => {
    //       !currentStates.includes(state) && currentStates.push(state);
    //     });
    //   }
    // });
    // console.log(currentStates);
    // return currentStates;
  };

  getUserInputs = () => {
    var NFATable = {};
    const inputRows = document.querySelectorAll(".userInputRows");
    for (var i = 0; i < inputRows.length; i++) {
      const rowData = this.getRowValues(inputRows[i]);
      NFATable[`q${i}`] = rowData;
    }
    return NFATable;
  };

  getRowValues = (row) => {
    const oneRow = row.querySelectorAll(".userInputs");
    var rowData = {};
    for (var i = 0; i < oneRow.length; i++) {
      if (i < 3) {
        var inputStr = oneRow[i].value.replace(/ /g, ""); //get rid of all spaces
        if (inputStr[0] === "{") {
          rowData[i] = this.convertToArr(inputStr);
        } else {
          rowData[i] = inputStr.split(",");
        }
      } else if (i === oneRow.length - 1) {
        rowData.isFinalState = oneRow[i].checked;
      }
    }
    return rowData;
  };

  convertToArr = (str) => {
    str = str.substring(1, str.length - 1);
    const arr = str.split(",");
    return arr;
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
              <th>Is accepting</th>
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
