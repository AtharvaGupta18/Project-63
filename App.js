import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';

export default class App extends React.Component{
  constructor() {
    super();
    this.state = {
      text: '',
      word: '',
      definition: '',
      type: '',
    }
  }

  getWord = (word)=>{
    var searchKeyword = word.toLowerCase();
    var url = "https://rupinwhitehatjr.github.io/dictionary/"+searchKeyword+".json";

    return fetch(url)
    .then((data)=>{
      if(data.status === 200){
        return data.json();
      }else{
        return null;
      }
    })
    .then((response)=>{
      var responseObject = response;
      if(responseObject){
        var wordData = responseObject.definitions[0]
        var definition = wordData.description;
        var type = wordData.wordtype;

        this.setState({
          word: this.state.text,
          definition: definition,
          type: type
        })
      }
    })
  }

  render() {
    return (
      <View>
        <Header
          backgroundColor={'purple'}
          centerComponent={{
            text: 'Pocket Dictionary',
            style: { color: '#fff', fontSize: 20, marginTop: 10, marginBottom: 10 },
          }}
        />
        <TextInput
          style={styles.inputBox}
          onChangeText={text => {
            this.setState({ 
              text: text,
            });
          }}
          value={this.state.text}
        />
        <TouchableOpacity style={styles.button}
        onPress = {()=>{
          this.getWord(this.state.text)
        }}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
        <Text style = {styles.displayText}>{'Word:  '+this.state.word.toLowerCase()}</Text>
        <Text style = {styles.displayText}>{'Type:  '+this.state.type.toLowerCase()}</Text>
        <Text style = {styles.displayText}>{'Definition:  '+this.state.definition.toLowerCase()}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputBox: {
    marginTop: 50,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none',
  },
    button: {
    width: 125,
    height: 50,
    backgroundColor: 'green',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 25,
    alignItems: 'center',
  },
    buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    alignText: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },  
  displayText: {
    textAlign: 'left',
    fontSize: 30,
    marginTop: 20,
    color: 'orange',
    fontWeight: 'bold',
  },
});
