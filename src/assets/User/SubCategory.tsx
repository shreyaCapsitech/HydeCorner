import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { theme, Card, Input } from "antd";

const { Search } = Input;

const SubCategory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();


  const cardItems = [
    {
      title: "Indian Thali",
      description: "A traditional Indian meal served on a large plate with multiple small bowls, offering a variety of dishes in one meal",
imageUrl: "https://hogr.app/blog/wp-content/uploads/2022/03/e1dad5315972c8a9db86fb01d69c7ecb.jpg",
      navigateTo: "/items#indianThali",
    },
    {
      title: "Fast Food",
      description: "If you're out, and starving, and need a bite to eat, then you need fast food.",
imageUrl: "https://d2vsf1hynzxim7.cloudfront.net/production/media/22782/conversions/onion-bhajis-original.jpg",
      navigateTo: "/items#fastFood",
    },
    {
      title: "Drinks",
      description: "Refreshing drinks to quench your thirst.",
imageUrl: "https://foodandroad.com/wp-content/uploads/2021/04/jaljeera-indian-drink-2.jpg",
      navigateTo: "/items#drinks",
    },
    {
      title: "Desserts",
      description: "Serving up some sweet happiness.",
imageUrl: "https://hips.hearstapps.com/hmg-prod/images/oreo-desserts-oreo-pie-64de37ba09b51.jpeg",
      navigateTo: "/items#desserts",
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
              padding: 24,
              display: "flex",
              justifyContent: "center",
              gap: "50px",
              minHeight: 720,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <div>
            <Search
              placeholder="input search text"
              allowClear
              enterButton="Search"
              size="large"
              onSearch={onSearch}
              style={{margin: "8px", width: "500px"}}
            />
          </div>
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
 
  );
};
export default SubCategory;
