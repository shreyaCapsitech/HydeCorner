import React, { useState, useEffect } from "react";
import { Input, GetProps } from 'antd';
import { useNavigate, useLocation } from "react-router-dom";
import {
 
  theme,
  Button,
  Divider,
  List,
  InputNumber,
  InputNumberProps,
} from "antd";


// const { Header, Content, Footer, Sider } = Layout;

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;

const Items: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const onSearch: SearchProps["onSearch"] = (value) => {
    setSearchTerm(value);
  };

  const onChange: InputNumberProps["onChange"] = (value) => {
    console.log("changed", value);
  };

  const breakfast = [
    {
      image: "https://imgmedia.lbb.in/media/2021/06/60c0e5b42e609255077ea85b_1623254452217.jpg",
      title: "Veg Maggi",
      price: "Rs 0.00",
    },
    {
      image: "https://cdn.tarladalal.com/members/9306/procstepimgs/potato-sandwich-(20)-12-188653.jpg",
      title: "Aloo Sandwich",
      price: "Rs 0.00",
    },
    {
      image: "https://static01.nyt.com/images/2018/12/11/dining/as-garlic-bread/as-garlic-bread-square640.jpg",
      title: "Garlic Bread (4 Pieces)",
      price: "Rs 0.00",
    },
  ];
  const thali = [
    {
      image:"https://hogr.app/blog/wp-content/uploads/2022/03/e1dad5315972c8a9db86fb01d69c7ecb.jpg",
      title: "Mini Thali ( Opt-1 )",
      description: "Patta Gobhi Matar x 1 | Dal x 1 | Chapati x 4",
      price: "Rs 0.00",
    },
    {
      image:"https://hogr.app/blog/wp-content/uploads/2022/03/e1dad5315972c8a9db86fb01d69c7ecb.jpg",
      title: "Mini Thali ( Opt-2 )",
      description: "Patta Gobhi Matar x 1 | Chapati x 3",
      price: "Rs 0.00",
    },
    {
      image:"https://hogr.app/blog/wp-content/uploads/2022/03/e1dad5315972c8a9db86fb01d69c7ecb.jpg",
      title: "Mini Thali ( R-1 )",
      description: "Patta Gobhi Matar x 1 | Dal x 1 | Chapati x 2 | Rice x 1",
      price: "Rs 0.00",
    },
    {
      image:"https://hogr.app/blog/wp-content/uploads/2022/03/e1dad5315972c8a9db86fb01d69c7ecb.jpg",
      title: "Mini Thali ( R-2 )",
      description: "Dal x 1 | Rice x 1",
      price: "Rs 0.00",
    },
    {
      image:"https://hogr.app/blog/wp-content/uploads/2022/03/e1dad5315972c8a9db86fb01d69c7ecb.jpg",
      title: "Special Mini Thali",
      description:
        "Patta Gobhi Matar x 1 | Dal x 1 | Shahi Paneer x 1 | Chapati x 4 | Salad x 1 | Papad x1 | Rice(Small Bowl) x 1",
      price: "Rs 0.00",
    },
    {
      image:"https://hogr.app/blog/wp-content/uploads/2022/03/e1dad5315972c8a9db86fb01d69c7ecb.jpg",
      title: "Mini Thali",
      description:
        "Patta Gobhi Matar x 1 | Dal x 1 | Chapati x 5 | Salad x 1 | Papad x1",
      price: "Rs 0.00",
    },
  ];
  const fastFood = [
    {
      image: "https://imgmedia.lbb.in/media/2021/06/60c0e5b42e609255077ea85b_1623254452217.jpg",
      title: "Plain Maggi",
      price: "Rs 0.00",
    },
    {
      image: "https://imgmedia.lbb.in/media/2021/06/60c0e5b42e609255077ea85b_1623254452217.jpg",
      title: "Veg Maggi",
      price: "Rs 0.00",
    },
    {
      image: "https://imgmedia.lbb.in/media/2021/06/60c0e5b42e609255077ea85b_1623254452217.jpg",
      title: "Tandoori Maggi",
      price: "Rs 0.00",
    },
    {
      image: "https://cdn.tarladalal.com/members/9306/procstepimgs/potato-sandwich-(20)-12-188653.jpg",
      title: "Aloo Sandwich",
      price: "Rs 0.00",
    },
    {
      image: "https://cdn.tarladalal.com/members/9306/procstepimgs/potato-sandwich-(20)-12-188653.jpg",
      title: "Veg. Delight Cheese (Slice) Sandwich",
      price: "Rs 0.00",
    },
    {
      image: "https://cdn.tarladalal.com/members/9306/procstepimgs/potato-sandwich-(20)-12-188653.jpg",
      title: "Hyde Corner Special Sandwich",
      price: "Rs 0.00",
    },
    {
      image: "https://www.chefkunalkapur.com/wp-content/uploads/2022/09/DSC01577-1300x868.jpg?v=1662173730",
      title: "Fried Rice",
      price: "Rs 0.00",
    },
    {
      image: "https://www.funfoodfrolic.com/wp-content/uploads/2022/07/Corn-Chaat-Blog.jpg",
      title: "Masala Corn Chaat",
      price: "Rs 0.00",
    },
    {
      image: "https://static01.nyt.com/images/2018/12/11/dining/as-garlic-bread/as-garlic-bread-square640.jpg",
      title: "Garlic Bread (4 Pieces)",
      price: "Rs 0.00",
    },
    {
      image: "https://content.jdmagicbox.com/comp/def_content/pizza_outlets/default-pizza-outlets-13.jpg",
      title: "Margherita Pizza",
      price: "Rs 0.00",
    },
    {
      image: "https://content.jdmagicbox.com/comp/def_content/pizza_outlets/default-pizza-outlets-13.jpg",
      title: "Farm House Pizza",
      price: "Rs 0.00",
    },
    {
      image: "https://content.jdmagicbox.com/comp/def_content/pizza_outlets/default-pizza-outlets-13.jpg",
      title: "Sister Farm House Pizza",
      price: "Rs 0.00",
    },
    {
      image: "https://www.sharmispassions.com/wp-content/uploads/2022/11/RedSaucePasta1.jpg",
      title: "Red Pasta",
      price: "Rs 0.00",
    },
  ];
  const drinks = [
    {
      image: "https://static.toiimg.com/thumb/84702370.cms?imgsize=212288&width=800&height=800",
      title: "Shikanji",
      price: "Rs 0.00",
    },
    {
      image: "https://www.aimeemars.com/wp-content/uploads/2022/02/Oreo-Milkshake.jpg",
      title: "Oreo Choco Shake",
      price: "Rs 0.00",
    },
    {
      image: "https://www.aimeemars.com/wp-content/uploads/2022/02/Oreo-Milkshake.jpg",
      title: "Coffee Frappe ( Cold Coffee )",
      price: "Rs 0.00",
    },
    {
      image: "https://i0.wp.com/delishbite.in/wp-content/uploads/2023/07/Blog_1.jpg?resize=819%2C1024&ssl=1",
      title: "Buttermilk",
      price: "Rs 0.00",
    },
  ];
  const desserts = [
    {
      image: "https://5.imimg.com/data5/SELLER/Default/2024/2/393577499/WV/WU/AR/207582481/fresh-sweet-curd.jpg",
      title: "Curd",
      price: "Rs 0.00",
    },
    {
      image: "https://mygoodfoodworld.com/wp-content/uploads/2022/07/Cucumber-raita.jpg",
      title: "Raita",
      price: "Rs 0.00",
    },
  ];

  const filterItems = (items: any[]) => {
    return items.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
  };


  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const hash = location.hash.substring(1); // Remove the '#' from the hash
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
          <div
            style={{
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              maxWidth: "1000px", // Optional width to center list better
              margin: "0 auto", // Centering the list content
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
            <Divider orientation="left">
              <h3>MAIN MENU</h3>
            </Divider>
            <List
              id="breakfast"
              size="large"
              itemLayout="horizontal"
              header={
                <div style={{ fontWeight: "bold", fontSize: "25px" }}>
                  Breakfast
                </div>
              }
              bordered
              dataSource={filterItems(breakfast)}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<img src={item.image} alt={item.title} style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "10px" }} />}
                    title={item.title}
                    description={
                      <>
                        <div style={{ fontWeight: "bold", color: "#3c3c3c" }}>
                          Price: {item.price}
                        </div>
                      </>
                    }
                  />
                  <div style={{ textAlign: "right" }}>
                    <div>
                      Qty:
                      <InputNumber
                        min={0}
                        max={100000}
                        defaultValue={0}
                        onChange={onChange}
                      />
                    </div>
                    <div>
                      <Button
                        type="primary"
                        style={{ margin: "8px", backgroundColor: "red" }}
                        onClick={() => {navigate("/order")}}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </List.Item>
              )}
            />
            <List
              id="indianThali"
              size="large"
              itemLayout="horizontal"
              style={{ marginTop: "10px" }}
              header={
                <div style={{ fontWeight: "bold", fontSize: "25px" }}>
                  Lunch ( Indian Thali )
                </div>
              }
              bordered
              dataSource={filterItems(thali)}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<img src={item.image} alt={item.title} style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "10px" }} />}
                    title={item.title}
                    description={
                      <>
                        {item.description}
                        <div style={{ fontWeight: "bold", color: "#3c3c3c" }}>
                          {item.price}
                        </div>
                      </>
                    }
                  />
                  <div style={{ textAlign: "right" }}>
                    <div>
                      Qty:
                      <InputNumber
                        min={0}
                        max={100000}
                        defaultValue={0}
                        onChange={onChange}
                      />
                    </div>
                    <div>
                      <Button
                        type="primary"
                        style={{ margin: "8px", backgroundColor: "red" }}
                        onClick={() => {navigate("/order")}}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </List.Item>
              )}
            />
            <List
              id="fastFood"
              size="large"
              itemLayout="horizontal"
              style={{ marginTop: "10px" }}
              header={
                <div style={{ fontWeight: "bold", fontSize: "25px" }}>
                  Dinner / Fast Food 
                </div>
              }
              bordered
              dataSource={filterItems(fastFood)}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<img src={item.image} alt={item.title} style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "10px" }} />}
                    title={item.title}
                    description={
                      <>
                        <div style={{ fontWeight: "bold", color: "#3c3c3c" }}>
                          {item.price}
                        </div>
                      </>
                    }
                  />
                  <div style={{ textAlign: "right" }}>
                    <div>
                      Qty:
                      <InputNumber
                        min={0}
                        max={100000}
                        defaultValue={0}
                        onChange={onChange}
                      />
                    </div>
                    <div>
                    <Button
                        type="primary"
                        style={{ margin: "8px", backgroundColor: "red" }}
                        onClick={() => {navigate("/order")}}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </List.Item>
              )}
            />
            <List
              id="drinks"
              size="large"
              itemLayout="horizontal"
              style={{ marginTop: "10px" }}
              header={
                <div style={{ fontWeight: "bold", fontSize: "25px" }}>
                  Drinks
                </div>
              }
              bordered
              dataSource={filterItems(drinks)}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<img src={item.image} alt={item.title} style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "10px" }} />}
                    title={item.title}
                    description={
                      <>
                        <div style={{ fontWeight: "bold", color: "#3c3c3c" }}>
                          {item.price}
                        </div>
                      </>
                    }
                  />
                  <div style={{ textAlign: "right" }}>
                    <div>
                      Qty:
                      <InputNumber
                        min={0}
                        max={100000}
                        defaultValue={0}
                        onChange={onChange}
                      />
                    </div>
                    <div>
                    <Button
                        type="primary"
                        style={{ margin: "8px", backgroundColor: "red" }}
                        onClick={() => {navigate("/order")}}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </List.Item>
              )}
            />
            <List
              id="desserts"
              size="large"
              itemLayout="horizontal"
              style={{ marginTop: "10px" }}
              header={
                <div style={{ fontWeight: "bold", fontSize: "25px" }}>
                  Desserts
                </div>
              }
              bordered
              dataSource={filterItems(desserts)}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<img src={item.image} alt={item.title} style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "10px" }} />}
                    title={item.title}
                    description={
                      <>
                        <div style={{ fontWeight: "bold", color: "#3c3c3c" }}>
                          {item.price}
                        </div>
                      </>
                    }
                  />
                  <div style={{ textAlign: "right" }}>
                    <div>
                      Qty:
                      <InputNumber
                        min={0}
                        max={100000}
                        defaultValue={0}
                        onChange={onChange}
                      />
                    </div>
                    <div>
                    <Button
                        type="primary"
                        style={{ margin: "8px", backgroundColor: "red" }}
                        onClick={() => {navigate("/order")}}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </div>
  );
};

export default Items;
