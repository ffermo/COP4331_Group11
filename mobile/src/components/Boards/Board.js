import React, { Component } from 'react';
import { FlatList, StyleSheet, View, Text, TouchableOpacity, TextInput, Modal, TouchableHighlight, Button } from 'react-native';
import {ListItem, SearchBar, Overlay} from 'react-native-elements'
import { Entypo } from '@expo/vector-icons';
import { AsyncStorage } from 'react-native';
 

export default class BoardList extends Component {
  static navigationOption = ({ navigation }) => 
  {     
      return {
               id: navigation.getParam('id', null)     
             }
  }
  constructor(props) {
    super(props);
    this.state = {
        boards: [], 
        boardName: '',
        newboardindex: '',
        oldboardindex: '',
        isVisible: false,
        lists: [],
        cards: [],
        boardId: props.route.params.id


    };
    
  }

  componentDidMount() {
    this.fetchData();

    this.props.navigation.setOptions(
        {
            title: 'Lists',
            headerRight: () => (
              <TouchableOpacity
                style={{
                  marginRight: 20
                }}
                onPress={() => this.setIsVisible(true)}>
  
              <Entypo name="plus" size={34} color="white" />
                </TouchableOpacity>
            ),
            headerStyle: {
              backgroundColor: '#4b414a',
              
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              alignSelf: 'center'
            }
          }
  
      );
    
    // console.log(this.state.boardId);
  }

  setIsVisible = (bool) => {
    this.setState({'isVisible' : bool})
  }

  fetchData = async () => {

    // try 
    // {
    //   var value = await AsyncStorage.getItem("board");
    //   if (value !== null)
    //   {
    //     value = JSON.parse(value);
    //     // console.log(value.id);
    //   }
    // } 
    // catch (e) 
    // {
    // //   console.log("Something went wrong in fetching the boards data");
    // }


    // console.log("http://3.17.45.57/api/Board/" + value.id);
    const response = await fetch("http://3.17.45.57/api/Board/" + this.state.boardId , {method:'GET',headers:{'Content-Type': 'application/json'}});
    var res = JSON.parse(await response.text());
    // console.log(res);
    this.setState(
        {
            lists: res.listString,
            cards: res.cardString
        } );
    // console.log(this.state.boards);

  }

  deleteList = async (event,listId) => 
  {
    var js = '{"_id":"'+ listId + '"}';

    // console.log(js);
    try
    {
      // alert("here");
      const response = await fetch('http://3.17.45.57/api/DeleteList',{method:'DELETE',body:js,headers:{'Content-Type': 'application/json'}});
      // alert("added successfully");
      // this.setBoardName("");
      // this.setIsVisible(false);
      // this.componentDidMount();
      var res = JSON.parse(await response.text());
      console.log(res);
    }
    catch(e)
    {

    }
    this.componentDidMount();
  }

  

  render() {

    return (

        

        <View>

<View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.isVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>

            <View style={styles.modalView}>
              <TextInput
                style={styles.overlayInput}
                
                  // {console.log(this.state.boards)}
                onChangeText={(name) => this.setBoardName(name)}
                placeholder="Board Name"
                placeholderTextColor="rgba(255, 255, 255, 0.7)"

              />
              {/* {this.state.boards.map(board =>
                <Text>{board.boardName}</Text>) } */}
              <View style={styles.overlayButtonContainer}>

                <TouchableOpacity style={styles.overlayButton} onPress={() => this.setIsVisible(false)}>
                  <Text style={styles.overlayButtonText}>
                    Cancel
                  </Text>
                </TouchableOpacity>

                <View style={{ width: 20 }}></View>

                <TouchableOpacity style={styles.overlayButton} onPress={() => alert("adding List")}>
                  <Text style={styles.overlayButtonText}>
                    Add
                  </Text>
                </TouchableOpacity>

              </View>
            </View>
          </View>
        </Modal>

      </View>
            
                
                {this.state.lists.map(list =>
                <View>
                    <Text>
                        {list.listName}
                        {this.state.cards[list.index].map(card =>
                            
                                <Text>
                                    {card.cardName}
                                </Text>
                            
                            )}
                    </Text>
                    <Button
                    onPress = {(e) => this.deleteList(e,list._id)}
                    title="Delete"
                    />
                </View>)}
                
        </View>
    );

  }
}

 const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }, 
  overlayContainer: {
    // height: '80%',
    // width: '80%'
  },
  overlayInput: {
    height: 40,
    width: 250,
    borderWidth: 1.5, 
    borderRadius: 3,
    marginBottom: 20,
    borderColor: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#fff', 
    paddingHorizontal: 10
    
  },
  overlayButtonContainer: {
    flexDirection: 'row',
    backgroundColor: '#3498db', 
    justifyContent: 'space-between',
    alignItems: 'flex-end', 
    paddingHorizontal: 0
  }, 
  overlayButton: {
    justifyContent: 'center',
    borderWidth: 1.5,
    borderRadius: 7,
    borderColor: '#FFF',
    height: 40,
    width: 70,
    backgroundColor: '#2980b9',  
    paddingVertical: 15

  },
  overlayButtonText: {
    textAlign: 'center', 
    textAlignVertical: 'center',
    color: '#FFFFFF',
    fontWeight: '700'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    flexDirection: "column",
    justifyContent: 'flex-end',
    backgroundColor: "#3498db",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
})


