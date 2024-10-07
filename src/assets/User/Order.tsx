import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card, Input, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useUserProfiles, addOrder } from "../../HandleApi/Api";
import { Name } from "../../app/slice/userSlice";
import { useSelector } from "react-redux";
 
const Order: React.FC = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { cartItems: initialCartItems } = state || { cartItems: [] };
    const { data: users } = useUserProfiles();
    const name = useSelector(Name);
    const [instructions, setInstructions] = useState<string>("");
    const [cartItems, setCartItems] = useState(initialCartItems);

    if (!cartItems.length) {
        return <div style={{margin: 50, fontWeight: "bold", color: "#3c3c3c" }}>No Items In The Cart. Please Add Items.</div>;
    }

     // Find the userId by matching the name of the logged-in user
const loggedInUser = users?.find((user: any) => user.name === name);
const userId = loggedInUser?.id; // Assuming 'id' is the user ID field
 
    const totalPrice = cartItems.reduce((total: any, item: any) => total + item.quantity * item.price, 0);

    // Remove item from the cart
  const handleRemoveItem = (index: number) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1); // Remove the item at the given index
    setCartItems(updatedCartItems);
  };

    const handlePlaceOrder = async () => {
      if (!userId) {
        message.error("User not found. Please check your login.");
        return;
    }

        const order = {
            userId: userId, // Replace with actual userId from session or state
            itemId: cartItems.map((item: any) => item.itemId),
            quantities: cartItems.map((item: any) => item.quantity),
            instruction: instructions, // Customize as per need
            totalPrice: totalPrice.toFixed(2)
        };
 
        try {
            await addOrder(order);
            message.success("Order placed successfully!");
            navigate("/user/order");
        } catch (error) {
            message.error("Failed to place order.");
        }
    };
 
    return (
        <div style={{ padding: 24, maxWidth: "1000px", margin: "0 auto" }}>
            <h2>Order Summary</h2>
            {cartItems.map((item: any, index: number) => (
                <Card key={item.itemId} style={{ marginBottom: 16 }}>
                    <Card.Meta
                        title={item.itemName}
                        description={`Quantity: ${item.quantity} | Price per unit: Rs ${item.price}`}
                    />
                    <div>Total: Rs {item.quantity * item.price}</div>
                    <div>
                    <Button
              type="text"
              icon={<DeleteOutlined />}
              danger
              onClick={() => handleRemoveItem(index)}
            />
          </div>
                   
                </Card>
            ))}
            <div style={{ marginTop: 24 }}>
                <h3>Total Price: Rs {totalPrice}</h3>
                
                <Input.TextArea
                    placeholder="Add special instructions here..."
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    style={{ marginBottom: "16px" }}
                />
 
                <Button type="primary" onClick={handlePlaceOrder}>
                    Place Order
                </Button>
            </div>
        </div>
    );
};
 
export default Order;