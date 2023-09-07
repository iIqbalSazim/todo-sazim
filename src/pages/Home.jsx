import {
  AppShell,
  Header,
  Title,
  ActionIcon,
  Navbar,
  Group,
  Menu,
} from "@mantine/core";
import { IconTrash, IconTrashFilled } from "@tabler/icons-react";
import React from "react";
import AddTodoForm from "../components/AddTodoForm";
import TodosList from "../components/TodosList";
import FilterTodos from "../components/FilterTodos";
import EditToDoForm from "../components/EditTodoForm";
import ActionButtons from "../components/ActionButtons";
import Trashcan from "../components/Trashcan";

class Home extends React.Component {
  state = {
    todos: JSON.parse(localStorage.getItem("todos")) || [],
    isAddFormOpen: false,
    isEditFormOpen: false,
    toBeEdited: {},
    filter: "",
    trash: JSON.parse(localStorage.getItem("trash")) || [],
  };

  findIndexWithId = (data, id) => {
    return data.findIndex((element) => element.id === id);
  };

  // filter functionality
  setFilter = (filter) => {
    this.setState((prevState) => {
      return { filter: filter };
    });
  };

  // isCompleted functionality
  toggleIsCompleted = (id) => {
    const updatedTodos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });

    this.setState({ todos: updatedTodos });
  };

  clearAllCompletedTasks = () => {
    let updatedList = this.state.todos.filter(
      (todo) => todo.isCompleted !== true
    );

    this.setState({ todos: updatedList });
  };

  // add functionality
  toggleAddForm = () => {
    this.setState((prevState) => {
      return { isAddFormOpen: !prevState.isAddFormOpen };
    });
  };

  addTodo = (todo) => {
    this.setState((prevState) => {
      return { todos: [...prevState.todos, todo] };
    });
  };

  // edit functionality
  openEditForm = () => {
    this.setState((prevState) => {
      return { isEditFormOpen: true };
    });
  };

  closeEditForm = () => {
    this.setState((prevState) => {
      return { isEditFormOpen: false };
    });
  };

  handleEditTodoOpen = (todo) => {
    this.openEditForm();
    this.setState((prevState) => {
      return { toBeEdited: todo }; // passed down props to change state
    });
  };

  handleEditTodoClose = () => {
    this.closeEditForm();
  };

  editTodo = (edited) => {
    const index = this.findIndexWithId(this.state.todos, edited.id);
    const updatedTodos = this.state.todos;
    updatedTodos[index] = edited;

    this.setState({ todos: updatedTodos });
  };

  // delete functionality
  deleteTodo = (id) => {
    let todos = this.state.todos;
    let removedTodo = todos.filter((todo) => todo.id === id)[0];
    this.addToTrash(removedTodo);
    let updatedList = todos.filter((todo) => todo.id !== id);
    this.setState({ todos: updatedList });
  };

  // trash functionality
  addToTrash = (removedTodo) => {
    this.setState((prevState) => {
      return { trash: [...prevState.trash, removedTodo] };
    });
  };

  emptyTrash = () => {
    this.setState({ trash: [] });
    localStorage.removeItem("trash");
  };

  retrieveFromTrash = () => {
    this.setState((prevState) => {
      return { todos: [...prevState.todos, ...this.state.trash] };
    });
    this.emptyTrash();
  };

  componentDidUpdate() {
    localStorage.setItem("trash", JSON.stringify(this.state.trash));
  }

  render() {
    return (
      <>
        <AppShell
          padding="xl"
          navbar={
            <Navbar width={{ base: 200 }} height={"full"} p="xl" bg={"gray.2"}>
              <Navbar.Section grow mt={"120%"}>
                <FilterTodos setFilter={this.setFilter} />
              </Navbar.Section>
            </Navbar>
          }
          header={
            <Header
              p={"xl"}
              height={"90"}
              sx={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}
            >
              <Title
                order={1}
                ta={"left"}
                h={"fit"}
                color="indigo.9"
                fw={"200"}
                tt="capitalize"
              >
                TO-DO APP
              </Title>
            </Header>
          }
        >
          <ActionButtons
            handleNewTodoClick={this.toggleAddForm}
            handleRemoveCompletedClick={this.clearAllCompletedTasks}
          />
          {this.state.isAddFormOpen ? (
            <AddTodoForm
              createNewTodo={this.addTodo}
              closeForm={this.toggleAddForm}
            />
          ) : null}
          {this.state.isEditFormOpen ? (
            <EditToDoForm
              closeModal={this.handleEditTodoClose}
              isOpen={this.state.isEditFormOpen}
              todo={this.state.toBeEdited}
              editTodo={this.editTodo}
            />
          ) : null}
          <TodosList
            todos={this.state.todos}
            handleDelete={this.deleteTodo}
            openEditForm={this.handleEditTodoOpen}
            handleToggleIsCompleted={this.toggleIsCompleted}
            filter={this.state.filter}
          />
          <Trashcan
            handleRetrieveTodosClick={this.retrieveFromTrash}
            handlePermanentlyDeleteTodosClick={this.emptyTrash}
            trash={this.state.trash}
          />
        </AppShell>
      </>
    );
  }
}

export default Home;
