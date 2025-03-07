import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const Categories = ({
  selectedCategory,
  setSelectedCategory,
  setShowCategories,
}: {
  selectedCategory: any;
  setSelectedCategory: any;
  setShowCategories: any;
}) => {
  const categories = [
    { id: 1, name: "Food and Drinks" },
    { id: 2, name: "Shopping" },
    { id: 3, name: "Housing" },
    { id: 4, name: "Transportation" },
    { id: 5, name: "Health" },
  ];

  const handleSelect = (item:any) => {
    setSelectedCategory(item.id === selectedCategory?.id ? null : {
      id: item.id,
      name: item.name,
    });
    setShowCategories(false);
  };

  return (
    <View>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelect(item)}>
            <Text>{item?.name}</Text>
          </TouchableOpacity>
        )}
        
      ></FlatList>
    </View>
  );
};

export default Categories;
