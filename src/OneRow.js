import React from "react";

class OneRow extends React.Component {
  render() {
    return (
      <tr>
        <td>q1</td>
        <td>
          <input type="text" id={this.props.totalState + "0"} />
        </td>
        <td>
          <input type="text" id={this.props.totalState + "1"} />
        </td>
      </tr>
    );
  }
}

export default OneRow;
