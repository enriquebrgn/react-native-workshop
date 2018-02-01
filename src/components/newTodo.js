import React, { Component } from "react";
import { View, StyleSheet, TextInput } from "react-native";

export default class NewTodo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      todo: null
    };
  }

  saveTodo = () => {
    this.props.saveTodo(this.state.todo);
    this.refs.input.clear();
  }

  render() {
    return (
      <View style={{ backgroundColor: 'teal' }}>
        <TextInput
          placeholder="Que hacer hoy..."
          style={styles.newTodo}
          onChangeText={(todo) => this.setState({ todo })}
          onSubmitEditing={this.saveTodo}
          ref='input'
        >
        </TextInput>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  newTodo: {
    backgroundColor: 'white',
    height: 50,
    padding: 12,
    borderColor: 'teal',
    margin: 12,
    borderRadius: 6
  },
});
