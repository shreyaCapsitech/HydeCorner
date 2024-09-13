import React, { useState } from "react";
import {
  Button,
  Input,
  Modal,
  Space,
  Table,
  Popconfirm,
  message,
  Select,
  Image,
  theme,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";

const { Search } = Input;
const { Option } = Select;

interface DataType {
  key: string;
  imageUrl: string;
  category: string;
  subCategory: string;
  desc: string;
}

const AdminSubCategory: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [imageUrlInput, setImageUrlInput] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [subCategoryInput, setSubCategoryInput] = useState<string>("");
  const [descInput, setDescInput] = useState<string>("");
  const [subCategory, setSubCategory] = useState<DataType[]>([]);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [editRecord, setEditRecord] = useState<DataType | null>(null);

  const categoryOptions = ["South Indian", "North Indian"];

  const handleAddSubCategory = () => {
    if (subCategoryInput.trim() === "") {
      message.warning("Please enter a subCategory");
      return;
    }

    if (imageUrlInput.trim() === "") {
      message.warning("Please enter a Image Url");
      return;
    }

    if (descInput.trim() === "") {
      message.warning("Please enter a Description");
      return;
    }

    const newSubCategory: DataType = {
      key: (subCategory.length + 1).toString(),
      imageUrl: imageUrlInput,
      category: selectedCategory,
      subCategory: subCategoryInput,
      desc: descInput,
    };

    setImageUrlInput("");
    setSelectedCategory("");
    setSubCategory([...subCategory, newSubCategory]);
    setSubCategoryInput("");
    setDescInput("");
    setIsModalOpen(false);
    message.success("Sub Category added successfully!");
  };

  const handleDelete = (key: string) => {
    setSubCategory(
      subCategory.filter((subCategory) => subCategory.key !== key)
    );
    message.success("Sub Category deleted successfully!");
  };

  const handleEdit = (record: DataType) => {
    setEditRecord(record);
    setEditModalVisible(true);
    setImageUrlInput(record.imageUrl);
    setSelectedCategory(record.category);
    setSubCategoryInput(record.subCategory);
    setDescInput(record.desc);
  };

  const handleEditOk = () => {
    if (!editRecord) return;
    setSubCategory((prev) =>
      prev.map((item) =>
        item.key === editRecord.key
          ? {
              ...item,
              imageUrl: imageUrlInput,
              category: selectedCategory,
              subCategory: subCategoryInput,
              desc: descInput,
            }
          : item
      )
    );
    setEditModalVisible(false);
    setImageUrlInput("");
    setSelectedCategory("");
    setSubCategoryInput("");
    setDescInput("");
    message.success("Sub Category updated successfully!");
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handleEditCancel = () => {
    setEditModalVisible(false);
    setImageUrlInput("");
    setSelectedCategory("");
    setSubCategoryInput("");
    setDescInput("");
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
      render: (url: string) => (
        <Image width={50} src={url} alt="category image" />
      ),
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
      title: "Description",
      dataIndex: "desc",
      key: "desc",
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

      <Button type="primary" onClick={showModal} style={{ width: "160px" }}>
        <PlusOutlined /> Add Sub-Category
      </Button>

      <div>
        <Table columns={columns} dataSource={subCategory} />
      </div>

      {/* Add Category Modal */}
      <Modal
        title="Add Sub-Category"
        open={isModalOpen}
        onOk={handleAddSubCategory}
        onCancel={handleCancel}
      >
        <div>Category: </div>
        <Select
          placeholder="Select a Category"
          style={{ width: "100%", marginTop: "10px" }}
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          {categoryOptions.map((category) => (
            <Option key={category} value={category}>
              {category}
            </Option>
          ))}
        </Select>
        <div style={{ marginTop: 10 }}>Sub-Category: </div>
        <Input
          placeholder="Enter Sub-Category"
          style={{ marginTop: 10 }}
          value={subCategoryInput}
          onChange={(e) => setSubCategoryInput(e.target.value)}
        />
        <div style={{ marginTop: 10 }}>Description: </div>
        <Input.TextArea
          rows={4}
          placeholder="Enter Description"
          value={descInput}
          style={{ marginTop: "10px" }}
          onChange={(e) => setDescInput(e.target.value)}
        />
        <div style={{ marginTop: "10px" }}>Image URL:</div>
        <Input
          placeholder="Enter image URL"
          value={imageUrlInput}
          style={{ marginTop: "10px" }}
          onChange={(e) => setImageUrlInput(e.target.value)}
        />
      </Modal>

      {/* Edit Category Modal */}
      <Modal
        title="Edit Sub-Category"
        open={editModalVisible}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
      >
        <div>Category: </div>
        <Select
          placeholder="Select a Category"
          style={{ width: "100%", marginTop: "10px" }}
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          {categoryOptions.map((category) => (
            <Option key={category} value={category}>
              {category}
            </Option>
          ))}
        </Select>
        <div style={{ marginTop: 10 }}>Sub-Category: </div>
        <Input
          placeholder="Edit Sub-Category"
          value={subCategoryInput}
          style={{ marginTop: 10 }}
          onChange={(e) => setSubCategoryInput(e.target.value)}
        />
        <div style={{ marginTop: 10 }}>Description: </div>
        <Input.TextArea
          rows={4}
          placeholder="Enter Description"
          value={descInput}
          style={{ marginTop: "10px" }}
          onChange={(e) => setDescInput(e.target.value)}
        />
        <div style={{ marginTop: "10px" }}>Image URL:</div>
        <Input
          placeholder="Edit image URL"
          value={imageUrlInput}
          style={{ marginTop: "10px" }}
          onChange={(e) => setImageUrlInput(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default AdminSubCategory;
