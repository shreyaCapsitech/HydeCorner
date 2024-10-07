import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { List, Input, Button, InputNumber, Divider, message } from "antd";
import { useSubCategories, useItems } from "../../HandleApi/Api";

const { Search } = Input;

const Items: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [cartItems, setCartItems] = useState<
    { itemId: string; itemName: string; quantity: number; price: number }[]
  >([]);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const {
    data: subcategories,
    isLoading: isSubCategoriesLoading,
    isError: isSubCategoriesError,
  } = useSubCategories();
  const {
    data: items,
    isLoading: isItemsLoading,
    isError: isItemsError,
  } = useItems();
  const navigate = useNavigate();

  const handleQuantityChange = (value: number | 0, itemId: string) => {
    setQuantities({ ...quantities, [itemId]: value });
  };

  const onSearch = (value: string) => setSearchTerm(value.toLowerCase());

  const filterItems = (items: any[]) => {
    return items.filter((item) =>
      item.itemName.toLowerCase().includes(searchTerm)
    );
  };

  const handleAddToCart = (item: any) => {
    const quantity = quantities[item.id] || 0;

    if (quantity === 0) {
      message.error("Please select a quantity greater than 0.");
      return;
    }

    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.itemId === item.id
    );

    if (existingItemIndex !== -1) {
      // Update the quantity if item is already in the cart
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity = quantity;
      setCartItems(updatedCartItems);
    } else {
      // Add the new item to the cart
      setCartItems([
        ...cartItems,
        {
          itemId: item.id,
          itemName: item.itemName,
          quantity,
          price: item.price,
        },
      ]);
    }

    message.success(`${item.itemName} added to cart!`);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      message.error("No items in the cart.");
      return;
    }

    // Navigate to the Order page with the cart items
    navigate("/user/order", { state: { cartItems } });
  };

  if (isSubCategoriesLoading || isItemsLoading) return <p>Loading...</p>;
  if (isSubCategoriesError || isItemsError) return <p>Error loading data.</p>;

  return (
    <div style={{ padding: 24, maxWidth: "1000px", margin: "0 auto" }}>
      <Search
        placeholder="Search items"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
        style={{ margin: "8px", width: "500px" }}
      />
      {subcategories?.map((subcategory: any) => {
        const subcategoryItems = items?.filter(
          (item: any) => item.subCategoryId === subcategory.id
        );
        if (!subcategoryItems.length) return null;

        return (
          <div key={subcategory.id} style={{ marginBottom: "40px" }}>
            <Divider orientation="left">
              <h3>{subcategory.subCategoryName}</h3>
            </Divider>
            <List
              size="large"
              itemLayout="horizontal"
              bordered
              dataSource={filterItems(subcategoryItems)}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <img
                        src={item.imageUrl}
                        alt={item.itemName}
                        style={{ width: "100px", height: "100px" }}
                      />
                    }
                    title={item.itemName}
                    description={item.desc}
                  />
                  <div>
                    <div>
                      Qty:{" "}
                      <InputNumber
                        min={0}
                        max={100}
                        value={quantities[item.id] || 0}
                        onChange={(value) =>
                          handleQuantityChange(value || 0, item.id)
                        }
                      />
                    </div>
                    <div style={{ marginTop: 10 }}>Price: Rs {item.price}</div>
                    <Button
                      type="primary"
                      style={{ marginTop: "8px" }}
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </List.Item>
              )}
            />
          </div>
        );
      })}
      <Button type="primary" onClick={handleCheckout}>
        Checkout
      </Button>
    </div>
  );
};

export default Items;
