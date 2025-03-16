import { useState } from "react";
import { View } from "react-native";
import Records from "./Records";
import CreateRecordButton from "./createRecordButton";
import LoginScreen from "./login"; 

export default function Index() {
  const [showCreateRecord, setShowCreateRecord] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state variable to track login status

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* {!isLoggedIn && */}
       <LoginScreen setIsLoggedIn={setIsLoggedIn} />
       {/* }  */}
      {/* {isLoggedIn && (
        <>
          {showCreateRecord && (
            <Records
              showCreateRecord={showCreateRecord}
              showCategories={showCategories}
              setShowCategories={setShowCategories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          )}
          {!showCreateRecord && (
            <CreateRecordButton
              setShowCreateRecord={setShowCreateRecord}
              showCreateRecord={showCreateRecord}
            />
          )}
        </>
      )} */}
    </View>
  );
}


// import { useState } from "react";
// import { View } from "react-native";
// import Records from "./Records";
// import CreateRecordButton from "./createRecordButton";

// export default function Index() {
//   const [showCreateRecord, setShowCreateRecord] = useState(false);
//   const [showCategories, setShowCategories] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState(null);
  
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       {showCreateRecord && (
//         <Records
//           showCreateRecord={showCreateRecord}
//           showCategories={showCategories}
//           setShowCategories={setShowCategories}
//           selectedCategory={selectedCategory}
//           setSelectedCategory={setSelectedCategory}
//         />
//       )}
//      {!showCreateRecord && <CreateRecordButton
//         setShowCreateRecord={setShowCreateRecord}
//         showCreateRecord={showCreateRecord}
//       />}
//     </View>
//   );
// } 
