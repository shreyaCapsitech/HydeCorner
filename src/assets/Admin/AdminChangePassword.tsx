import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Card, message } from "antd";
import { useUserProfile } from "../../HandleApi/Api";

const AdminChangePassword: React.FC = () => {
  const [username, setUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState<string>("");
  const [rememberMe, setRememberMe] = useState(true);
  const { mutate: loginUser } = useUserProfile(); // Use mutate for login mutation
  const navigate = useNavigate();

  const onFinish = () => {
    const payload = { username, oldPassword, name };

    loginUser(payload, {
      onSuccess: (data) => {
        console.log("rememberMe: ", rememberMe);
        if (rememberMe) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("role", data.role);
          localStorage.setItem("name", data.name);
        } else {
          sessionStorage.setItem("token", data.token);
          sessionStorage.setItem("role", data.role);
          sessionStorage.setItem("name", data.name);
        }

        if (data.role === "Admin") {
          navigate("/admin");
        } else {
          navigate("/user");
        }
      },
      onError: () => {
        setName("");
        message.error("Invalid username or password");
      },
    });
  };
  console.log(name);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full viewport height
        backgroundColor: "#f0f2f5", // Optional background color
      }}
    >
      <Card
        title={<h2>RESET PASSWORD</h2>}
        bordered={false}
        style={{ width: 400 }}
      >
        <Form
          name="login"
          initialValues={{ remember: true }}
          style={{ maxWidth: 400 }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
            label="Username"
            required
          >
            <Input
              placeholder="Enter Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="old-password"
            rules={[
              { required: true, message: "Please input your Old Password!" },
            ]}
            label="Old Password"
            required
          >
            <Input
              required
              type="password"
              placeholder="Enter Old Password"
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="new-password"
            rules={[
              { required: true, message: "Please input your New Password!" },
            ]}
            label="New Password"
            required
          >
            <Input
              type="password"
              placeholder="Enter New Password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="confirm-password"
            rules={[{ required: true, message: "Please Confirm Password!" }]}
            label="Confirm Password"
            required
          >
            <Input
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="submit" onClick={ () => navigate("/")}>
              Update Password
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AdminChangePassword;
