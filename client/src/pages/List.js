/* eslint-disable react/prop-types */
import React from "react";
import Music from "../components/Music";
import { Input, Empty } from "antd";

class List extends React.Component {
  state = {
    value: "",
    musicData: this.props.musics
  };

  filterCard = e => {
    if (e.target.value) {
      const updatedList = this.state.musicData.filter(card => {
        return (
          card.title.toLowerCase().search(e.target.value.toLowerCase()) !== -1
        );
      });
      this.setState({ musicData: updatedList });
    } else {
      this.setState({ musicData: this.props.musics });
    }
  };
  render() {
    const musics = this.state.musicData;
    const loading = this.props.loading;
    const editMusic = (body, musicid) => {
      this.props.editMusic(body, musicid);
    };
    return (
      <div>
        <Input
          placeholder="찾는 음원의 곡 제목을 입력하세요"
          onChange={this.filterCard}
          style={{ width: "500px", marginLeft: "12px" }}
        />
        {!musics.length && !loading ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <span>
                음원 데이터 작성 페이지로 가서 음원 데이터를 작성하세요
              </span>
            }
          />
        ) : (
          musics
            .sort((a, b) => b.id - a.id)
            .map((music, i) => {
              return (
                <Music
                  music={music}
                  loading={loading}
                  key={i}
                  editMusic={editMusic}
                />
              );
            })
        )}
      </div>
    );
  }
}

export default List;
