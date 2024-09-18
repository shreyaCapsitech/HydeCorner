import React, { useEffect, useState } from "react";
import { Table, Input, Modal, Space, Popconfirm, Button, message, Image } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
 
const { Search } = Input;
 
interface DataType {
  id: string;
  key: string;
  imageUrl: string;
  categoryName: string;
  desc: string;
}
 
const baseUrl = "https://localhost:7018/api"; 
 
const AdminCategory: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [descInput, setDescInput] = useState<string>("");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editRecord, setEditRecord] = useState<DataType | null>(null);
  const [categories, setCategories] = useState<DataType[]>([]);
 
  // Fetch categories from API
  const fetchCategoriesData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/Category`);
      setCategories(response.data);
    } catch (error) {
      message.error("Error loading categories");
    }
  };
 
  useEffect(() => {
    fetchCategoriesData();
  }, []);
 
  // Add Category
  const handleAddCategory = async () => {
    if (
      categoryInput.trim() === "" ||
      imageUrlInput.trim() === "" ||
      descInput.trim() === ""
    ) {
      message.warning("Please fill all the fields");
      return;
    }
 
    try {
await axios.post(`${baseUrl}/Category`, {
        categoryName: categoryInput,
        imageUrl: imageUrlInput,
        desc: descInput,
      });
      message.success("Category added successfully!");
      setIsModalOpen(false);
      setCategoryInput("");
      setImageUrlInput("");
      setDescInput("");
      fetchCategoriesData();
    } catch (error) {
      message.error("Failed to add category");
    }
  };
 
  // Edit Category
  const handleEdit = (record: DataType) => {
    setEditRecord(record);
    setImageUrlInput(record.imageUrl);
    setCategoryInput(record.categoryName);
    setDescInput(record.desc);
    setEditModalVisible(true);
  };
 
  const handleEditOk = async () => {
    if (!editRecord) return;
 
    try {
      await axios.put(`${baseUrl}/Category/${editRecord.key}`, {
        categoryName: categoryInput,
        imageUrl: imageUrlInput,
        desc: descInput,
      });
      message.success("Category updated successfully!");
      setEditModalVisible(false);
      setEditRecord(null);
      setCategoryInput("");
      setImageUrlInput("");
      setDescInput("");
      fetchCategoriesData();
    } catch (error) {
      message.error("Failed to update category");
    }
  };
 
  const handleEditCancel = () => {
    setEditModalVisible(false);
    setEditRecord(null);
    setCategoryInput("");
    setImageUrlInput("");
    setDescInput("");
  };
 
  // Delete Category
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${baseUrl}/Category/${id}`);
      message.success("Category deleted successfully!");
      fetchCategoriesData();
    } catch (error) {
      message.error("Failed to delete category");
    }
  };
 
  // Table columns
  const columns = [
    {
      title: "Serial No.",
      dataIndex: "key",
      key: "key",
      render: (text: any, record: any, index: any) => index + 1,
    },
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (url: string) => (
        <Image width={50} src={url} alt="category image" />
      ),
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <EditOutlined onClick={() => handleEdit(record)} style={{color: "#13274F"}}/>
          <Popconfirm
            title="Are you sure to delete this category?"
            onConfirm={() => handleDelete(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined style={{color: "red"}}/>
          </Popconfirm>
        </Space>
      ),
    },
  ];
 
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Search
          placeholder="Search category"
          allowClear
          enterButton="Search"
          size="large"
        />
      </div>
      <Button
        type="primary"
        onClick={() => setIsModalOpen(true)}
        style={{ marginBottom: "10px" }}
      >
        <PlusOutlined /> Add Category
      </Button>
 
      {/* Category Table */}
      <Table
        columns={columns}
        dataSource={categories.map((category) => ({
          key: category.id, // MongoDB id as key
          imageUrl: category.imageUrl,
          categoryName: category.categoryName,
          desc: category.desc,
        }))}
      />
 
      {/* Add Modal */}
      <Modal
        title="Add Category"
        open={isModalOpen}
        onOk={handleAddCategory}
        onCancel={() => setIsModalOpen(false)}
      >
        <div style={{ marginTop: 10 }}>Category:</div>
        <Input
          placeholder="Enter category"
          value={categoryInput}
          onChange={(e) => setCategoryInput(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <div style={{ marginTop: 10 }}>Description:</div>
        <Input.TextArea
          rows={4}
          placeholder="Enter Description"
          value={descInput}
          style={{ marginTop: "10px" }}
          onChange={(e) => setDescInput(e.target.value)}
        />
        <div style={{ marginTop: 10 }}>Image Url:</div>
        <Input
          placeholder="Enter image URL"
          value={imageUrlInput}
          onChange={(e) => setImageUrlInput(e.target.value)}
        />
      </Modal>
 
      {/* Edit Modal */}
      <Modal
        title="Edit Category"
        open={editModalVisible}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
      >
        <div style={{ marginTop: 10 }}>Category:</div>
        <Input
          placeholder="Edit category"
          value={categoryInput}
          onChange={(e) => setCategoryInput(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <div style={{ marginTop: 10 }}>Description:</div>
        <Input.TextArea
          rows={4}
          placeholder="Enter Description"
          value={descInput}
          style={{ marginTop: "10px" }}
          onChange={(e) => setDescInput(e.target.value)}
        />
        <div style={{ marginTop: 10 }}>Image Url:</div>
        <Input
          placeholder="Edit image URL"
          value={imageUrlInput}
          onChange={(e) => setImageUrlInput(e.target.value)}
        />
      </Modal>
    </div>
  );
};
 
export default AdminCategory;