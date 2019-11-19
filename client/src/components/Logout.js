/* eslint-disable react/prop-types */
import React from "react";
import { Button } from "antd";
const API_HOST_URL = process.env.REACT_APP_HOST_URL;

class Logout extends React.Component {
  state = { size: "small" };
  handleClickLogout = () => {
    alert("로그아웃 되었습니다");
    fetch(`${API_HOST_URL}/sign/signout`).then(res => {
      res.json();
    });
    this.props.setLogout();
  };

  render() {
    const { size } = this.state;
    return (
      <Button
        onClick={this.handleClickLogout}
        size={size}
        style={{ marginLeft: "87%" }}
      >
        로그아웃
      </Button>
    );
  }
}

export default Logout;
