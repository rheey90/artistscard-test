/* eslint-disable react/prop-types */

import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Form, Icon, Input, Button } from "antd";
const API_HOST_URL = process.env.REACT_APP_BACKEND_HOST;

class Login extends React.Component {
  handleClick = e => {
    const form = this.props.form;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        let username = values.id;
        let password = values.password;
      }
      fetch(`${API_HOST_URL}/sign/signin`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(res => {
          if (res.isLogIn) {
            this.props.setCurrentUser(value.id);
          } else {
            alert("아이디와 비밀번호를 확인하세요");
          }
        })
        .catch(err => console.error(err));
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const currentUser = this.props.currentUser;
    return currentUser.length ? (
      <Redirect to="/page/insert" />
    ) : (
      <div
        style={{
          position: "absolute",
          top: "45%",
          left: "50%",
          width: "80%",
          transform: "translate(-50%, -50%)",
          textAlign: "center"
        }}
      >
        <Form onSubmit={this.handleClick} className="login-form">
          <h3>음원 데이터 편집기</h3>
          <Form.Item>
            {getFieldDecorator("id", {
              rules: [{ required: true, message: "아이디를 입력하세요" }]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="ID"
                style={{ width: "200px" }}
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "비밀번호를 입력하세요" }]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
                style={{ width: "200px" }}
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              로그인
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ marginLeft: "50px" }}
            >
              <Link to="/signup">회원가입</Link>
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(Login);

export default WrappedNormalLoginForm;
