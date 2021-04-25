import React from "react";
import { isEqual } from "lodash";

import "./DFATable.css";

class DFATable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { DFAArr: [] };
  }
  convert = () => {
    const userInputs = this.getUserInputs();
    const DFAArr = this.convertToDFA(userInputs);
    this.setState({ DFAArr: DFAArr });
  };

  convertToDFA = (inputJSON) => {
    var DFAArr = [];
    var firstRow = this.getOneRow(inputJSON, Object.keys(inputJSON)[0]);
    DFAArr.push(firstRow);
    return this.getAllRows(inputJSON, DFAArr, firstRow);
  };

  getAllRows = (inputJSON, DFAArr, rowToMap) => {
    var transStatesOnA = this.removeEmpty(rowToMap["0"]);
    var transStatesOnB = this.removeEmpty(rowToMap["1"]);

    if (transStatesOnA.length && this.isNewState(DFAArr, transStatesOnA)) {
      let newStateName = transStatesOnA;
      let newTransStatesOnA = [];
      let newTransStatesOnB = [];
      transStatesOnA.forEach((state) => {
        var transStateAForSingleState = this.getTransitionStates(
          inputJSON,
          state,
          "0",
          newTransStatesOnA
        );

        var transStateBForSingleState = this.getTransitionStates(
          inputJSON,
          state,
          "1",
          newTransStatesOnA
        );

        newTransStatesOnA = [
          ...new Set([...newTransStatesOnA, ...transStateAForSingleState]),
        ];
        newTransStatesOnB = [
          ...new Set([...newTransStatesOnB, ...transStateBForSingleState]),
        ];
      });

      let newRow = {
        stateName: newStateName,
        0: newTransStatesOnA,
        1: newTransStatesOnB,
      };
      DFAArr.push(newRow);
      this.getAllRows(inputJSON, DFAArr, newRow);
    }

    if (transStatesOnB.length && this.isNewState(DFAArr, transStatesOnB)) {
      var newStateName = transStatesOnB;
      var newTransStatesOnA = [];
      var newTransStatesOnB = [];
      transStatesOnB.forEach((state) => {
        var transStateAForSingleState = this.getTransitionStates(
          inputJSON,
          state,
          "0",
          newTransStatesOnA
        );

        var transStateBForSingleState = this.getTransitionStates(
          inputJSON,
          state,
          "1",
          newTransStatesOnA
        );

        newTransStatesOnA = [
          ...new Set([...newTransStatesOnA, ...transStateAForSingleState]),
        ];
        newTransStatesOnB = [
          ...new Set([...newTransStatesOnB, ...transStateBForSingleState]),
        ];
      });

      var newRow = {
        stateName: newStateName,
        0: newTransStatesOnA,
        1: newTransStatesOnB,
      };
      DFAArr.push(newRow);
      this.getAllRows(inputJSON, DFAArr, newRow);
    }
    return DFAArr;
  };

  removeEmpty = (arr) => {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
      arr[i] !== "" && newArr.push(arr[i]);
    }
    return newArr;
  };

  isNewState = (DFAArr, arr) => {
    var flag = true;
    for (var i = 0; i < DFAArr.length; i++) {
      if (isEqual(DFAArr[i].stateName.sort(), arr.sort())) {
        flag = false;
        break;
      }
    }
    return flag;
  };

  getOneRow = (inputJSON, initialState) => {
    var newRow = {};
    var newStates = this.getStates(inputJSON, initialState, [initialState]);
    var statesForA = [];
    var statesForB = [];
    newStates.forEach((sourceState) => {
      statesForA = this.getTransitionStates(
        inputJSON,
        sourceState,
        "0",
        statesForA
      );

      statesForB = this.getTransitionStates(
        inputJSON,
        sourceState,
        "1",
        statesForB
      );
    });
    newRow = { stateName: newStates, 0: statesForA, 1: statesForB };
    return newRow;
  };

  getTransitionStates = (
    inputJSON,
    sourceState,
    inputAlphabet,
    targetStates
  ) => {
    if (inputJSON[sourceState] && inputJSON[sourceState][inputAlphabet]) {
      var NFAStates = inputJSON[sourceState][inputAlphabet];
    }
    if (NFAStates && NFAStates.length) {
      NFAStates.forEach((state) => {
        if (!targetStates.includes(state)) {
          targetStates = [...targetStates, state];
        }
        if (inputJSON[state] && inputJSON[state]["2"]) {
          var lambdaTransStates = inputJSON[state]["2"];
        }
        if (lambdaTransStates) {
          lambdaTransStates.forEach((state) => {
            if (!targetStates.includes(state) && state !== "") {
              targetStates.push(state);
              targetStates.concat(
                this.getTransitionStates(inputJSON, state, "0", targetStates)
              );
            }
          });
        }
      });
    }
    return targetStates;
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

  constructDFA = () => {
    const rows = [];
    this.state.DFAArr.forEach((row) => {
      var newRow = {};
      newRow.stateName = row.stateName;
      var input0 = [];
      var input1 = [];
      if (row[0]) {
        row[0].forEach((state) => {
          if (state) {
            input0.push(state);
          } else {
            input0.push("E");
          }
        });
      } else {
        input0 = "E";
      }
      if (row[1]) {
        row[1].forEach((state) => {
          if (state) {
            input1.push(state);
          } else {
            input1.push("E");
          }
        });
      } else {
        input1 = "E";
      }
      newRow["0"] = input0;
      newRow["1"] = input1;
      rows.push(newRow);
    });
    console.log(this.state.DFAArr, rows);
    return rows.map((row) => {
      return (
        <tr>
          <td>{row.stateName}</td>
          <td>{row["0"]}</td>
          <td>{row["1"]}</td>
        </tr>
      );
    });
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
              <th>a</th>
              <th>b</th>
              <th>Is accepting</th>
            </tr>
            {this.constructDFA()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default DFATable;
