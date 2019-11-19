/* eslint-disable react/prop-types */
import React from "react";
import { Card, Icon } from "antd";
import Edit from "./Edit";

class Music extends React.Component {
  state = { isVisible: false };
  showModal = () => {
    this.setState({ isVisible: !this.state.isVisible });
  };
  hideModal = () => {
    this.setState({ isVisible: !this.state.isVisible });
  };
  editMusic = (body, musicid) => {
    this.props.editMusic(body, musicid);
  };
  render() {
    const { Meta } = Card;
    const loading = this.props.loading;
    const music = this.props.music;
    const isVisible = this.state.isVisible;

    return (
      <Card
        style={{ width: 400, margin: "1% 1% 1% 1%" }}
        loading={loading}
        cover={<div></div>}
        actions={[<Icon type="edit" key="edit" onClick={this.showModal} />]}
      >
        {loading ? (
          <Meta />
        ) : (
          <Meta
            title={music.title}
            description={
              <div>
                <p>아티스트: {music.artist}</p>
                <p>앨범: {music.album}</p>
                <p>
                  파일위치:{" "}
                  <a href={music.filelocation}>{music.filelocation}</a>
                </p>
              </div>
            }
          />
        )}
        <Edit
          isVisible={isVisible}
          hideModal={this.hideModal}
          music={music}
          editMusic={this.editMusic}
        />
      </Card>
    );
  }
}

export default Music;
