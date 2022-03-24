import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity,RefreshControl} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import _ from "lodash"



export default function table_component () {
  const [ columns, setColumns ] = useState([
    "Nick",
    "Score",
    "Total",
    "Type",
    "Date"

  ])
  const [ direction, setDirection ] = useState(null)
  const [ selectedColumn, setSelectedColumn ] = useState(null)
  const [ scores, setScores ] = useState([]);
  useEffect(() => {
    fetch('https://tgryl.pl/quiz/results')
      .then((response) => response.json())
      .then((json) => setScores(json))
      
  });
  //   {
  //     Nick: "Charlie",
  //     Score: "18",
  //     Total: '20',
  //     Type: "test1",
  //     Date: '2021-12-14'
  //     },
    
  //   {
  //     Nick: "Charlie",
  //     Score: "18",
  //     Total: '20',
  //     Type: "test1",
  //     Date: '2021-12-14'
  //     },

  //   {
  //     Nick: "Charlie",
  //     Score: "18",
  //     Total: '20',
  //     Type: "test1",
  //     Date: '2021-12-14'
  //     },
  //   {
  //     Nick: "Charlie",
  //     Score: "18",
  //     Total: '20',
  //     Type: "test1",
  //     Date: '2021-12-14'
  //     },
  //     {
  //     Nick: "Charlie",
  //     Score: "18",
  //     Total: '20',
  //     Type: "test1",
  //     Date: '2021-12-14'
  //     },
  //     {
  //     Nick: "Charlie",
  //     Score: "18",
  //     Total: '20',
  //     Type: "test1",
  //     Date: '2021-12-14'
  //     },
    
  // ])

  const sortTable = (column) => {
    const newDirection = direction === "desc" ? "asc" : "desc" 
    const sortedData = _.orderBy(scores, [column],[newDirection])
    setSelectedColumn(column)
    setDirection(newDirection)
    setScores(sortedData)
  }
  const tableHeader = () => (
    <View style={styles.tableHeader}>
      {
        columns.map((column, index) => {
          {
            return (
              <TouchableOpacity 
                key={index}
                style={styles.columnHeader} 
                onPress={()=> sortTable(column)}>
                <Text style={styles.columnHeaderTxt}>{column + " "} 
                  { selectedColumn === column && <MaterialCommunityIcons 
                      name={direction === "desc" ? "arrow-down-drop-circle" : "arrow-up-drop-circle"} 
                    />
                  }
                </Text>
              </TouchableOpacity>
            )
          }
        })
      }
    </View>
  )
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  if(Object.keys(scores).length == 0){
    return(<View style={styles.container}></View>);
  }else{
    return (
      <View style={styles.container}>
        <FlatList   refreshControl={<RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh} />}

          data={scores}
          style={{width:"100%"}}
          keyExtractor={(item, index) => index+""}
          ListHeaderComponent={tableHeader}
          stickyHeaderIndices={[0]}
          
          renderItem={({item, index})=> {
            return (
              <View style={{...styles.tableRow, backgroundColor: index % 2 == 1 ? "#eb7a34" : "white"}}>
                <Text style={{...styles.columnRowTxt, fontWeight:"bold"}}>{item.nick}</Text>
                <Text style={styles.columnRowTxt}>{item.score}</Text>
                <Text style={styles.columnRowTxt}>{item.total}</Text>
                <Text style={styles.columnRowTxt}>{item.type}</Text>
                <Text style={styles.columnRowTxt}>{item.createdOn}</Text>

              </View>
            )
          }}
        />
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#77767C',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:80
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#eb7a34",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    height: 50
  },
  tableRow: {
    flexDirection: "row",
    height: 40,
    alignItems: "center",
  },
  columnHeader: {
    width: "20%",
    justifyContent: "space-evenly",
    alignItems:"center"
  },
  columnHeaderTxt: {
   
    fontWeight: "bold",
    
  },
  columnRowTxt: {
    width:"20%",
    textAlign:"center",
    
  }
});