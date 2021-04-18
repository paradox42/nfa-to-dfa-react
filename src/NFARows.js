import React from "react";

class NFARows extends React.Component {
  constructRows = () => {
    const rowArr = [...Array(this.props.totalState).keys()];
    const rows = rowArr.map((num) => {
      return (
        <tr>
          <td>{"q" + num}</td>
          <td>
            <input type="text" id={num - 1 + "0"}></input>
          </td>
          <td>
            <input type="text" id={num - 1 + "1"}></input>
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
