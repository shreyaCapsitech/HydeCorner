import React, { useState } from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";
import { Layout, Menu, theme, Carousel, message, Space, Dropdown, Avatar, Modal } from "antd";
import type { MenuProps } from 'antd';
import { LogoutOutlined, DownOutlined, UserOutlined, RetweetOutlined } from "@ant-design/icons";
import ChangePassword from "./ChangePassword";
import { useSelector } from "react-redux";
import { Name } from "../../app/slice/userSlice";

const { Header, Footer, Sider, Content } = Layout;

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "300px", // You can adjust this as needed
  width: "100%",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

// const imageStyle: React.CSSProperties = {
//   width: "100%",
//   height: "100%",
//   objectFit: "cover", // or 'contain' depending on your preference
// };

const User: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const name= useSelector(Name);

  const menuLabels = [
    { key: "category", label: "Category" },
    { key: "sub-category", label: "Sub-Category" },
    { key: "items", label: "Items" },
    { key: "order", label: "Order" },
  ];

  const items = menuLabels.map(({ key, label }) => ({
    key,
    label: <Link to={`/user/${key}`}>{label}</Link>,
  }));

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (key === "logout") {
      localStorage.clear();
      navigate("/");
message.info("Logged out successfully");
    } else if (key === "change-password") {
      // Show the modal when "Change Password" is clicked
      setIsModalVisible(true);
    }
  };
 
  const userMenuItems: MenuProps['items'] = [
    { label: "Change Password", key: "change-password", icon: <RetweetOutlined /> },

    { label: "Log Out", key: "logout", icon: <LogoutOutlined />, style: {color: "red"} },
  ];

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" items={items} />
      </Sider>
      <Layout>
        {/* Common Header */}
        <Header
          style={{
            padding: "0 16px",
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={{ fontFamily: "cursive" }}>Welcome, {name}</h2>
          <Dropdown menu={{ items: userMenuItems, onClick: handleMenuClick }}>
            <Space>
              <Avatar style={{ marginBottom: "3px" }} icon={<UserOutlined />} />
              <DownOutlined />
            </Space>
          </Dropdown>
        </Header>

        {/* Dynamic Content */}
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 720,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              textAlign: "center",
            }}
          >
            <h1 style={{ marginBottom: "50px" }}>HYDE CORNER</h1>
            <Carousel arrows infinite={true} autoplay>
              <div>
                <img
                  src="https://www.shutterstock.com/image-photo/vegetarian-food-background-organic-healthy-260nw-658524046.jpg"
                  alt="Image 1"
                  style={contentStyle}
                />
              </div>
              <div>
              <img
                  src="https://www.shutterstock.com/image-photo/set-indian-foods-top-view-260nw-2353234263.jpg"
                  alt="Image 2"
                  style={contentStyle}
                />
              </div>
              <div>
              <img
                  src="https://www.shutterstock.com/image-photo/group-south-indian-food-like-260nw-1153818823.jpg"
                  alt="Image 3"
                  style={contentStyle}
                />
              </div>
              <div>
              <img
                  src="https://media.istockphoto.com/id/638000936/photo/vegan-and-vegetarian-indian-cuisine-hot-spicy-dishes.jpg?s=612x612&w=0&k=20&c=ISxBGeKALq9c11v05BbNw2XtRzQaGn4BddU8BHF9ANk="
                  alt="Image 4"
                  style={contentStyle}
                />
              </div>
            </Carousel>
            <Outlet />
          </div>
        </Content>

        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
        <Modal
          title="Change Password"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)} // Close the modal on cancel
          footer={null} // No default footer, will handle actions inside the form
        >
          <ChangePassword closeModal={() => setIsModalVisible(false)} /> {/* Close modal after password change */}
        </Modal>
      </Layout>
    </Layout>
  );
};

export default User;
