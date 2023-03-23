import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";

const TEMP_DATA = Array.from({ length: 50 }, (v, i) => i);

export default function App() {
  const [ref, setRef] = useState(null);
  const [choosenItem, setChoosenItem] = useState(0);

  const isChoosenItem = (index) => {
    if(index === choosenItem){
      return true;
    }
    return false;
  };

  const ItemRender = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => {
        setChoosenItem(index);
      }}
      style={[isChoosenItem(index) && {backgroundColor: 'pink'},{ padding: 12 }]}
    >
      <Text style={ styleSheet.itemText}> Element : {item} </Text>
    </TouchableOpacity>
  );

  const Divider = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "black",
        }}
      />
    );
  };

  const Header = () => {
    return (
      <View style={{ padding: 12, alignItems: "center" }}>
        <Text style={styleSheet.itemText}>List Header</Text>
      </View>
    );
  };

  const Footer = () => {
    return (
      <View style={{ padding: 12, alignItems: "center" }}>
        <Text style={styleSheet.itemText}>List Footer</Text>
      </View>
    );
  };

  const NoData = () => {
    return (
      <View>
        <Text> No data present!</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styleSheet.mainContainer}>
      <View style={styleSheet.buttonView}>
        <Button
          title="Scroll To Choosen Item"
          onPress={() => {
            ref.scrollToIndex({
              animated: true,
              index: choosenItem,
              viewPosition: 0,
            });
          }}
        />
      </View>

      <FlatList
        ListHeaderComponent={Header}
        ListFooterComponent={Footer}
        ListEmptyComponent={NoData}
        data={TEMP_DATA}
        ref={(ref) => {
          setRef(ref);
        }}
        renderItem={(itemData) => (
          <ItemRender index={itemData.index} item={itemData.item} />
        )}
        ItemSeparatorComponent={Divider}
        keyExtractor={(itemData) => itemData.toString()}
      />
    </SafeAreaView>
  );
}

const styleSheet = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },

  itemText: {
    fontSize: 25,
    color: "black",
  },

  buttonView: {
    height: 50,
    width: "100%",
    backgroundColor: "#2aff00",
    justifyContent: "center",
    alignItems: "center",
  },
});
