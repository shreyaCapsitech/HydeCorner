import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { theme, Card, Input, List } from "antd";
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
      const categoryName = item.categoryName
        ? item.categoryName.toLowerCase()
        : "";
      return categoryName.includes(searchTerm.toLowerCase());
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
        maxWidth: 1000,
        margin: "0 auto",
      }}
    >
      <div>
        <Search
          placeholder="Search categories"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
          style={{ margin: 8, width: 500 }}
        />
      </div>
 
      <div
        style={{
          marginTop: "40px",
          width: "100%",
        }}
      >
        {filteredItems.length > 0 ? (
          <List
            grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 4 }}
            dataSource={filteredItems}
            renderItem={(Category: any) => (
              <List.Item>
                <Card
                  hoverable
                  id={Category.categoryName}
                  style={{ width: 240, height: 400 }}
                  cover={
                    <img
                      style={{ height: "220px" }}
                      alt={Category.categoryName}
                      src={Category.imageUrl}
                    />
                  }
                  onClick={() =>                
                    navigate(`/user/sub-category#${Category.categoryName.toLowerCase()}`)
                  }
                >
                  <Meta
                    title={Category.categoryName}
                    description={Category.desc}
                  />
                </Card>
              </List.Item>
            )}
          />
        ) : (
          <p>No categories found.</p>
        )}
      </div>
    </div>
  );
};
 
export default Category;