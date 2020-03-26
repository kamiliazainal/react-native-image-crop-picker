import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions, Image} from 'react-native';
import {ActionSheet, Root} from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';

const width = Dimensions.get('window').width;
export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      fileList: []
    }
  }

  onSelectedImage = (image) => {
    let newDataImg = this.state.fileList;
    const source = {uri: image.path};
    let item = {
      id: Date.now(),
      url: source,
      content: image.data
    };
    newDataImg.push(item);
    this.setState({fileList: newDataImg})
  };

  takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      //this.onSelectedImage(image);
      console.log(image);
    });
  };

  choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      this.onSelectedImage(image);
      console.log(image);
    });
  };

  onClickAddImage = () => {
    const BUTTONS = ['Take Photo', 'Choose Photo Library', 'Cancel'];
    ActionSheet.show(
      {options: BUTTONS, cancelButtonIndex: 2, title: 'Select a Photo'},
      buttonIndex => {
        switch (buttonIndex) {
          case 0:
            this.takePhotoFromCamera();
            break;
          case 1:
            this.choosePhotoFromLibrary();
            break;
          default:
            break
        }
      }
    )
  };

  renderItem = ({item, index}) => {
    return(
      <View>
        <Image source={item.url} style={styles.itemImage}/>
      </View>
    )
  };

  render() {
    return (
      <Root>
        <View style={styles.content}>
        <Text>Add image</Text>
        <FlatList
          data={this.state.fileList}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
          extraData={this.state}
          />
          <TouchableOpacity onPress={this.onClickAddImage} style={styles.btnPressStyle}>
            <Text style={styles.txtStyle}>Press Add Image</Text>
          </TouchableOpacity>
      </View>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 30,
    paddingLeft: 30,
    paddingRight: 30
  },
  btnPressStyle:{
    backgroundColor: '#0080ff',
    height: 50,
    width: width - 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  txtStyle: {
    color: '#ffffff'
  },
  itemImage: {
    backgroundColor: '#2F455C',
    height: 150,
    width: width -60,
    borderRadius: 8,
    resizeMode: 'contain'
  }
});