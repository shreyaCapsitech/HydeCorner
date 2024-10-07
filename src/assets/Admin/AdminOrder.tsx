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
  InputNumber,
  theme,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  useUserProfiles,
  useItems,
  fetchOrders,
  addOrder,
  editOrder,
  deleteOrder,
} from "../../HandleApi/Api";

const { Search } = Input;
const { Option } = Select;

interface DataType {
  key: string;
  id: string;
  userId: string;
  itemId: string[];
  quantities: number[];
  instruction: string;
  totalPrice: string;
}

const AdminOrder: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<string | undefined>(
    undefined
  );
  const [selectedItems, setSelectedItems] = useState<
    { itemId: string; quantity: number }[]
  >([]); // Store items with quantity
  const [instructionInput, setInstructionInput] = useState<string>("");
  const [orders, setOrders] = useState<DataType[]>([]);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [editRecord, setEditRecord] = useState<DataType | null>(null);
  const { data: items, isLoading: itemsLoading } = useItems();
  const { data: users, isLoading: usersLoading } = useUserProfiles();

  // Fetch Orders
 useEffect(() => {
    fetchOrders().then((data) => setOrders(data));
 }, []);

  // Calculate total price based on selected items and their quantities
  const calculateTotalPrice = () => {
    return selectedItems.reduce((total, selectedItem) => {
      const item = items?.find((item: any) => item.id === selectedItem.itemId);
      return (
        total + (item ? parseFloat(item.price) * selectedItem.quantity : 0)
      );
    }, 0);
  };

  const handleAddItem = () => {
    if (!selectedItems.length || !selectedItems.length) {
      message.error("Please fill all fields!");
      return;
    }

    const newOrder = {
      userId: selectedUser,
      itemId: selectedItems.map((item) => item.itemId),
      quantities: selectedItems.map((item) => item.quantity),
      instruction: instructionInput,
      totalPrice: calculateTotalPrice().toFixed(2),
    };

    addOrder(newOrder).then(() => {
      fetchOrders().then((data) => {
        setOrders(data);
        setSelectedUser(undefined);
        setSelectedItems([]); // Reset selected items after adding
        setInstructionInput("");
        setIsModalOpen(false);
        message.success("Order added successfully!");
      });
    });
  };

  const handleDelete = (id: string) => {
    deleteOrder(id).then(() => {
      setOrders((prev) => prev.filter((order) => order.id !== id));
      message.success("Order deleted successfully!");
    });
  };

  const handleEdit = (record: DataType) => {
    setEditRecord(record);
    setEditModalVisible(true);
    setSelectedUser(record.userId);
    setSelectedItems(
      record.itemId.map((itemId, index) => ({
        itemId,
        quantity: record.quantities[index],
      }))
    );
    setInstructionInput(record.instruction);
  };

  const handleEditOk = () => {
    if (!editRecord || !selectedItems.length) return;

    const updatedOrder = {
      ...editRecord,
      userId: selectedUser!,
      itemId: selectedItems.map((item) => item.itemId),
      quantities: selectedItems.map((item) => item.quantity),
      instruction: instructionInput,
      totalPrice: calculateTotalPrice().toFixed(2),
    };

    editOrder(editRecord.id, updatedOrder).then(() => {
      fetchOrders().then((data) => {
        setOrders(data);
        setEditModalVisible(false);
        setSelectedUser(undefined);
        setSelectedItems([]);
        setInstructionInput("");
        message.success("Order updated successfully!");
      });
    });
  };

  const handleUserChange = (value: string) => {
    setSelectedUser(value);
  };

  const handleItemChange = (value: string, index: number) => {
    const updatedItems = [...selectedItems];
    if (updatedItems[index]) {
      updatedItems[index] = { ...updatedItems[index], itemId: value };
    } else {
      updatedItems.push({ itemId: value, quantity: 1 });
    }
    setSelectedItems(updatedItems);
  };

  const handleQuantityChange = (value: number, index: number) => {
    const updatedItems = [...selectedItems];
    if (updatedItems[index]) {
      updatedItems[index] = { ...updatedItems[index], quantity: value };
    } else {
      updatedItems.push({ itemId: "", quantity: value });
    }
    setSelectedItems(updatedItems);
  };

  const handleAddNewItem = () => {
    setSelectedItems([...selectedItems, { itemId: "", quantity: 1 }]);
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = selectedItems.filter((_, i) => i !== index);
    setSelectedItems(updatedItems);
  };

  const handleEditCancel = () => {
    setEditModalVisible(false);
    setSelectedUser(undefined);
    setSelectedItems([]);
    setInstructionInput("");
  };

  const showModal = () => {
    setSelectedUser(undefined);
    setSelectedItems([{ itemId: "", quantity: 1 }]); // Initialize with one empty item
    setInstructionInput("");
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getUserName = (userId: string) => {
    return users?.find((user: any) => user.id === userId)?.name || "Unknown";
  };

  const getItemName = (itemId: string) => {
    return (
      items?.find((item: any) => item.id === itemId)?.itemName || "Unknown"
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
      title: "User",
      dataIndex: "userId",
      key: "userId",
      render: (userId: string) => getUserName(userId),
    },
    {
      title: "Items",
      dataIndex: "itemId",
      key: "itemId",
      render: (itemId: string[], record: DataType) =>
        itemId
          .map(
            (itemId, index) =>
              `${getItemName(itemId)} (x${record.quantities[index]})`
          )
          .join(", "),
    },
    {
      title: "Instructions",
      dataIndex: "instruction",
      key: "instruction",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: DataType) => (
        <Space size="middle">
          <EditOutlined
            onClick={() => handleEdit(record)}
            style={{ color: "#13274F" }}
          />
          <Popconfirm
            title="Are you sure to delete this item?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined style={{ color: "red" }} />
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
        <PlusOutlined /> Add Order
      </Button>
      <div>
        <Table columns={columns} dataSource={orders} rowKey="id" />
      </div>

      {/* Add Order Modal */}
      <Modal
        title="Add Order"
        open={isModalOpen}
        onOk={handleAddItem}
        onCancel={handleCancel}
      >
        <div>User: </div>
        <Select
          placeholder="Select a User"
          style={{ width: "100%", marginTop: "10px" }}
          value={selectedUser}
          onChange={handleUserChange}
          loading={usersLoading}
        >
          {users?.map((user: any) => (
            <Option key={user.id} value={user.id}>
              {user.name}
            </Option>
          ))}
        </Select>
        <div>Items:</div>
        {selectedItems.map((selectedItem, index) => (
          <div key={index} style={{ marginBottom: 16 }}>
            <Select
              placeholder="Select Item"
              style={{ width: "70%", marginRight: 10 }}
              value={selectedItem?.itemId || ""}
              onChange={(value) => handleItemChange(value, index)}
              loading={itemsLoading}
            >
              {items?.map((item: any) => (
                <Option key={item.id} value={item.id}>
                  {item.itemName}
                </Option>
              ))}
            </Select>

            <InputNumber
              min={1}
              placeholder="Quantity"
              value={selectedItem?.quantity || 1}
              onChange={(value) => handleQuantityChange(value!, index)}
            />
            <Button
              type="text"
              icon={<DeleteOutlined />}
              danger
              onClick={() => handleRemoveItem(index)}
            />
          </div>
        ))}

        <Button
          onClick={handleAddNewItem}
          type="dashed"
          style={{ width: "100%" }}
        >
          Add Another Item
        </Button>

        <div style={{ marginTop: 10 }}>Instruction:</div>
        <Input.TextArea
          rows={4}
          placeholder="Add Instruction"
          value={instructionInput}
          style={{ marginTop: "10px" }}
          onChange={(e) => setInstructionInput(e.target.value)}
        />

        <div style={{ marginTop: 10 }}>
          Total Price: {calculateTotalPrice().toFixed(2)}
        </div>
      </Modal>

      {/* Edit Order Modal */}
      <Modal
        title="Edit Order"
        open={editModalVisible}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
      >
        <div>User: </div>
        <Select
          placeholder="Select a User"
          style={{ width: "100%", marginTop: "10px" }}
          value={selectedUser}
          onChange={handleUserChange}
          loading={usersLoading}
        >
          {users?.map((user: any) => (
            <Option key={user.id} value={user.id}>
              {user.name}
            </Option>
          ))}
        </Select>
        <div>Items:</div>
        {selectedItems.map((selectedItem, index) => (
          <div key={index} style={{ marginBottom: 16 }}>
            <Select
              placeholder="Select Item"
              style={{ width: "70%", marginRight: 10 }}
              value={selectedItem?.itemId || ""}
              onChange={(value) => handleItemChange(value, index)}
              loading={itemsLoading}
            >
              {items?.map((item: any) => (
                <Option key={item.id} value={item.id}>
                  {item.itemName}
                </Option>
              ))}
            </Select>

            <InputNumber
              min={1}
              placeholder="Quantity"
              value={selectedItem?.quantity || 1}
              onChange={(value) => handleQuantityChange(value!, index)}
            />
            <Button
              type="text"
              icon={<DeleteOutlined />}
              danger
              onClick={() => handleRemoveItem(index)}
            />
          </div>
        ))}

        <div style={{ marginTop: 10 }}>Instruction:</div>
        <Input.TextArea
          rows={4}
          placeholder="Add Instruction"
          value={instructionInput}
          style={{ marginTop: "10px" }}
          onChange={(e) => setInstructionInput(e.target.value)}
        />

        <div style={{ marginTop: 10 }}>
          Total Price: {calculateTotalPrice().toFixed(2)}
        </div>
      </Modal>
    </div>
  );
};

export default AdminOrder;
