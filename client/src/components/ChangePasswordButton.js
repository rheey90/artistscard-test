/* eslint-disable react/prop-types */
import React from "react";
import { Button } from "antd";
import WrappedChangePassword from "./ChangePassword";

class ChangePasswordButton extends React.Component {
  state = { isVisible: false, size: "small" };
  showModal = () => {
    this.setState({ isVisible: !this.state.isVisible });
  };
  hideModal = () => {
    this.setState({ isVisible: !this.state.isVisible });
  };

  render() {
    const { size } = this.state;
    const isVisible = this.state.isVisible;
    return (
      <>
        <Button
          onClick={this.showModal}
          size={size}
          style={{
            marginTop: "8px",
            marginLeft: "85%",
            float: "left"
          }}
        >
          비밀번호 변경
        </Button>
        <WrappedChangePassword
          isVisible={isVisible}
          hideModal={this.hideModal}
          currentUser={this.props.currentUser}
        ></WrappedChangePassword>
      </>
    );
  }
}

export default ChangePasswordButton;
