
<template>
  <div id="app">
    <header class="page-header"></header>
    <section class="wrapper">
      <form class="new-todo-form">
        <label class="new-todo-label">
          New Todo:
          <input v-model="newTodo" type="text" class="new-todo-input" />
        </label>
        <button type="submit" @click.prevent="addTodo()" class="new-todo-button">Add</button>
      </form>
      <ul class="todo-list">
        <li v-for="todo in listDatas" :key="todo.id" class="todo-item">
          <label class="todo-item-label">
            <input
              type="checkbox"
              v-model="todo.completed"
              @change="updateTodo(todo)"
              class="todo-item__checkbox"
            />
            {{todo.text}}
          </label>

          <div v-if="currentlyEditing !== todo.id">
            <button class="todo-button" @click="editTodo(todo)">
              <img src="../assets/pencil.svg" alt="edit button" />
            </button>
            <button @click="deleteTodo(todo)" class="todo-button">
              <img src="../assets/trash.svg" alt="Delete todo" />
            </button>
          </div>

          <form v-else class="edit-todo-form">
            <label class="edit-todo-">
              Edit:
              <input type="text" v-model="todoEditText" class="edit-todo-input" />
            </label>
            <button class="edit-todo-button" type="submit" @click.prevent="updateTodoText()">save</button>
          </form>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { todosCollection } from "../firebase";
export default {
  name: "app",

  data() {
    return {
      newTodo: "",
      listDatas: [],
      currentlyEditing: null,
      todoEditText: ""
    };
  },
  firestore() {
    return {
      listDatas: todosCollection.orderBy("createdAt", "desc")
    };
  },
  methods: {
    addTodo() {
      todosCollection
        .add({
          text: this.newTodo,
          completed: false,
          id: this.listDatas.length,
          createdAt: new Date()
        })
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
      this.newTodo = "";
    },
    updateTodo(todo) {
      todosCollection
        .doc(todo.id)
        .update({ ...todo })
        .then(function(docRef) {
          console.log("Updated document with ID: ", todo.id);
        })
        .catch(function(error) {
          console.error("Error updating document: ", error);
        });
    },
    editTodo(todo) {
      this.currentlyEditing = todo.id;
    },
    updateTodoText() {
      todosCollection
        .doc(this.currentlyEditing)
        .update({ text: this.todoEditText })
        .then(docRef => {
          this.currentlyEditing = null;
          this.todoEditText = "";
        })
        .catch(function(error) {
          console.log("error", error);
        });
    },
    deleteTodo(todo) {
      todosCollection.doc(todo.id).delete();
    }
  }
};
</script>
<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
a {
  color: #42b983;
}
button {
  cursor: pointer;
}
.page-header {
  padding: 5rem 0;
  width: 100%;
  background: #ff33ae;
}
.wrapper {
  max-width: 500px;
  margin: 0 auto;
  padding: 0 1rem;
}
.new-todo-form {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 3px;
  border: 1px solid #fafafa;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.15);
  margin-top: -3rem;
  background: white;
}
.new-todo-label {
  display: flex;
  flex-direction: column;
  width: 80%;
  justify-content: flex-start;
  text-align: left;
  font-weight: bold;
}
.new-todo-input {
  padding: 0.5rem;
  border-radius: 3px;
  border: 1px solid lightgrey;
  font-size: 1rem;
  margin-top: 0.5rem;
  font-weight: normal;
}
.new-todo-button {
  font-size: 1rem;
  padding: 0.5rem 0.7rem;
  border-radius: 3px;
  color: white;
  font-weight: bold;
  background: #ff33ae;
  flex: 1;
  margin-left: 1rem;
  border: 1px solid #ff33ae;
}
.edit-todo-form {
  width: 100%;
  justify-content: space-between;
  display: flex;
  padding: 1rem;
}
.edit-todo-label {
  flex: 1;
  text-align: left;
  display: flex;
  align-items: center;
}
.edit-todo-input {
  padding: 0.5rem;
  border-radius: 3px;
  border: 1px solid lightgrey;
  font-size: 1rem;
  font-weight: normal;
  flex: 1;
  margin-left: 1rem;
}
.edit-todo-button {
  font-size: 1rem;
  padding: 0.5rem 0.7rem;
  border-radius: 3px;
  color: #ff33ae;
  font-weight: bold;
  margin-left: 1rem;
  border: 1px solid #ff33ae;
}
.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid lightgrey;
  border-left: 1px solid lightgrey;
  border-right: 1px solid lightgrey;
  &:first-of-type {
    border-radius: 3px 3px 0 0;
  }
  &:last-of-type {
    border-bottom: 1px solid lightgrey;
    border-radius: 0 0 3px 3px;
  }
}
.todo-item-label {
  cursor: pointer;
  padding: 1rem;
}
.todo-item__checkbox {
  margin-right: 1rem;
}
.todo-list {
  max-width: 100%;
  margin: 2rem auto;
}
.todo-button {
  background: transparent;
  border: 0;
  padding: 0.5rem;
  width: 40px;
  height: 40px;
  border-radius: 3px;
  cursor: pointer;
}
</style>
