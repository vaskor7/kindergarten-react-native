// @flow
import React  from "react"
import { StyleSheet, Text, View, FlatList, Dimensions  } from "react-native"

// theme
import { Metrics } from "../themes"

// https://snack.expo.io/@spencercarli/react-native-flatlist-grid

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  item: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: 20, // approximate a square
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: 'black',
  },
});

const data = [
  { key: 'A' }, { key: 'B' }, { key: 'C' }, { key: 'D' }, 
  // { key: 'L' },
];



const numColumns = 2;



export default class DescTable extends React.PureComponent<Props> {
  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={styles.item} />;
    }
    return (
      <View
        style={styles.item}
      >
        <Text style={styles.itemText}>{item.key}</Text>
      </View>
    );
  };

  render() {  
    return (
      <View style={styles.container}>
      <FlatList
        data={data}
        style={styles.container}
        renderItem={this.renderItem}
        numColumns={numColumns}
      />
      </View>
     
    )
  }

}

