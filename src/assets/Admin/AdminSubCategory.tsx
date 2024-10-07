import React, { useState, useEffect } from "react";
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
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  useCategories,
  fetchSubCategories,
  addSubCategory,
  editSubCategory,
  deleteSubCategory,
} from "../../HandleApi/Api"; // Import necessary API functions


const { Search } = Input;
const { Option } = Select;

interface DataType {
  key: string;
  id: string; // subcategory id
  imageUrl: string;
  categoryId: string;
  subCategoryName: string;
  desc: string;
}

const AdminSubCategory: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [imageUrlInput, setImageUrlInput] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  );
  const [subCategoryInput, setSubCategoryInput] = useState<string>("");
  const [descInput, setDescInput] = useState<string>("");
  const [subCategory, setSubCategory] = useState<DataType[]>([]);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [editRecord, setEditRecord] = useState<DataType | null>(null);
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  
  // Fetch SubCategories on component mount
  useEffect(() => {
    fetchSubCategories().then((data) => setSubCategory(data));
  }, []);

  const handleAddSubCategory = () => {
    if (subCategoryInput.trim() === "") {
      message.warning("Please enter a subCategory");
      return;
    }
    if (!selectedCategory) {
      message.warning("Please select a category");
      return;
    }
    if (imageUrlInput.trim() === "") {
      message.warning("Please enter an Image URL");
      return;
    }
    if (descInput.trim() === "") {
      message.warning("Please enter a Description");
      return;
    }

    const newSubCategory = {
      imageUrl: imageUrlInput,
      categoryId: selectedCategory, // Using category ID instead of name
      subCategoryName: subCategoryInput,
      desc: descInput,
    };

    addSubCategory(newSubCategory).then(() => {
      fetchSubCategories().then((data) => {
        setSubCategory(data);
        setImageUrlInput("");
        setSelectedCategory(undefined);
        setSubCategoryInput("");
        setDescInput("");
        setIsModalOpen(false);
        message.success("Sub Category added successfully!");
      });
    });
  };

  const handleDelete = (id: string) => {
    deleteSubCategory(id).then(() => {
      setSubCategory((prev) => prev.filter((item) => item.id !== id));
      message.success("Sub Category deleted successfully!");
    });
  };

  const handleEdit = (record: DataType) => {
    setEditRecord(record);
    setEditModalVisible(true);
    setImageUrlInput(record.imageUrl);
    setSelectedCategory(record.categoryId);
    setSubCategoryInput(record.subCategoryName);
    setDescInput(record.desc);
  };

  const handleEditOk = () => {
    if (!editRecord) return;

    const updatedSubCategory = {
      ...editRecord,
      imageUrl: imageUrlInput,
      categoryId: selectedCategory!,
      subCategoryName: subCategoryInput,
      desc: descInput,
    };

    editSubCategory(editRecord.id, updatedSubCategory).then(() => {
      fetchSubCategories().then((data) => {
        setSubCategory(data);
        setEditModalVisible(false);
        setImageUrlInput("");
        setSelectedCategory(undefined);
        setSubCategoryInput("");
        setDescInput("");
        message.success("Sub Category updated successfully!");
      });
    });
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handleEditCancel = () => {
    setEditModalVisible(false);
    setImageUrlInput("");
    setSelectedCategory(undefined);
    setSubCategoryInput("");
    setDescInput("");
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Map the categoryId to the category name using the categories fetched from the API
  const getCategoryName = (categoryId: string) => {
    return (
      categories?.find((category: any) => category.id === categoryId)
        ?.categoryName || "Unknown"
    );
  };

  const columns = [
    {
      title: "Serial No.",
      dataIndex: "id",
      key: "id",
      render: (text: any, record: any, index: number) => index + 1,
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
      dataIndex: "categoryId",
      key: "categoryId",
      render: (categoryId: string) => getCategoryName(categoryId),
    },
    {
      title: "Sub-Category",
      dataIndex: "subCategoryName",
      key: "subCategoryName",
    },
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: DataType) => (
        <Space size="middle">
          <EditOutlined onClick={() => handleEdit(record)} style={{color: "#13274F"}}/>
          <Popconfirm
            title="Are you sure to delete this subCategory?"
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
      <Button type="primary" onClick={showModal} style={{ width: "160px" }}>
        <PlusOutlined /> Add Sub-Category
      </Button>
      <div>
        <Table columns={columns} dataSource={subCategory} rowKey="id" />
      </div>

      {/* Add Sub-Category Modal */}
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
          loading={categoriesLoading}
        >
          {categories?.map((category: any) => (
            <Option key={category.id} value={category.id}>
              {category.categoryName}
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

      {/* Edit Sub-Category Modal */}
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
          loading={categoriesLoading}
        >
          {categories?.map((category: any) => (
            <Option key={category.id} value={category.id}>
              {category.categoryName}
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
    </div>
  );
};

export default AdminSubCategory;
