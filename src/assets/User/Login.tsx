import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Card, message } from "antd";
import { useDispatch } from "react-redux";
import { setUserData } from "../../app/slice/userSlice";
import { useUserProfile } from "../../HandleApi/Api";

const Login: React.FC = () => {
  const [passwordInput, setPasswordInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  // const [rememberMe, setRememberMe] = useState(true);
  const { mutate: loginUser } = useUserProfile(); // Use mutate for login mutation
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onFinish = () => {
    const payload = { username:usernameInput , password: passwordInput };

    //use
    // loginUser(payload, {
    //   onSuccess: (data) => {
            
        // console.log("rememberMe: ", rememberMe);
        // if (rememberMe) {

          //use
          // localStorage.setItem("token", data.token);
          // localStorage.setItem("role", data.role);
          // localStorage.setItem("name", data.name);
          // localStorage.setItem("username", data.username);

        // } else {
        //   sessionStorage.setItem("token", data.token);
        //   sessionStorage.setItem("role", data.role);
        //   sessionStorage.setItem("name", data.name);
        //   sessionStorage.setItem("username", data.username);
        // }
        // // Save token and role
        // localStorage.setItem("token", data.token);
        // localStorage.setItem("role", data.role);
        // localStorage.setItem("name", data.name)

        //use
        // Redirect based on role
  //       if (data.role === "Admin") {
  //         navigate("/admin");
  //       } else {
  //         navigate("/user");
  //       }
  //     },
  //     onError: () => {
  //       setName("");
  //       message.error("Invalid username or password");
  //     },
  //   });
  // };
  
  loginUser(payload, {
    onSuccess: (data) => {
        //localStorage.setItem("token", data.token); // Ensure correct casing if it's "Token" or "token"
        //localStorage.setItem("role", data.role);
        //localStorage.setItem("name", data.name);
        //localStorage.setItem("username", data.username);
 console.log("Role: ",data.role);
 const userData = {
  token: data.token,
  role:  data.role,
  name: data.name,
  username: data.username,
  password: data.password
 }
        dispatch(setUserData(userData));

        // Redirect based on role
        if (data.role === "Admin") {
            navigate("/admin");
        } else {
            navigate("/user");
        }
    },
    onError: () => {
        message.error("Invalid username or password");
    },
});
  };

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
          name="login"
          initialValues={{ remember: true }}
          style={{ maxWidth: 400 }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Username"
              onChange={(e) => setUsernameInput(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
              onChange={(e) => setPasswordInput(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox
                  id="remember"
                  // onChange={(e) => setRememberMe(e.target.checked)}
                >
                  Remember me
                </Checkbox>
              </Form.Item>
            </div>
          </Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
