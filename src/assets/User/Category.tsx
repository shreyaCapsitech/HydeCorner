import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { theme, Card, Input } from "antd";
import { useCategories } from "../../HandleApi/Api";  // Import API hooks
 
const { Search } = Input;
 
const Category: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
 
    // Fetch categories using the custom hook
    const { data: categories, isLoading, isError } = useCategories();
 
    // Set up navigation for routing
    const navigate = useNavigate();
 
    // Filter function to filter categories based on search term
    const filterItems = (items: any[]) => {
        return items.filter(item => 
            item?.categoryname?.toLowerCase().includes(searchTerm?.toLowerCase()) || 
            item?.desc?.toLowerCase().includes(searchTerm?.toLowerCase())
        );
    };
 
    // Handle search input change
    const onSearch = (value: string) => {
        setSearchTerm(value);
    };
 
    // If data is loading or there's an error, show respective messages
    if (isLoading) return <p>Loading categories...</p>;
    if (isError) return <p>Error loading categories.</p>;
 
    // Filtered categories based on the search term
    const filteredItems = categories ? filterItems(categories) : [];
 
    const { Meta } = Card;
    const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
 
    return (
        <div style={{
            padding: 8,
            minHeight: 720,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            display: "flex",
            flexDirection: "column",
            alignItems: "center", // Centers the content horizontally
        }}>
            {/* Search Bar */}
            <div>
                <Search
                    placeholder="Search categories"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={onSearch}
                    style={{ margin: "8px", width: "500px" }}
                />
            </div>
 
            {/* Category Cards */}
            <div style={{
                display: "flex",
                justifyContent: "center",
                gap: "50px",
                flexWrap: "wrap",  // Ensures cards wrap on smaller screens
                marginTop: "40px", // Adds spacing between the search and cards
            }}>
                {filteredItems.length > 0 ? (
                    filteredItems.map((category: any, index: number) => (
                        <Card
                            key={index}
                            hoverable
                            style={{ width: 240, height: 400 }}
                            cover={<img style={{ height: "220px" }} alt={category.categoryname} src={category.imageurl} />}
                            onClick={() => navigate(`/items#${category.categoryname.toLowerCase()}`)}  // Dynamic navigation
                        >
                            <Meta title={category.categoryname} description={category.desc} />
                        </Card>
                    ))
                ) : (
                    <p>No categories found.</p>
                )}
            </div>
        </div>
    );
};
 
export default Category;
 