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
  fetchAttendees,
  addAttendee,
  editAttendee,
  deleteAttendee,
} from "../../HandleApi/Api"; // Import necessary API functions

const { Search } = Input;

interface DataType {
  key: string;
  id: string; // userProfile id
  name: string;
  gender: string; 
  age: string; 
  designation: string;
}

const AdminAttendee: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [nameInput, setNameInput] = useState<string>("");
  const [genderInput, setGenderInput] = useState<string>("");
  const [ageInput, setAgeInput] = useState<string>("");
  const [designationInput, setDesignationInput] = useState<string>("");
  const [attendee, setAttendee] = useState<DataType[]>([]);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [editRecord, setEditRecord] = useState<DataType | null>(null);
 
  useEffect(() => {
    fetchAttendees().then((data) => setAttendee(data));
  }, []);

  const handleAddUserProfile = () => {
    if (nameInput.trim() === "" || genderInput.trim() === "" || ageInput.trim() === "" || designationInput.trim() === "" ) {
      message.warning("Please enter all fields");
      return;
    }

    const newAttendee = {
  name: nameInput,
  gender: genderInput,
  age: ageInput,
  designation: designationInput,
    };

    addAttendee(newAttendee).then(() => {
      fetchAttendees().then((data) => {
        setAttendee(data);
        setNameInput("");
        setGenderInput("");
        setAgeInput("");
        setDesignationInput("");
        setIsModalOpen(false);
        message.success("Sub Category added successfully!");
      });
    });
  };

  const handleDelete = (id: string) => {
    deleteAttendee(id).then(() => {
      setAttendee((prev) => prev.filter((item) => item.id !== id));
      message.success("Attendee deleted successfully!");
    });
  };

  const handleEdit = (record: DataType) => {
    setEditRecord(record);
    setEditModalVisible(true);
    setNameInput(record.name);
    setGenderInput(record.gender);
    setAgeInput(record.age);
    setDesignationInput(record.designation);
  };

  const handleEditOk = () => {
    if (!editRecord) return;

    const updatedAttendee = {
      ...editRecord,
      name: nameInput,
      gender: genderInput,
      age: ageInput,
      designation:  designationInput,

    };

    editAttendee(editRecord.id, updatedAttendee).then(() => {
      fetchAttendees().then((data) => {
        setAttendee(data);
        setEditModalVisible(false);
        setNameInput("");
        setGenderInput("");
        setAgeInput("");
        setDesignationInput("");
        message.success("Attendee Profile updated successfully!");
      });
    });
  };

  const handleEditCancel = () => {
    setEditModalVisible(false);
    setNameInput("");
    setGenderInput("");
    setAgeInput("");
    setDesignationInput("");
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
        title: "Designation",
        dataIndex: "designation",
        key: "designation",
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
      <Button type="primary" onClick={showModal} style={{ width: "120px" }}>
        <PlusOutlined /> Add Attendee
      </Button>
      <div>
        <Table columns={columns} dataSource={attendee} rowKey="id" />
      </div>

      {/* Add User Profile Modal */}
      <Modal
        title="Add User Profile"

        open={isModalOpen}
        onOk={handleAddUserProfile}
        onCancel={handleCancel}
      >
        <Form>
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
        <Form.Item label="Designation">
          <Input 
           placeholder="Enter Designation"
           value={designationInput}
           style={{ marginTop: "10px" }}
           onChange={(e) => setDesignationInput(e.target.value)}
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
        <Form.Item label="Designation">
          <Input 
           placeholder="Enter Designation"
           value={designationInput}
           style={{ marginTop: "10px" }}
           onChange={(e) => setDesignationInput(e.target.value)}
          />
        </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminAttendee;
