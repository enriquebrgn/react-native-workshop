import React from 'react';
import { StyleSheet, Text, ScrollView, AsyncStorage, View, TextInput } from 'react-native';
import { ListItem, List, CheckBox } from 'react-native-elements';
import Storage from 'react-native-storage';

import Header from './src/components/header';
import NewTodo from './src/components/newTodo';

const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true
});

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      loaded: false,
      todo: null
    };
  }

  componentWillMount() {
    // storage.clearMapForKey('user');
    this._fetch();
  }

  _fetch = () => {
    storage.getAllDataForKey('user').then(todos => {
      this.setState({
        todos: todos,
        loaded: true
      })
    });
  }

  saveTodo = (todo) => {
    const id = Date.now();
    storage.save({
      key: 'user',
      id,
      data: {
        todo,
        id: id,
        checked: false
      }
    });
    this._fetch();
  }

  updateTodo = (todo) => {
    console.log(todo.checked)
    storage.save({
      key: 'user',
      id: todo.id,
      data: {
        todo: todo.todo,
        id: todo.id,
        checked: !todo.checked
      }
    });
    this._fetch();
  }

  removeTodo = (id) => {
    storage.remove({
      key: 'user',
      id
    });
    this._fetch();
  }
  render() {
    return (
      <View style={styles.container}>
        <Header text="To-do" />
        <NewTodo saveTodo={(todo) => this.saveTodo(todo)} />
        <ScrollView style={styles.scrollview}>
          <List containerStyle={styles.listContainer} >
            {this.state.todos.map(todo => (
              <ListItem
                key={todo.id}
                title={todo.todo}
                titleStyle={[todo.checked && { textDecorationLine: 'line-through', color: 'gray' }]}
                containerStyle={styles.listItem}
                onPress={() => this.updateTodo(todo)}
                hideChevron
              />
            ))}
          </List>
        </ScrollView>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'tomato',
    justifyContent: 'center',
    flex: 1,
  },
  checkbox: {
    backgroundColor: 'white',
    width: '13%',
    borderWidth: 0,
  },
  listItem: {
    height: 70,
    justifyContent: 'center'
  },
  listContainer: {
    marginTop: 0,
    paddingTop: 0,
    paddingBottom: 0,
    borderTopWidth: 0,
    flexDirection: 'column-reverse'
  }
});
