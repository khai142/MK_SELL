import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, AsyncStorage, ImageBackground } from 'react-native';
import ScanImg from '../icon/scan.png';
import UpdateImg from '../icon/update.png';
import BackgroundImg from '../img/bg.jpg';
import Import_ExportImg from '../icon/import_export.png';

// const DATA = [
// { 
//   id: 192546264264,
//   barCode: '640509040147',
//   itemName: 'First Item',
//   price: 12000,
// },
// {
//   id: 19254626452,
//   barCode: '5901234123457',
//   itemName: 'Second Item',
//   price: 200000
// },
// {
//   id: 192546264254,
//   barCode: '5012345678900',
//   itemName: 'Third Item',
//   price: 20000
// },
// {
//   id: 192546264154,
//   barCode: '725272730706',
//   itemName: 'Fourth Item',
//   price: 40000
// },
// {
//   id: 192546264789596,
//   barCode: '3033710076789',
//   itemName: 'Fifth Item',
//   price: 50000
// },

// ];
// AsyncStorage.setItem('DATA',JSON.stringify(DATA));

export default class HomeScreen extends React.Component{
  reset = async () => {
    try {
      await AsyncStorage.setItem('cart', '');
    } catch (e) {
      console.error('Failed reset')
    }
  }

  render(){
    const { navigation } = this.props;
    return (
      <ImageBackground source={BackgroundImg} style={styles.bgimg}>
        <View style={styles.container}>
            <TouchableOpacity style = {styles.btn} onPress={() => {this.reset(); navigation.navigate('AppScan')}}>
                <Image style = {{width: 64, height: 64}} source = {ScanImg} />
                <Text style = {{fontSize: 20, color: '#FC5B31', fontWeight: "bold"}}>Mua hàng</Text>
            </TouchableOpacity>

            <TouchableOpacity style = {styles.btn} onPress={() => navigation.navigate('ProductList')}>
                <Image style = {{width: 64, height: 64}} source = {UpdateImg} />
                <Text style = {{fontSize: 20, color: '#FC5B31', fontWeight: "bold"}}>Thêm/Cập nhật giá</Text>
            </TouchableOpacity>

            <TouchableOpacity style = {styles.btn} onPress={() => navigation.navigate('Import_Export')}>
                <Image style = {{width: 64, height: 64}} source = {Import_ExportImg} />
                <Text style = {{fontSize: 20, color: '#FC5B31', fontWeight: "bold"}}>Nhập/xuất dữ liệu</Text>
            </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  btn: {
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    margin: 10,
    padding: 20,
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
  bgimg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
});


