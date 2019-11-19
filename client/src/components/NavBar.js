/* eslint-disable react/prop-types */
import React from "react";
import { NavLink } from "react-router-dom";
import Sidebar from "react-sidebar";
import { Menu, Icon } from "antd";

class NavBar extends React.Component {
  menuList = [
    { title: "음원 데이터 작성", path: "/page/insert" },
    { title: "음원 데이터 리스트", path: "/page/list" }
  ];
  onSetSidebarOpen = () => {
    this.props.setSidebarOpen();
  };

  render() {
    return (
      <Sidebar
        sidebar={
          <div
            style={{
              height: "100%",
              background: "#fff"
            }}
          >
            <div
              style={{
                width: "100%",
                height: "10%",
                overflow: "hidden"
              }}
            >
              <h3>
                <p
                  style={{
                    width: "70%",
                    float: "left",
                    display: "inline-block",
                    paddingLeft: "2%",
                    marginTop: "1%"
                  }}
                >
                  {`환영합니다, ${this.props.currentUser}님!`}
                </p>
              </h3>
            </div>
            <div>
              <Menu mode="inline" defaultSelectedKeys={["0"]}>
                {this.menuList.map((menu, i) => {
                  return (
                    <Menu.Item key={i}>
                      <NavLink to={menu.path}>
                        <p>{menu.title}</p>
                      </NavLink>
                    </Menu.Item>
                  );
                })}
              </Menu>
            </div>
          </div>
        }
        open={this.props.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        styles={{
          sidebar: {
            zIndex: this.props.sidebarOpen ? "5" : "-1",
            width: "20%"
          }
        }}
      >
        <Icon
          type="menu"
          style={{ color: "white" }}
          onClick={() => this.onSetSidebarOpen()}
        />
      </Sidebar>
    );
  }
}

export default NavBar;
