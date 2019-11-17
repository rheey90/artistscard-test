/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { Input, Button, Form } from "antd";
import UploadFile from "./UploadFile";

class InputMusic extends Component {
  state = { fileList: [] };
  handleClick = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields(async (err, values) => {
      let music = {
        artist: values.artist,
        title: values.title,
        album: values.album,
        filelocation: this.state.fileList.length
          ? this.state.fileList[0].url
          : undefined,
        userid: this.props.currentUser
      };
      if (music.filelocation === undefined) {
        alert("음원 파일을 업로드 해주세요.");
      } else {
        this.props.insertMusic(music);
        alert(
          "음원 데이터가 작성됐습니다. 음원 데이터 리스트 페이지에서 확인할 수 있습니다."
        );
      }
    });
  };
  handleFileUpload = fileList => {
    this.setState({ fileList: fileList });
  };
  render() {
    const form = this.props.form;
    const currentUser = this.props.currentUser;
    const style = { margin: "3px 3px 3px 3px" };
    return (
      <div
        style={{ width: "95%", margin: "0 50px 0 50px", textAlign: "right" }}
      >
        <Form onSubmit={this.handleClick}>
          <Form.Item>
            {form.getFieldDecorator("artist", {
              rules: [
                {
                  required: true,
                  message: "아티스트를 입력하세요"
                }
              ]
            })(
              <Input
                id="artist"
                style={style}
                placeholder="아티스트를 입력하세요"
              />
            )}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator("title", {
              rules: [{ required: true, message: "곡 제목을 입력하세요" }]
            })(
              <Input
                id="title"
                style={style}
                placeholder="곡 제목을 입력하세요"
              />
            )}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator("album", {
              rules: [{ required: true, message: "앨범명을 입력하세요" }]
            })(
              <Input
                id="album"
                style={style}
                placeholder="앨범명을 입력하세요"
              />
            )}
          </Form.Item>
          <Form.Item>
            <UploadFile
              currentUser={currentUser}
              fileUpload={this.handleFileUpload}
              fileList={this.state.fileList}
            />
            <Button htmlType="submit">작성</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedInputMusic = Form.create({ name: "input_music" })(InputMusic);

export default WrappedInputMusic;
