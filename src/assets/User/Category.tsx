import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { theme, Card, Input } from "antd";

const { Search } = Input;

const Category: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const cardItems = [
    {
      title: "Breakfast",
      description: "Starting the day mindfully with a breakfast that fuels both body and mind.",
imageUrl: "https://images.immediate.co.uk/production/volatile/sites/30/2017/08/smoothie-bowl-3a8632c.jpg?quality=90&resize=556,505",
      navigateTo: "/items#breakfast",
    },
    {
      title: "Lunch",
      description: "Feeling souper-duper at lunch today!",
imageUrl: "https://s3-ap-south-1.amazonaws.com/betterbutterbucket-silver/chitra-sendhil1453210035569e39b33b9db.jpeg",
      navigateTo: "/items#indianThali",
    },
    {
      title: "Dinner",
      description: "Feast your eyes on this delicious dinner spread.",
imageUrl: "https://5.imimg.com/data5/SELLER/Default/2021/5/GB/XY/RD/130296858/dinner-500x500.jpeg",
      navigateTo: "/items#fastFood",
    },
  ];
 
  // Filter function for card items
  const filterItems = (items: any[]) => {
    return items.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
 
  const onSearch = (value: string) => {
    setSearchTerm(value);
  };
 
  const filteredItems = filterItems(cardItems);

  const { Meta } = Card;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <div
    style={{
      padding: 8,
      minHeight: 720,
      background: colorBgContainer,
      borderRadius: borderRadiusLG,
      display: "flex",
      flexDirection: "column",
      alignItems: "center", // Centers the content horizontally
    }}
  >
    {/* Search Bar */}
    <div>
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
        style={{ margin: "8px", width: "500px" }}
      />
    </div>

    {/* Cards */}
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "50px",
        flexWrap: "wrap", // Ensures cards wrap on smaller screens
        marginTop: "40px", // Adds spacing between the search and cards
      }}
    >
      {filteredItems.length > 0 ? (
        filteredItems.map((item, index) => (
          <Card
            key={index}
            hoverable
            style={{ width: 240, height: 400 }}
            cover={<img style={{ height: "220px" }} alt="example" src={item.imageUrl} />}
            onClick={() => navigate(item.navigateTo)}
          >
            <Meta title={item.title} description={item.description} />
          </Card>
        ))
      ) : (
        <p>No items found.</p>
      )}
    </div>
  </div>
  );
};
export default Category;
