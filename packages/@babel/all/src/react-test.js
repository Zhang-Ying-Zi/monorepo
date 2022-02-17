import React from "react";

export class Test extends React.Component {
  getInitialState() {
    return { num: this.getRandomNumber() };
  }

  getRandomNumber() {
    return Math.ceil(Math.random() * 6);
  }

  render() {
    return (
      <div>
        Your dice roll is:
        {this.state.num}
      </div>
    );
  }
}
