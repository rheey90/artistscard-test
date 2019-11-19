/* eslint-disable react/prop-types */
import React from "react";
import { Modal, Input, Form, message } from "antd";
const API_HOST_URL = process.env.REACT_APP_HOST_URL;

class ChangePassword extends React.Component {
  handleOk = () => {
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        let body = {
          userid: this.props.currentUser,
          password: values.newPassword
        };
        fetch(`${API_HOST_URL}/sign/${this.props.currentUser}/changepw`, {
          method: "PUT",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json"
          }
        });
      }
    });
    this.props.hideModal();
    message.success("비밀번호가 수정되었습니다");
  };

  handleCancel = () => {
    this.props.hideModal();
    message.error("비밀번호 수정이 취소됐습니다");
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
    if (value && value !== form.getFieldValue("newPassword")) {
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
    const isVisible = this.props.isVisible;
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        title="비밀번호 수정"
        visible={isVisible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Form>
          <Form.Item label="새 비밀번호" hasFeedback>
            {getFieldDecorator("newPassword", {
              rules: [
                {
                  required: true,
                  message: "새 비밀번호를 입력하세요"
                },
                {
                  validator: this.validateToNextPassword
                }
              ]
            })(
              <Input.Password
                id="newPassword"
                style={{ width: "200px" }}
                placeholder="비밀번호"
              />
            )}
          </Form.Item>
          <Form.Item label="비밀번호 재입력" hasFeedback>
            {getFieldDecorator("confirmPassword", {
              rules: [
                {
                  required: true,
                  message: "새 비밀번호를 다시 입력하세요"
                },
                {
                  validator: this.compareToFirstPassword
                }
              ]
            })(
              <Input.Password
                id="confirmPassword"
                onBlur={this.handleConfirmBlur}
                style={{ width: "200px" }}
                placeholder="비밀번호"
              />
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

const WrappedChangePassword = Form.create({ name: "change_password" })(
  ChangePassword
);
export default WrappedChangePassword;
