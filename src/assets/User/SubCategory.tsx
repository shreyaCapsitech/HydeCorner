import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { theme, Card, Input } from "antd";
import { useSubCategories } from "../../HandleApi/Api";

const SubCategory: React.FC = () => {
  const { Meta } = Card;
  const { Search } = Input;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
 
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
 
  const { data: subcategories, isLoading, isError } = useSubCategories();
  const navigate = useNavigate();
 
  const filterItems = (items: any[]) => {
    if (!searchTerm) return items;
    return items?.filter((item) => {
      const subCategoryName = item.subCategoryName ? item.subCategoryName.toLowerCase() : "";
      return (
        subCategoryName.includes(searchTerm.toLowerCase())
      );
    });
  };
 
  const onSearch = (value: string) => {
    setSearchTerm(value);
  };
 
  useEffect(() => {
    if (subcategories) {
      const filtered = filterItems(subcategories);
      setFilteredItems(filtered);
    }
  }, [subcategories, searchTerm]);
 
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
        filteredItems.map((subCategory: any, index: number) => (
<Card
            key={index}
            hoverable
            style={{ width: 240, height: 400 }}
            cover={<img style={{ height: "220px" }} alt={subCategory.subCategoryName} src={subCategory.imageUrl} />}
            onClick={() => navigate(`/items#${subCategory.subCategoryName.toLowerCase()}`)}
>
<Meta title={subCategory.subCategoryName} description={subCategory.desc} />
</Card>
        ))
      ) : (
<p>No categories found.</p>
      )}
</div>
</div>
 
  );
};
export default SubCategory;

