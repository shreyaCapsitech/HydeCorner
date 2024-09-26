import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { theme, Card, Input } from "antd";
import { useCategories } from "../../HandleApi/Api";
 
const Category: React.FC = () => {
  const { Meta } = Card;
  const { Search } = Input;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
 
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
 
  const { data: categories, isLoading, isError } = useCategories();
  const navigate = useNavigate();
 
  const filterItems = (items: any[]) => {
    if (!searchTerm) return items;
    return items?.filter((item) => {
      const categoryName = item.categoryName ? item.categoryName.toLowerCase() : "";
     
      return (
        categoryName.includes(searchTerm.toLowerCase())
      );
    });
  };
 
  const onSearch = (value: string) => {
    setSearchTerm(value);
  };
 
  useEffect(() => {
    if (categories) {
      const filtered = filterItems(categories);
      setFilteredItems(filtered);
    }
  }, [categories, searchTerm]);
 
  if (isLoading) return <p>Loading categories...</p>;
  if (isError) return <p>Error loading categories.</p>;
 
  return (
<div
      style={{
        padding: 8,
        minHeight: 720,
        marginTop: 16,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
>
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
 
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "50px",
          flexWrap: "wrap",
          marginTop: "40px",
        }}
>
        {filteredItems.length > 0 ? (
          filteredItems.map((category: any, index: number) => (
<Card
              key={index}
              hoverable
              style={{ width: 240, height: 400 }}
              cover={<img style={{ height: "220px" }} alt={category.categoryName} src={category.imageUrl} />}
              onClick={() => navigate(`/items#${category.categoryName.toLowerCase()}`)}
>
<Meta title={category.categoryName} description={category.desc} />
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