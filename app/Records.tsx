import React from "react";
import { Button, View } from "react-native";
import Input from "./Input";
import CircularButton from "./buttons/CircularButton";
import Categories from "./Categories";

const Records = ({
  showCreateRecord,
  showCategories,
  setShowCategories,
  selectedCategory,
  setSelectedCategory,
}: {
  showCreateRecord: any;
  showCategories: any;
  setShowCategories: any;
  selectedCategory: any;
  setSelectedCategory: any;
}) => {

  return (
    <View>
      {showCreateRecord && !showCategories && (
        <>
          <CircularButton
            title="X"
            onPress={() => alert("Close Pressed!")}
            backgroundColor="red"
            position={{ left: 20 }}
          />
          <CircularButton
            title="✔"
            onPress={() => alert("Tick Pressed!")}
            backgroundColor="green"
            position={{ right: 20 }}
          />
          <View>
            <>
              <Input />
              <Button
                title={` ${
                  selectedCategory
                    ? ` ${selectedCategory.name}`
                    : "Select Category"
                }`}
                
                onPress={() => setShowCategories(true)}
              ></Button>
            </>
          </View>
        </>
      )}
      {showCategories &&  (
        <Categories
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          setShowCategories={setShowCategories}
        />
      )}
    </View>
  );
};

export default Records;
