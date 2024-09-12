import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Menu, theme, Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import AdminCategory from "./AdminCategory";
import AdminSubCategory from "./AdminSubCategory";
import AdminItems from "./AdminItems";
 
const { Header, Footer, Sider, Content } = Layout;
 
const Admin: React.FC = () => {
    const [selectedMenuItem, setSelectedMenuItem] = useState("1");
  const navigate = useNavigate();
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
 
  const menuLabels = [
    "Category",
    "Sub-Category",
    "Attendee",
    "Tag",
    "Table",
    "Order",
    "Items",
  ];
 
  const items = menuLabels.map((label, index) => ({
    key: String(index + 1),
    label: label,
    onClick: () => setSelectedMenuItem(String(index+1)),
  }));

  const renderContent = () => {
    switch(selectedMenuItem) {
        case "1": return <AdminCategory />;
        case "2": return <AdminSubCategory />;
        case "7": return <AdminItems />;
    }
  };
 
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
          <h1 style={{ fontFamily: "cursive" }}>Admin Panel</h1>
          <Button type="primary" style={{ fontWeight: "bold" }} onClick={() => navigate("/")}>
            Log Out <LogoutOutlined />
          </Button>
        </Header>
 
        {/* Dynamic Content */}
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 720,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {renderContent()}
          </div>
        </Content>
 
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
 
export default Admin;