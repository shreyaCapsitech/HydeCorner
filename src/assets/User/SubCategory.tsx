import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { theme, Input, List, Divider } from "antd";
import { useCategories, useSubCategories } from "../../HandleApi/Api";
 
const SubCategory: React.FC = () => {
  const { Search } = Input;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const { data: categories } = useCategories();
  const { data: subcategories, isLoading, isError } = useSubCategories();
  const navigate = useNavigate();
 
  const filterItems = (subcategories: any[]) => {
    if (!searchTerm) return subcategories;
    return subcategories?.filter((subCategory) => {
      const categoryName = subCategory.categoryName
        ? subCategory.categoryName.toLowerCase()
        : "";
      return categoryName.includes(searchTerm.toLowerCase());
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

  useEffect(() => {
    const hash = location.hash.substring(1); // Remove the '#' from the hash
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
 
  if (isLoading) return <p>Loading sub categories...</p>;
  if (isError) return <p>Error loading sub categories.</p>;
 
  return (
    <div
      style={{
        padding: 24,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
        maxWidth: "1000px",
        margin: "0 auto", // Centering the list content
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
      
      {categories?.map((category: any) => {
        const categoryItems = subcategories?.filter(
          (subCategory: any) => subCategory.categoryId === category.id
        );

        if (!categoryItems.length) return null; // Skip categories with no items

        return(
          <div key={category.id} style={{ marginBottom: "40px" }} id={category.categoryName}>
      <Divider orientation="left" >
        <h3>{category.categoryName}</h3>
      </Divider>
 
      <List
        size="large"
        itemLayout="horizontal"
        bordered
        dataSource={filterItems(categoryItems)}
        renderItem={(subCategory) => (
          <List.Item
            id={subCategory.subCategoryName}
            onClick={() => navigate(`/user/items#${subCategory.subCategoryName.toLowerCase()}`)}
            style={{ cursor: "pointer" }}
          >
            <List.Item.Meta
              avatar={
                <img
                  src={subCategory.imageUrl}
                  alt={subCategory.subCategoryName}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
              }
              title={subCategory.subCategoryName}
              description={
                <>
                  <div style={{ fontWeight: "bold", color: "#3c3c3c" }}>
                   {subCategory.desc || "No description available"}
                  </div>
                </>
              }
            />
          </List.Item>
        )}
      />
      </div>
        );
        })}
    </div>
  );
};
 
export default SubCategory;