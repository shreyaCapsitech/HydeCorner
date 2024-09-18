import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Modal,
  Space,
  Table,
  Popconfirm,
  message,
  Form,
  Radio,
  theme,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  fetchUserProfiles,
  addUserProfile,
  editUserProfile,
  deleteUserProfile,
} from "../../HandleApi/Api"; // Import necessary API functions

const { Search } = Input;

interface DataType {
  key: string;
  id: string; // userProfile id
  role: string;
  username: string;
  password: string;
  name: string;
  gender: string; 
  age: string; 
}

const AdminUserProfile: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [roleInput, setRoleInput] = useState<string>("");
  const [usernameInput, setUsernameInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [nameInput, setNameInput] = useState<string>("");
  const [genderInput, setGenderInput] = useState<string>("");
  const [ageInput, setAgeInput] = useState<string>("");
  const [userProfile, setUserProfile] = useState<DataType[]>([]);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [editRecord, setEditRecord] = useState<DataType | null>(null);

  // Fetch UserProfiles on component mount
  useEffect(() => {
    fetchUserProfiles().then((data) => setUserProfile(data));
  }, []);

  const handleAddUserProfile = () => {
    if (roleInput.trim() === "" || usernameInput.trim() === "" || passwordInput.trim() === "" || nameInput.trim() === "" || genderInput.trim() === ""|| ageInput.trim() === "") {
      message.warning("Please enter all fields");
      return;
    }

    const newUserProfile = {
     role: roleInput,
  username: usernameInput,
  password: passwordInput,
  name: nameInput,
  gender: genderInput,
  age: ageInput,
    };

    addUserProfile(newUserProfile).then(() => {
      fetchUserProfiles().then((data) => {
        setUserProfile(data);
        setRoleInput("");
        setUsernameInput("");
        setPasswordInput("");
        setNameInput("");
        setGenderInput("");
        setAgeInput("");
        setIsModalOpen(false);
        message.success("Sub Category added successfully!");
      });
    });
  };

  const handleDelete = (id: string) => {
    deleteUserProfile(id).then(() => {
      setUserProfile((prev) => prev.filter((item) => item.id !== id));
      message.success("User Profile deleted successfully!");
    });
  };

  const handleEdit = (record: DataType) => {
    setEditRecord(record);
    setEditModalVisible(true);
    setRoleInput(record.role);
    setUsernameInput(record.username);
    setPasswordInput(record.password);
    setNameInput(record.name);
    setGenderInput(record.gender);
    setAgeInput(record.age);
  };

  const handleEditOk = () => {
    if (!editRecord) return;

    const updatedUserProfile = {
      ...editRecord,
      role: roleInput,
      username: usernameInput,
      password: passwordInput,
      name: nameInput,
      gender: genderInput,
      age: ageInput,
    };

    editUserProfile(editRecord.id, updatedUserProfile).then(() => {
      fetchUserProfiles().then((data) => {
        setUserProfile(data);
        setEditModalVisible(false);
        setRoleInput("");
        setUsernameInput("");
        setPasswordInput("");
        setNameInput("");
        setGenderInput("");
        setAgeInput("");
        message.success("User Profile updated successfully!");
      });
    });
  };

  const handleEditCancel = () => {
    setEditModalVisible(false);
    setRoleInput("");
    setUsernameInput("");
    setPasswordInput("");
    setNameInput("");
    setGenderInput("");
    setAgeInput("");
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "Serial No.",
      dataIndex: "id",
      key: "id",
      render: (text: any, record: any, index: number) => index + 1,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
        title: "Gender",
        dataIndex: "gender",
        key: "gender",
    },
    {
        title: "Age",
        dataIndex: "age",
        key: "age",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: DataType) => (
        <Space size="middle">
          <EditOutlined onClick={() => handleEdit(record)} style={{color: "#13274F"}}/>
          <Popconfirm
            title="Are you sure to delete this userProfile?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined style={{color: "red"}}/>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <div
      style={{
        padding: 24,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: "20px",
        minHeight: 720,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
      />
      <Button type="primary" onClick={showModal} style={{ width: "140px" }}>
        <PlusOutlined /> Add User Profile
      </Button>
      <div>
        <Table columns={columns} dataSource={userProfile} rowKey="id" />
      </div>

      {/* Add User Profile Modal */}
      <Modal
        title="Add User Profile"

        open={isModalOpen}
        onOk={handleAddUserProfile}
        onCancel={handleCancel}
      >
        <Form>
        <Form.Item label="Role">
          <Radio.Group
          value={roleInput}
          style={{ marginTop: "10px" }}
          onChange={(e) => setRoleInput(e.target.value)}
          >
            <Radio value="Admin"> Admin </Radio>
            <Radio value="User"> User </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Username">
          <Input 
           placeholder="Enter Username"
           value={usernameInput}
           style={{ marginTop: "10px" }}
           onChange={(e) => setUsernameInput(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Password">
          <Input 
           placeholder="Enter Password"
           value={passwordInput}
           style={{ marginTop: "10px" }}
           onChange={(e) => setPasswordInput(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Name">
          <Input 
           placeholder="Enter Name"
           value={nameInput}
           style={{ marginTop: "10px" }}
           onChange={(e) => setNameInput(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Gender">
          <Radio.Group  
          value={genderInput}
          style={{ marginTop: "10px" }}
          onChange={(e) => setGenderInput(e.target.value)}
>
            <Radio value="Male"> Male </Radio>
            <Radio value="Female"> Female </Radio>
            <Radio value="Others"> Others </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Age">
          <Input 
           placeholder="Enter Age"
           value={ageInput}
           style={{ marginTop: "10px" }}
           onChange={(e) => setAgeInput(e.target.value)}
          />
        </Form.Item>
        </Form>
      </Modal>

      {/* Edit User Profile Modal */}
      <Modal
        title="Edit User Profile"
        open={editModalVisible}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
      >
        <Form>
        <Form.Item label="Role">
          <Radio.Group
          value={roleInput}
          style={{ marginTop: "10px" }}
          onChange={(e) => setRoleInput(e.target.value)}
          >
            <Radio value="Admin"> Admin </Radio>
            <Radio value="User"> User </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Username">
          <Input 
           placeholder="Enter Username"
           value={usernameInput}
           style={{ marginTop: "10px" }}
           onChange={(e) => setUsernameInput(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Password">
          <Input 
           placeholder="Enter Password"
           value={passwordInput}
           style={{ marginTop: "10px" }}
           onChange={(e) => setPasswordInput(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Name">
          <Input 
           placeholder="Enter Name"
           value={nameInput}
           style={{ marginTop: "10px" }}
           onChange={(e) => setNameInput(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Gender">
          <Radio.Group  
          value={genderInput}
          style={{ marginTop: "10px" }}
          onChange={(e) => setGenderInput(e.target.value)}
>
            <Radio value="Male"> Male </Radio>
            <Radio value="Female"> Female </Radio>
            <Radio value="Others"> Others </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Age">
          <Input 
           placeholder="Enter Age"
           value={ageInput}
           style={{ marginTop: "10px" }}
           onChange={(e) => setAgeInput(e.target.value)}
          />
        </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminUserProfile;
