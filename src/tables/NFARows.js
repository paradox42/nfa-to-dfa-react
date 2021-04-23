import React from "react";

class NFARows extends React.Component {
  constructRows = () => {
    const rowArr = [...Array(this.props.totalState).keys()];
    const rows = rowArr.map((num) => {
      return (
        <tr id={"row" + num} className="userInputRows">
          <td>{"q" + num}</td>
          <td>
            <input type="text" id={num + "0"} className="userInputs"></input>
          </td>
          <td>
            <input type="text" id={num + "1"} className="userInputs"></input>
          </td>
          <td>
            <input type="text" id={num + "2"} className="userInputs"></input>
          </td>
          <td>
            <input type="checkbox" id={"acceptingState" + num} className="userInputs" />
          </td>
        </tr>
      );
    });
    return rows;
  };

  render() {
    const rows = this.constructRows();
    return rows;
  }
}

export default NFARows;
