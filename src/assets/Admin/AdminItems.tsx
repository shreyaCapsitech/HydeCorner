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
  useSubCategories,
  fetchItems,
  addItem,
  editItem,
  deleteItem,
} from "../../HandleApi/Api"; // Import necessary API functions

const { Search } = Input;
const { Option } = Select;

interface DataType {
  key: string;
  id: string;
  imageUrl: string;
  categoryId: string;
  subCategoryId: string;
  itemName: string;
  desc: string;
  price: string;
}

const AdminItem: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [imageUrlInput, setImageUrlInput] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState<
    string | undefined
  >(undefined);
  const [itemInput, setItemInput] = useState<string>("");
  const [descInput, setDescInput] = useState<string>("");
  const [priceInput, setPriceInput] = useState<string>("");
  const [items, setItems] = useState<DataType[]>([]);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [editRecord, setEditRecord] = useState<DataType | null>(null);
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: subCategories, isLoading: subCategoriesLoading } = useSubCategories();

  // Fetch Items on component mount
  useEffect(() => {
    fetchItems().then((data) => setItems(data));
  }, []);

  const handleAddItem = () => {
    if (itemInput.trim() === "") {
      message.warning("Please enter an item name");
      return;
    }
    if (!selectedCategory) {
      message.warning("Please select a category");
      return;
    }
    if (!selectedSubCategory) {
      message.warning("Please select a sub-category");
      return;
    }
    if (imageUrlInput.trim() === "") {
      message.warning("Please enter an Image URL");
      return;
    }
    if (descInput.trim() === "") {
      message.warning("Please enter a description");
      return;
    }
    if (priceInput.trim() === "") {
      message.warning("Please enter a price");
      return;
    }

    const newItem = {
      imageUrl: imageUrlInput,
      categoryId: selectedCategory,
      subCategoryId: selectedSubCategory,
      itemName: itemInput,
      desc: descInput,
      price: priceInput,
    };

    addItem(newItem).then(() => {
      fetchItems().then((data) => {
        setItems(data);
        setImageUrlInput("");
        setSelectedCategory(undefined);
        setSelectedSubCategory(undefined);
        setItemInput("");
        setDescInput("");
        setPriceInput("");
        setIsModalOpen(false);
        message.success("Item added successfully!");
      });
    });
  };

  const handleDelete = (id: string) => {
    deleteItem(id).then(() => {
      setItems((prev) => prev.filter((item) => item.id !== id));
      message.success("Item deleted successfully!");
    });
  };

  const handleEdit = (record: DataType) => {
    setEditRecord(record);
    setEditModalVisible(true);
    setImageUrlInput(record.imageUrl);
    setSelectedCategory(record.categoryId);
    setSelectedSubCategory(record.subCategoryId);
    setItemInput(record.itemName);
    setDescInput(record.desc);
    setPriceInput(record.price);
  };

  const handleEditOk = () => {
    if (!editRecord) return;

    const updatedItem = {
      ...editRecord,
      imageUrl: imageUrlInput,
      categoryId: selectedCategory!,
      subCategoryId: selectedSubCategory!,
      itemName: itemInput,
      desc: descInput,
      price: priceInput,
    };

    editItem(editRecord.id, updatedItem).then(() => {
      fetchItems().then((data) => {
        setItems(data);
        setEditModalVisible(false);
        setImageUrlInput("");
        setSelectedCategory(undefined);
        setSelectedSubCategory(undefined);
        setItemInput("");
        setDescInput("");
        setPriceInput("");
        message.success("Item updated successfully!");
      });
    });
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setSelectedSubCategory(undefined); // Reset sub-category when category changes
  };

  const handleSubCategoryChange = (value: string) => {
    setSelectedSubCategory(value);
  };

  const handleEditCancel = () => {
    setEditModalVisible(false);
    setImageUrlInput("");
    setSelectedCategory(undefined);
    setSelectedSubCategory(undefined);
    setItemInput("");
    setDescInput("");
    setPriceInput("");
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Map the categoryId to the category name
  const getCategoryName = (categoryId: string) => {
    return (
      categories?.find((category: any) => category.id === categoryId)
        ?.categoryName || "Unknown"
    );
  };

  // Map the subCategoryId to the sub-category name
  const getSubCategoryName = (subCategoryId: string) => {
    return (
      subCategories?.find(
        (subCategory: any) => subCategory.id === subCategoryId
      )?.subCategoryName || "Unknown"
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
      render: (url: string) => <Image width={50} src={url} alt="item image" />,
    },
    {
      title: "Category",
      dataIndex: "categoryId",
      key: "categoryId",
      render: (categoryId: string) => getCategoryName(categoryId),
    },
    {
      title: "Sub-Category",
      dataIndex: "subCategoryId",
      key: "subCategoryId",
      render: (subCategoryId: string) => getSubCategoryName(subCategoryId),
    },
    {
      title: "Item",
      dataIndex: "itemName",
      key: "itemName",
    },
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: DataType) => (
        <Space size="middle">
         <EditOutlined onClick={() => handleEdit(record)} style={{color: "#13274F"}}/>
          <Popconfirm
            title="Are you sure to delete this item?"
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
      <Button type="primary" onClick={showModal} style={{ width: "100px" }}>
        <PlusOutlined /> Add Item
      </Button>
      <div>
        <Table columns={columns} dataSource={items} rowKey="id" />
      </div>

      {/* Add Item Modal */}
      <Modal
        title="Add Item"
        open={isModalOpen}
        onOk={handleAddItem}
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
        <Select
          placeholder="Select a Sub-Category"
          style={{ width: "100%", marginTop: "10px" }}
          value={selectedSubCategory}
          onChange={handleSubCategoryChange}
          loading={subCategoriesLoading}
          disabled={!selectedCategory}
        >
          {subCategories
            ?.filter(
              (subCategory: any) => subCategory.categoryId === selectedCategory
            )
            .map((subCategory: any) => (
              <Option key={subCategory.id} value={subCategory.id}>
                {subCategory.subCategoryName}
              </Option>
            ))}
        </Select>
        <div style={{ marginTop: 10 }}>Item Name: </div>
        <Input
          placeholder="Enter Item Name"
          style={{ marginTop: 10 }}
          value={itemInput}
          onChange={(e) => setItemInput(e.target.value)}
        />
        <div style={{ marginTop: 10 }}>Price: </div>
        <Input
          placeholder="Enter Price"
          style={{ marginTop: 10 }}
          value={priceInput}
          onChange={(e) => setPriceInput(e.target.value)}
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
          placeholder="Enter Image URL"
          value={imageUrlInput}
          style={{ marginTop: "10px" }}
          onChange={(e) => setImageUrlInput(e.target.value)}
        />
      </Modal>

      {/* Edit Item Modal */}
      <Modal
        title="Edit Item"
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
        <Select
          placeholder="Select a Sub-Category"
          style={{ width: "100%", marginTop: "10px" }}
          value={selectedSubCategory}
          onChange={handleSubCategoryChange}
          loading={subCategoriesLoading}
          disabled={!selectedCategory}
        >
          {subCategories
            ?.filter(
              (subCategory: any) => subCategory.categoryId === selectedCategory
            )
            .map((subCategory: any) => (
              <Option key={subCategory.id} value={subCategory.id}>
                {subCategory.subCategoryName}
              </Option>
            ))}
        </Select>
        <div style={{ marginTop: 10 }}>Item Name: </div>
        <Input
          placeholder="Enter Item Name"
          style={{ marginTop: 10 }}
          value={itemInput}
          onChange={(e) => setItemInput(e.target.value)}
        />
         <div style={{ marginTop: 10 }}>Price: </div>
        <Input
          placeholder="Enter Price"
          style={{ marginTop: 10 }}
          value={priceInput}
          onChange={(e) => setPriceInput(e.target.value)}
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
          placeholder="Enter Image URL"
          value={imageUrlInput}
          style={{ marginTop: "10px" }}
          onChange={(e) => setImageUrlInput(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default AdminItem;
