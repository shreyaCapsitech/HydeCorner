import React, { useState } from "react";
import { Button, Input, Modal, Space, Table, Popconfirm, message, Select, Image, theme } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { TableProps } from 'antd';
 
const { Search } = Input;
const { Option } = Select;
 
interface DataType {
  key: string;
  imageUrl: string;
  category: string;
  subCategory: string;
  item: string;
}
 
const AdminItems: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [itemInput, setItemInput] = useState("");
  const [item, setItem] = useState<DataType[]>([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editRecord, setEditRecord] = useState<DataType | null>(null);
 
  const categoryOptions = ["South Indian", "North Indian"];
  const subCategoryOptions = ["Dosa", "Chole"];
 
  const handleAddCategory = () => {
    if (itemInput.trim() === "" || imageUrlInput.trim() === "") {
      message.warning("Please enter a subCategory");
      return;
    }
 
    const newItem: DataType = {
      key: (item.length + 1).toString(),
      imageUrl: imageUrlInput,
      category: selectedCategory,
      subCategory: selectedSubCategory,
      item: itemInput,
    };
 
    setImageUrlInput("");
    setSelectedCategory("");
    setSelectedSubCategory("");
    setItem([...item, newItem]);
    setItemInput("");
    setIsModalOpen(false);
    message.success("Category added successfully!");
  };
 
  const handleDelete = (key: string) => {
    setItem(item.filter((item) => item.key !== key));
    message.success("Item deleted successfully!");
  };
 
  const handleEdit = (record: DataType) => {
    setEditRecord(record);
    setEditModalVisible(true);
    setImageUrlInput(record.imageUrl);
    setSelectedCategory(record.category);
    setSelectedCategory(record.subCategory);
    setItemInput(record.item);
  };
 
  const handleEditOk = () => {
    if (!editRecord) return;
    setItem((prev) =>
      prev.map((item) =>
        item.key === editRecord.key
          ? { ...item, imageUrl: imageUrlInput, category: selectedCategory, subCategory: selectedSubCategory, item: itemInput }
          : item
      )
    );
    setEditModalVisible(false);
    setImageUrlInput("");
    setSelectedCategory("");
    setSelectedSubCategory("");
    setItemInput("");
    message.success("Item updated successfully!");
  };
 
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handleSubCategoryChange = (value: string) => {
    setSelectedSubCategory(value);
  };
 
  const handleEditCancel = () => {
    setEditModalVisible(false);
    setImageUrlInput("");
    setSelectedCategory("");
    setSelectedSubCategory("");
    setItemInput("");
  };
 
  const showModal = () => {
    setIsModalOpen(true);
  };
 
  const handleCancel = () => {
    setIsModalOpen(false);
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
      title: "Sub-Category",
      dataIndex: "subCategory",
      key: "subCategory",
    },
    {
      title: "Item",
      dataIndex: "item",
      key: "item",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>Edit</a>
          <Popconfirm
            title="Are you sure to delete this subCategory?"
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
 
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
 
  return (
    <div style={{ padding: 24, display: "flex", flexDirection: "column", justifyContent: "flex-start", gap: "20px", minHeight: 720, background: colorBgContainer, borderRadius: borderRadiusLG }}>
     
      <Search placeholder="input search text" allowClear enterButton="Search" size="large" />

      <Button type="primary" onClick={showModal} style={{ width: "110px" }}>
        <PlusOutlined /> Add Items
      </Button>

      <div>
        <Table columns={columns} dataSource={item} />
      </div>
 
      {/* Add Category Modal */}
      <Modal title="Add Item" open={isModalOpen} onOk={handleAddCategory} onCancel={handleCancel}>
        <div>Category: </div>
        <Select placeholder="Select a Category" style={{ width: "100%", marginTop: "10px" }} value={selectedCategory} onChange={handleCategoryChange}>
          {categoryOptions.map((category) => (
            <Option key={category} value={category}>
              {category}
            </Option>
          ))}
        </Select>
        <div>Sub Category: </div>
        <Select placeholder="Select a Sub Category" style={{ width: "100%", marginTop: "10px" }} value={selectedSubCategory} onChange={handleSubCategoryChange}>
          {subCategoryOptions.map((subCategory) => (
            <Option key={subCategory} value={subCategory}>
              {subCategory}
            </Option>
          ))}
        </Select>
        <div style={{ marginTop: 10 }}>Item: </div>
        <Input placeholder="Enter Item" style={{ marginTop: 10 }} value={itemInput} onChange={(e) => setItemInput(e.target.value)} />
        <div style={{ marginTop: "10px" }}>Image URL:</div>
        <Input placeholder="Enter image URL" value={imageUrlInput} style={{ marginTop: "10px" }} onChange={(e) => setImageUrlInput(e.target.value)} />
      </Modal>
 
      {/* Edit Category Modal */}
      <Modal title="Edit Item" open={editModalVisible} onOk={handleEditOk} onCancel={handleEditCancel}>
        <div>Category: </div>
        <Select placeholder="Select a Category" style={{ width: "100%", marginTop: "10px" }} value={selectedCategory} onChange={handleCategoryChange}>
          {categoryOptions.map((category) => (
            <Option key={category} value={category}>
              {category}
            </Option>
          ))}
        </Select>
        <div>Sub Category: </div>
        <Select placeholder="Select a Sub Category" style={{ width: "100%", marginTop: "10px" }} value={selectedSubCategory} onChange={handleSubCategoryChange}>
          {subCategoryOptions.map((subCategory) => (
            <Option key={subCategory} value={subCategory}>
              {subCategory}
            </Option>
          ))}
        </Select>
        <div style={{ marginTop: 10 }}>Item: </div>
        <Input placeholder="Edit Item" value={itemInput} style={{ marginTop: 10 }} onChange={(e) => setItemInput(e.target.value)} />
        <div style={{ marginTop: "10px" }}>Image URL:</div>
        <Input placeholder="Edit image URL" value={imageUrlInput} style={{ marginTop: "10px" }} onChange={(e) => setImageUrlInput(e.target.value)} />
      </Modal>
    </div>
  );
};
 
export default AdminItems;