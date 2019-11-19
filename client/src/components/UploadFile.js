/* eslint-disable react/prop-types */
import React from "react";
import { Upload, Icon, Button } from "antd";
const API_HOST_URL = process.env.REACT_APP_HOST_URL;

const UploadFile = props => {
  const mp3 = {
    action: `${API_HOST_URL}/music/${props.currentUser}/uploadtos3`,
    onChange(info) {
      let fileList = info.fileList.slice(-1);
      fileList = fileList.map(file => {
        if (file.response) {
          file.url = file.response.mp3Url;
        }
        return file;
      });
      props.fileUpload(fileList);
    },
    onRemove() {
      props.fileUpload([]);
    }
  };
  return (
    <span>
      {/* eslint-disable-next-line react/prop-types*/}
      <Upload {...mp3} name="mp3" fileList={props.fileList}>
        <Button>
          <Icon type="upload" /> 음원업로드
        </Button>
      </Upload>
    </span>
  );
};

export default UploadFile;
