/* eslint-disable react/prop-types */

import React from "react";
import { Button, Input, Form } from "antd";
const API_HOST_URL = "http://localhost:3001";

class Signup extends React.Component {
  handleClickConfirm = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        let userInfo = {
          userid: values.id,
          username: values.name,
          password: values.password
        };
        console.log(userInfo);
        fetch(`${API_HOST_URL}/sign/signup`, {
          method: "POST",
          body: JSON.stringify(userInfo),
          headers: {
            "Content-Type": "application/json"
          }
        }).then(() => {
          alert("가입 완료");
          this.props.history.push("/");
        });
      }
    });
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("비밀번호가 일치하지 않습니다.");
      this.setState({
        pwCheck: false
      });
    } else {
      callback();
      this.setState({
        pwCheck: true
      });
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
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
        <Form onSubmit={this.handleClickConfirm}>
          <h3>회원등록</h3>
          <Form.Item label="이름">
            {getFieldDecorator("name", {
              rules: [
                {
                  required: true,
                  message: "회원님의 이름을 입력하세요"
                }
              ]
            })(
              <Input id="name" style={{ width: "200px" }} placeholder="이름" />
            )}
          </Form.Item>
          <Form.Item label="아이디">
            {getFieldDecorator("id", {
              rules: [
                {
                  required: true,
                  message: "사용할 아이디를 입력하세요"
                }
              ]
            })(
              <Input id="id" style={{ width: "200px" }} placeholder="아이디" />
            )}
          </Form.Item>
          <Form.Item label="비밀번호" hasFeedback>
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "사용할 비밀번호를 입력하세요"
                },
                {
                  validator: this.validateToNextPassword
                }
              ]
            })(
              <Input.Password
                style={{ width: "200px" }}
                placeholder="비밀번호"
              />
            )}
          </Form.Item>
          <Form.Item label="비밀번호 재입력" hasFeedback>
            {getFieldDecorator("confirm", {
              rules: [
                {
                  required: true,
                  message: "비밀번호를 다시 입력하세요"
                },
                {
                  validator: this.compareToFirstPassword
                }
              ]
            })(
              <Input.Password
                onBlur={this.handleConfirmBlur}
                style={{ width: "200px" }}
                placeholder="비밀번호"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              등록
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedSignUp = Form.create({ name: "signUp" })(Signup);

export default WrappedSignUp;
