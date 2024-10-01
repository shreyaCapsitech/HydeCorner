import React, { useState, useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import { UserName } from "../../app/slice/userSlice";
 
interface ChangePasswordProps {
  closeModal: () => void; // Add a prop to handle closing the modal
}
 
const ChangePassword: React.FC<ChangePasswordProps> = ({ closeModal }) => {
  const [username, setUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const navigate = useNavigate();
 
  // Fetch the logged-in user's name from local storage or session storage
  const storedName = useSelector(UserName);
  useEffect(() => {
    if (storedName) {
      setUsername(storedName);
    }
  }, []);
 
  const onFinish = async () => {
    if (newPassword !== confirmPassword) {
      message.error("Passwords do not match!");
      return;
    }
    const payload = { username, oldPassword, newPassword };
    try {
      await axios.post("https://localhost:7018/api/UserProfile/change-password", payload);
      message.success("Password changed successfully!");
      closeModal(); // Close modal on success
    } catch (error) {
      message.error("Failed to change password. Old password may be incorrect.");
    }
  };
 
  return (
    <Form name="change-password" onFinish={onFinish} style={{ maxWidth: 400 }}>
      <Form.Item label="Old Password" style={{marginTop: 20}} rules={[{ required: true, message: "Please input your Old Password!" }]}>
        <Input.Password onChange={(e) => setOldPassword(e.target.value)} placeholder="Enter Old Password" />
      </Form.Item>
      <Form.Item label="New Password" rules={[{ required: true, message: "Please input your New Password!" }]}>
        <Input.Password value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter New Password" />
      </Form.Item>
      <Form.Item label="Confirm Password" rules={[{ required: true, message: "Please confirm your New Password!" }]}>
        <Input.Password value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
      </Form.Item>
      <Form.Item>
        <Button block type="primary" htmlType="submit" >
          Update Password
        </Button>
      </Form.Item>
    </Form>
  );
};
 
export default ChangePassword;