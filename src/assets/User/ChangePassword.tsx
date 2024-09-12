import React from "react";
import { useNavigate } from "react-router-dom";
import { LockOutlined } from "@ant-design/icons";
import type { FormProps } from "antd";
import { Button, Form, Input, Card } from "antd";

type FieldType = {
  username?: string;
  oldpassword?: string;
  newpassword?: string;
  confirmpassword?: string;
  remember?: string;
};

const ChangePassword: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  const navigate = useNavigate();
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
        title={<h2 style={{ fontFamily: "cursive" }}>LOGIN</h2>}
        bordered={false}
        style={{ width: 400 }}
      >
        <Form
          name="changePassword"
          initialValues={{ remember: true }}
          style={{ maxWidth: 400 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Old Password"
            name="oldpassword"
            rules={[{ required: true, message: "Please input your old password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item<FieldType>
            label="New Password"
            name="newpassword"
            rules={[{ required: true, message: "Please input your new password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmpassword"
            rules={[{ required: true, message: "Please confirm your Password!" }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Confirm Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              block
              type="primary"
              htmlType="submit"
              onClick={() => {
                navigate("/");
              }}
            >
              Update Password
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default ChangePassword;
