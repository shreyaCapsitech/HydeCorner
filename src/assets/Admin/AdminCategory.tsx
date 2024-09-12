import React, { useState } from "react";
import { Table, Input, Modal, Space, Popconfirm, Button, message, Image } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";
 
const { Search } = Input;
 
interface DataType {
  key: string;
  imageUrl: string;
  category: string;
}
 
const AdminCategory: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [category, setCategory] = useState<DataType[]>([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editRecord, setEditRecord] = useState<DataType | null>(null);
 
  const handleAddCategory = () => {
    if (categoryInput.trim() === "" || imageUrlInput.trim() === "") {
      message.warning("Please enter a category");
      return;
    }
    const newCategory: DataType = {
      key: (category.length + 1).toString(),
      imageUrl: imageUrlInput,
      category: categoryInput,
    };
    setCategory([...category, newCategory]);
    setImageUrlInput("");
    setCategoryInput("");
    setIsModalOpen(false);
    message.success("Category added successfully!");
  };
 
  const handleDelete = (key: string) => {
    setCategory(category.filter((category) => category.key !== key));
    message.success("Category deleted successfully!");
  };
 
  const handleEdit = (record: DataType) => {
    setEditRecord(record);
    setEditModalVisible(true);
    setImageUrlInput(record.imageUrl);
    setCategoryInput(record.category);
  };
 
  const handleEditOk = () => {
    if (!editRecord) return;
    setCategory((prev) =>
      prev.map((item) =>
        item.key === editRecord.key
          ? { ...item, imageUrl: imageUrlInput, category: categoryInput }
          : item
      )
    );
    setEditModalVisible(false);
    setImageUrlInput("");
    setCategoryInput("");
    message.success("Category updated successfully!");
  };
 
  const handleEditCancel = () => {
    setEditModalVisible(false);
    setImageUrlInput("");
    setCategoryInput("");
  };
 
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Serial No.",
      dataIndex: "key",
      key: "key",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (url: string) => <Image width={50} src={url} alt="category image" />,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>Edit</a>
          <Popconfirm
            title="Are you sure to delete this category?"
            onConfirm={() => handleDelete(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];
 
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <Search placeholder="Search category" allowClear enterButton="Search" size="large" />
      </div>
      <Button type="primary" onClick={() => setIsModalOpen(true)} style={{marginBottom: "10px"}}>
          <PlusOutlined /> Add Category
        </Button>
      <Table columns={columns} dataSource={category} />
      {/* Add Modal */}
      <Modal title="Add Category" open={isModalOpen} onOk={handleAddCategory} onCancel={() => setIsModalOpen(false)}>
        <Input
          placeholder="Enter category"
          value={categoryInput}
          onChange={(e) => setCategoryInput(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <Input
          placeholder="Enter image URL"
          value={imageUrlInput}
          onChange={(e) => setImageUrlInput(e.target.value)}
        />
      </Modal>
      {/* Edit Modal */}
      <Modal title="Edit Category" open={editModalVisible} onOk={handleEditOk} onCancel={handleEditCancel}>
        <Input
          placeholder="Edit category"
          value={categoryInput}
          onChange={(e) => setCategoryInput(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
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

