/* eslint-disable react/prop-types */
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { Layout } from "antd";
import NavBar from "../components/NavBar";
import WrappedInsert from "./Insert";
import List from "./List";
import Logout from "../components/Logout";
import ChangePasswordButton from "../components/ChangePasswordButton";
const API_HOST_URL = "http://localhost:3001";

class Page extends React.Component {
  state = {
    loading: true,
    sidebarOpen: false,
    musics: [{ init: true }]
  };
  fetchMusic = async () => {
    const res = await fetch(`${API_HOST_URL}/music/${this.props.currentUser}`);
    let data = await res.json();
    return data;
  };
  setSidebarOpen = () => {
    this.setState({ sidebarOpen: !this.state.sidebarOpen });
  };
  componentDidMount = async () => {
    if (this.props.currentUser.length) {
      await this.fetchMusic().then(musics =>
        this.setState({ musics: musics, loading: false })
      );
    }
  };
  insertMusic = async music => {
    await fetch(`${API_HOST_URL}/music/${this.props.currentUser}`, {
      method: "POST",
      body: JSON.stringify(music),
      headers: {
        "Content-Type": "application/json"
      }
    });
    let loadNewMusic = await this.fetchMusic();
    this.setState({
      musics: this.state.musics.concat(loadNewMusic[loadNewMusic.length - 1])
    });
  };
  editMusic = async (body, musicid) => {
    await fetch(`${API_HOST_URL}/music/${this.props.currentUser}/${musicid}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json());

    let loadNewMusic = await this.fetchMusic();
    this.setState({ musics: loadNewMusic });
  };
  setLogout = () => {
    this.props.setLogout("");
  };
  render() {
    const { Header, Content } = Layout;
    return this.props.currentUser === "" ? (
      <Redirect to="/" />
    ) : (
      <Router>
        <Header style={{ backgroundColor: "#000000" }}>
          <NavBar
            currentUser={this.props.currentUser}
            setLogout={this.setLogout}
            setSidebarOpen={this.setSidebarOpen}
            sidebarOpen={this.state.sidebarOpen}
          />
          <span style={{ color: "white" }}>음원 데이터 편집기</span>
        </Header>
        <div>
          <Logout setLogout={this.setLogout}></Logout>
          <ChangePasswordButton
            currentUser={this.props.currentUser}
          ></ChangePasswordButton>
        </div>
        <Content style={{ padding: "30px 50px 50px 50px" }}>
          <Switch>
            <Route
              path="/page/insert"
              component={() => (
                <WrappedInsert
                  currentUser={this.props.currentUser}
                  musics={this.state.musics}
                  loading={this.state.loading}
                  insertMusic={this.insertMusic}
                  editMusic={this.editMusic}
                />
              )}
            />
            <Route
              path="/page/list"
              component={() => (
                <List
                  musics={this.state.musics}
                  loading={this.state.loading}
                  editMusic={this.editMusic}
                />
              )}
            />
          </Switch>
        </Content>
      </Router>
    );
  }
}

export default Page;
