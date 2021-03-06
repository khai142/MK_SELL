import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, ImageBackground, FlatList, AsyncStorage, TextInput, Alert, SafeAreaView, ScrollView } from 'react-native';
import BackgroundImg from '../img/bg.jpg';
import SearchIcon from '../icon/search-icon.png';
import NumberFormat from 'react-number-format';
import { showMessage } from "react-native-flash-message";
import { MaterialIcons } from '@expo/vector-icons';

export default class ProductList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      DATA: [],
      searchKey: "",
    };
  }

  pressSearch = () => {
    AsyncStorage.getItem('DATA').then((theDATA)=>{
      let data = JSON.parse(theDATA);
      let filterDATA = data.filter(item => (item.barCode.includes(this.state.searchKey) || item.itemName.toLowerCase().includes(this.state.searchKey.toLowerCase())));
      this.setState({DATA:filterDATA});
    })
    .catch((err)=>{
      console.log(err);
    });
  }

  pressDelete = (item) => {
    Alert.alert(
      "Xác nhận xoá!",
      `Xoá ${item.itemName} ra khỏi danh sách?`,
      [
        { text: "Xoá", onPress: () => {
          let updateDATA = this.state.DATA.filter((thisItem) => thisItem.id != item.id);
          AsyncStorage.setItem('DATA',JSON.stringify(updateDATA));
          showMessage({
            message: "Đã xoá một sản phẩm!",
            type: "danger",
          });
          this.props.navigation.replace("ProductList");
        } },
        { text: "Không", onPress: () => {}}
      ],
      { cancelable: false }
    );
  }

  headerNoBarcode= () => {
    if (this.state.DATA.filter(item=>item.barCode == "").length > 0){
      return(
        <View style={styles.headerStyle}>
          <Text style={styles.titleStyle}>Sản phẩm không có mã vạch</Text>
        </View>
      );
    }
    else{
      return(
        <View></View>
      );
    }
  }

  headerBarcode= () => {
    if (this.state.DATA.filter(item=>item.barCode != "").length > 0){
      return(
        <View style={styles.headerStyle}>
          <Text style={styles.titleStyle}>Sản phẩm có mã vạch</Text>
        </View>
      );
    }
    else{
      return(
        <View></View>
      );
    }    
  }

  componentDidMount(){
    AsyncStorage.getItem('DATA').then((theDATA)=>{
      if (theDATA){
        let data = JSON.parse(theDATA);
        this.setState({DATA:data});
      }
    })
    .catch((err)=>{
      console.log(err);
    });
  }

  render(){
    const { navigation } = this.props;
    return (
      <ImageBackground source={BackgroundImg} style={styles.bgimg}>
        <View style={styles.container}>
          <View style={styles.top}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <TextInput
                style={styles.inputSearch}
                onChangeText={text => this.setState({searchKey: text})}
                defaultValue={this.state.searchKey}
              />
              <TouchableOpacity style={styles.searchBtn} onPress={()=>{this.pressSearch()}}>
                <Image style = {{width: 32, height: 32,}} source = {SearchIcon} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={{backgroundColor: "#2196F3", borderRadius: 5, justifyContent: "center", alignItems: "center"}} onPress={()=>{navigation.navigate("ScanToUpdate")}}>
              <MaterialIcons name="add" size={20} color="white"/>
              <Text style={{color: "white", fontSize: 12, paddingHorizontal: 5,}}>THÊM</Text>
            </TouchableOpacity>
          </View>
          <SafeAreaView style={{flex:1, margin: 10}}>
            <ScrollView>
              <FlatList style={{marginVertical: 5}}
                data={this.state.DATA.filter(item=>item.barCode == "")}
                ListHeaderComponent={this.headerNoBarcode}
                stickyHeaderIndices={[0]}
                renderItem={({item, index}) => (
                  <View style={styles.item}>
                    <TouchableOpacity style={{flex: 1}} onPress={()=>{navigation.navigate("EditItem",{ item, index })}}>
                      <Text style={styles.title}>{item.itemName}</Text>
                      <Text style={styles.sub}>Mã vạch: {item.barCode}</Text>
                      <NumberFormat
                        value={item.price}
                        displayType={'text'}
                        thousandSeparator='.'
                        decimalSeparator=","
                        suffix={' đ'}
                        renderText={formattedValue => <Text style ={styles.sub}>Đơn giá: {formattedValue}</Text>}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.delete} onPress={()=>{this.pressDelete(item)}}>
                      <Text style={{ padding: 10, fontSize: 15, color: "white"}}>Xoá</Text>
                    </TouchableOpacity>
                  </View>
                )}
                keyExtractor={item => `${item.id}`}
              />
              <FlatList style={{marginVertical: 5}}
                data={this.state.DATA.filter(item=>item.barCode != "")}
                ListHeaderComponent={this.headerBarcode}
                stickyHeaderIndices={[0]}
                renderItem={({item, index}) => (
                  <View style={styles.item}>
                    <TouchableOpacity style={{flex: 1}} onPress={()=>{navigation.navigate("EditItem",{ item, index })}}>
                      <Text style={styles.title}>{item.itemName}</Text>
                      <Text style={styles.sub}>Mã vạch: {item.barCode}</Text>
                      <NumberFormat
                        value={item.price}
                        displayType={'text'}
                        thousandSeparator='.'
                        decimalSeparator=","
                        suffix={' đ'}
                        renderText={formattedValue => <Text style ={styles.sub}>Đơn giá: {formattedValue}</Text>}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.delete} onPress={()=>{this.pressDelete(item)}}>
                      <Text style={{ padding: 10, fontSize: 15, color: "white"}}>Xoá</Text>
                    </TouchableOpacity>
                  </View>
                )}
                keyExtractor={item => `${item.id}`}
              />
            </ScrollView>
          </SafeAreaView>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flexDirection: "row",
    marginTop: 8,
    marginHorizontal: 8,
  },
  inputSearch: {
    height: 44,
    width: "80%",
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#f3ffc6',
    borderRadius: 5,
    color: "#1c5253",
    fontSize: 17,
    padding: 2,
  },
  searchBtn: {
    justifyContent: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 20,
    padding: 5,
    marginHorizontal: 2,
  },
  bgimg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 8,
    borderRadius: 4,
    shadowColor: "#D3D3CF",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  title: {
    fontSize: 20,
  },
  sub: {
    fontSize: 14,
  },
  delete: {
    backgroundColor: '#ee4d2d',
    borderRadius: 5,
    justifyContent: 'center',
    marginVertical: 8,
  },
  headerStyle: {
    flex: 1,
    height: 40,
    width: '100%',
    backgroundColor: 'brown',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    color: 'white',
    fontWeight: "bold",
    fontSize: 16
  }
});


