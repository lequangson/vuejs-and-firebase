
<template>
  <div id="app">
    <header class="page-header"></header>
    <section class="wrapper">
      <form class="new-todo-form">
        <label class="new-todo-label">
          New Todo:
          <input v-model="newTodo" type="text" class="new-todo-input"/>
        </label>
        <button type="submit" @click.prevent="addTodo()" class="new-todo-button">Add</button>
      </form>
      <ul class="todo-list">
        <li v-for="todo in todos" :key="todo.id" class="todo-item">
          <label class="todo-item-label">
            <input 
              type="checkbox" 
              v-model="todo.completed" 
              @change="updateTodo(todo)"
              class="todo-item__checkbox">
              {{todo.text}}
          </label>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { todosCollection } from './firebase';
export default {
  name: 'app',
  data () {
    return {
      newTodo: '',
      todos: []
    }
  },
  firestore() {
    return {
      todos: todosCollection.orderBy('createdAt', 'desc')
    }
  },
  methods: {
    addTodo() {
      todosCollection.add({
        text: this.newTodo,
        completed: false,
        id: this.todos.length,
        createdAt: new Date()
      })
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
      this.newTodo = '';
    },
    updateTodo(todo) {
      todosCollection.doc(todo.id).update({...todo})
      .then(function(docRef) {
        console.log("Updated document with ID: ", todo.id);
      })
      .catch(function(error) {
        console.error("Error updating document: ", error);
      });
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
