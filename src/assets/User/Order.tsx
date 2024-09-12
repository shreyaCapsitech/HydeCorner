import React from "react";
import {} from "react-router-dom";
import { theme, Button, Card } from "antd";

const Order: React.FC = () => {
 
  const { Meta } = Card;
 
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <>
          <div
            style={{
              padding: 24,
              display: "flex",
              justifyContent: "center",
              gap: "50px",
              minHeight: 720,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Card
              hoverable
              style={{ width: 250, height: 450 }}
              cover={
                <img
                  style={{ height: "220px" }}
                  alt="example"
                  src="https://s3-ap-south-1.amazonaws.com/betterbutterbucket-silver/chitra-sendhil1453210035569e39b33b9db.jpeg"
                />
              }
            >
              <Meta
                title="Special Mini Thali"
                description="Patta Gobhi Matar x 1 | Dal x 1 | Shahi Paneer x 1 | Chapati x 4 | Salad x 1 | Papad x1 | Rice(Small Bowl) x 1"
              />
              <br />
              <div style={{ fontWeight: "bold", color: "#3c3c3c" }}>
                Quantity: 1
              </div>
              <div style={{ fontWeight: "bold", color: "#3c3c3c" }}>
                Price: Rs 0.00
              </div>
            </Card>
            <Card
              hoverable
              style={{ width: 250, height: 450 }}
              cover={
                <img
                  style={{ height: "220px" }}
                  alt="example"
                  src="https://imgmedia.lbb.in/media/2021/06/60c0e5b42e609255077ea85b_1623254452217.jpg"
                />
              }
            >
              <Meta title="Tandoori Maggi" />
              <br />
              <div style={{ fontWeight: "bold", color: "#3c3c3c" }}>
                Quantity: 2
              </div>
              <div style={{ fontWeight: "bold", color: "#3c3c3c" }}>
                Price: Rs 0.00
              </div>
            </Card>
          </div>
          <div
            style={{
              backgroundColor: "#faebd7",
              display: "flex",
              justifyContent: "space-between",
              padding: "16px 24px",
              alignItems: "center",
            }}
          >
            <div style={{ fontWeight: "bold", color: "#3c3c3c" }}>
              Total Price: Rs 0.00
            </div>

            <Button
              type="primary"
              style={{ height: "40px", margin: "8px", fontWeight: "bold" }}
            >
              Place Order
            </Button>
          </div>
          </>
  );
};
export default Order;
