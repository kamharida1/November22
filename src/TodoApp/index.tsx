import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useReducer, useState } from 'react'
import Colors from '../Ecom/utils/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { v4 as uuidv4 } from 'uuid'
import AnimatedCheckbox from "react-native-checkbox-reanimated";
import Chip from './components/Chip';

import "react-native-get-random-values";
import IconButton from './components/IconButton';

const initialTodos = [
  {
    id: uuidv4(),
    task: "Learn React",
    complete: true,
  },
  {
    id: uuidv4(),
    task: "Learn Firebase",
    complete: true,
  },
  {
    id: uuidv4(),
    task: "Learn GraphQL",
    complete: false,
  },
];

const filterReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_ALL':
      return 'ALL';
    case 'SHOW_COMPLETE':
      return 'COMPLETE';
    case 'SHOW_INCOMPLETE':
      return 'INCOMPLETE';
    default:
      throw new Error();
  }
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'DO_TODO': 
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, complete: true }
        } else {
          return todo
        }
      })
    case 'UNDO_TODO':
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, complete: false }
        } else {
          return todo
        }
      });
    case 'ADD_TODO':
      return state.concat({
        task: action.task,
        id: action.id,
        complete: false,
      });
    case 'DELETE_TODO':
      return state.filter(todo=> todo.id !== action.id)
    default:
      throw new Error();
  }
}

const TodoApp = () => {
  //const [todos, setTodos] = useState(initialTodos);
  const [task, setTask] = useState(''); //React controlled Input
  const [filter, dispatchFilter] = useReducer(filterReducer, 'ALL');
  const [todos, dispatchTodos] = useReducer(todoReducer, initialTodos)

  const filteredTodos = todos.filter(todo => {
    if (filter === 'ALL') {
      return true;
    }
    if (filter === 'COMPLETE' && todo.complete) {
      return true;
    }
    if (filter === 'INCOMPLETE' && !todo.complete) {
      return true;
    }
    return false;
  })

  const handleShowAll = () => {
    dispatchFilter({ type: 'SHOW_ALL'})
  }
  const handleShowComplete = () => {
    dispatchFilter({ type: 'SHOW_COMPLETE' });
  }
  const handleShowIncomplete = () => {
    dispatchFilter({ type: 'SHOW_INCOMPLETE'})
  }

  const handleDeleteTodo = (todo) => {
    dispatchTodos({
      type: 'DELETE_TODO',
      id: todo.id
    })
  }

  const handleSubmit = () => {
    if (task) { 
      // setTodos(
      //   todos.concat({
      //     id: uuidv4(),
      //     task,
      //     complete: false,
      //   })
      // );
      dispatchTodos({ type: 'ADD_TODO', task, id: uuidv4()})
    }
    setTask('');
  }

  const handleCheckboxPress = todo => {
    // setTodos(
    //   todos.map(todo => {
    //     if (todo.id === id) {
    //       return {...todo, complete: !todo.complete}
    //     } else {
    //       return todo;
    //     }
    //   })
    // )
    dispatchTodos({
      type: todo.complete ? 'UNDO_TODO' : 'DO_TODO',
      id: todo.id
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.text}>Todo App</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setTask}
            value={task}
            placeholder="Add todo ..."
            placeholderTextColor={"grey"}
          />
        </View>
        <Pressable onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable>
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Chip onPress={handleShowAll} text="Show All" />
          <Chip onPress={handleShowComplete} text="Show Complete" />
          <Chip onPress={handleShowIncomplete} text="Show Incomplete" />
        </View>
        <View style={styles.listContainer}>
          {filteredTodos.map((todo) => (
            <View key={todo.id} style={styles.textContainer}>
              <Pressable
                onPress={() => handleCheckboxPress(todo)}
                style={styles.checkbox}
              >
                <AnimatedCheckbox
                  checked={todo.complete}
                  highlightColor="rgba(0,20,19, 0.7)"
                  checkmarkColor="#ffffff"
                  boxOutlineColor="rgba(0,0,0,0.8)"
                />
              </Pressable>
              <Text style={styles.todoText}>{todo.task}</Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <IconButton
                  icon="edit"
                  size={30}
                  color="rgb(0,0,0)"
                  iconStyle={{ marginRight: 20 }}
                  onPress={()=>{}}
                />
                <IconButton
                  icon="trash-2"
                  size={30}
                  color="rgb(130,0,0)"
                  iconStyle={{}}
                  onPress={()=>handleDeleteTodo(todo)}
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default TodoApp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15
  },
  button: {
    marginVertical: 15,
    //marginHorizontal: 15,
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.7)',
    borderRadius: 15,
    //width: 250,
    //alignSelf: 'center'
  },
  checkbox: {
    width: 34,
    height: 34
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    paddingVertical: 2
  },
  inputContainer: {
    backgroundColor: Colors.bgRoseWhite3,
    padding: 15, 
    //marginHorizontal: 15,
    borderRadius: 15
  },
  input: {
    height: 30,
    fontSize: 18
  },
  header: {
    padding: 15,
    alignItems: 'center',
    paddingTop: 25,
    backgroundColor: Colors.bgRoseWhite2,
    marginBottom: 15
  },
  text: {
    fontSize: 54,
    fontWeight: '200'
  },
  listContainer: {
    //marginHorizontal: 15,
    backgroundColor: Colors.bgRoseWhite1,
    borderRadius: 15, 
    padding: 15,
    paddingBottom: 20,
    marginTop: 15
  },
  textContainer: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignItems: 'center'
  },
  todoText: {
    fontSize: 18,
    opacity: 0.6,
    fontWeight: '400',
    paddingLeft: 10
  }
})