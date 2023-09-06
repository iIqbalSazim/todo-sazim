import {
  Box,
  List,
  Text,
  ThemeIcon,
  AppShell,
  Header,
  Tabs,
  Title,
  Center,
  Button,
  ActionIcon,
} from "@mantine/core";
import {
  IconCircle,
  IconCircleCheck,
  IconCircleMinus,
  IconEditCircle,
  IconPlus,
} from "@tabler/icons-react";
import React from "react";
import AddTodoForm from "../components/AddTodoForm";
import TodosList from "../components/TodosList";
import FilterTodos from "../components/FilterTodos";
import EditToDoForm from "../components/EditTodoForm";

class Home extends React.Component {
  state = {
    todos: [],
    isAddFormOpen: false,
    isEditFormOpen: false,
    toBeEdited: {},
  };

  // add functionality
  toggleAddTodoForm = () => {
    this.setState((prevState) => {
      return { isAddFormOpen: !prevState.isAddFormOpen };
    });
  };

  handleNewTodoClick = () => {
    this.toggleAddTodoForm();
  };

  createNewTodo = (todo) => {
    this.setState((prevState) => {
      return { todos: [...prevState.todos, todo] };
    });
  };

  // edit functionality
  setOpenEditForm = () => {
    this.setState((prevState) => {
      return { isEditFormOpen: true };
    });
  };

  setCloseEditForm = () => {
    this.setState((prevState) => {
      return { isEditFormOpen: false };
    });
  };

  handleEditTodoOpen = (todo) => {
    this.setOpenEditForm();
    this.setState((prevState) => {
      return { toBeEdited: todo };
    });
  };

  handleEditTodoClose = () => {
    this.setCloseEditForm();
  };

  editTodo = (edited) => {
    const updatedTodos = this.state.todos;
    const index = this.state.todos.findIndex((todo) => todo.id === edited.id);
    updatedTodos[index] = edited;

    this.setState({ todos: updatedTodos });
  };

  // delete functionality
  deleteTodo = (id) => {
    let todos = this.state.todos;
    let updatedList = todos.filter((todo) => todo.id !== id);
    this.setState({ todos: updatedList });
  };

  render() {
    return (
      <>
        <AppShell
          padding="xl"
          header={
            <Header p={"xl"} height={"80"}>
              <Title
                order={1}
                ta={"center"}
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
          <Center>
            <Button color="red" onClick={this.handleNewTodoClick}>
              <IconPlus size="1.125rem" />
              <Text>Add todo</Text>
            </Button>
          </Center>
          {this.state.isAddFormOpen ? (
            <AddTodoForm
              createNewTodo={this.createNewTodo}
              closeForm={this.toggleAddTodoForm}
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
          />

          <FilterTodos />
        </AppShell>
      </>
    );
  }
}

export default Home;
