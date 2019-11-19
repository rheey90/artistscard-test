/* eslint-disable react/prop-types */
import React from "react";
import { Modal, Input, message } from "antd";
import UploadFile from "./UploadFile";

class Edit extends React.Component {
  state = { fileList: [] };
  handleOk = () => {
    let editArtist = document.getElementById("editArtist").value;
    let editTitle = document.getElementById("editTitle").value;
    let editAlbum = document.getElementById("editAlbum").value;
    let editFile = this.state.fileList.length
      ? this.state.fileList[0].url
      : this.props.music.filelocation;

    let body = {
      ...this.props.music,
      artist: editArtist,
      title: editTitle,
      album: editAlbum,
      filelocation: editFile
    };
    this.props.hideModal();
    message.success("수정 되었습니다");
    this.props.editMusic(body, this.props.music.id);
  };
  handleCancel = () => {
    this.props.hideModal();
    message.error("수정이 취소됐습니다");
  };
  handleFileUpload = fileList => {
    this.setState({ fileList: fileList });
  };
  render() {
    const music = this.props.music;
    const isVisible = this.props.isVisible;
    const fileList = this.state.fileList;

    return (
      <Modal
        title={music.title}
        visible={isVisible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Input
          id="editArtist"
          placeholder="아티스트를 입력하세요"
          defaultValue={music.artist}
        />
        <Input
          id="editTitle"
          placeholder="곡 제목을 입력하세요"
          defaultValue={music.title}
        />
        <Input
          id="editAlbum"
          placeholder="앨범명을 입력하세요"
          defaultValue={music.album}
        />
        <UploadFile
          currentUser={music.userid}
          fileUpload={this.handleFileUpload}
          fileList={fileList}
        />
      </Modal>
    );
  }
}

export default Edit;
