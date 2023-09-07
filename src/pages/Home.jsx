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
  Navbar,
  Paper,
  Group,
  Container,
} from "@mantine/core";
import {
  IconCircle,
  IconCircleCheck,
  IconCircleMinus,
  IconEditCircle,
  IconPlus,
  IconTrash,
  IconTrashFilled,
  IconTrashX,
  IconTrashXFilled,
} from "@tabler/icons-react";
import React from "react";
import AddTodoForm from "../components/AddTodoForm";
import TodosList from "../components/TodosList";
import FilterTodos from "../components/FilterTodos";
import EditToDoForm from "../components/EditTodoForm";

class Home extends React.Component {
  state = {
    todos: JSON.parse(localStorage.getItem("todos")) || [],
    isAddFormOpen: false,
    isEditFormOpen: false,
    toBeEdited: {},
    filter: "",
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
    const index = this.state.todos.findIndex((todo) => todo.id === edited.id);
    const updatedTodos = this.state.todos;
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
          <Group position="apart" p={"lg"}>
            <Button
              color="indigo"
              leftIcon={<IconPlus size="1.125rem" />}
              onClick={this.handleNewTodoClick}
            >
              <Text>Add todo</Text>
            </Button>
            <Button
              leftIcon={<IconTrashFilled size="1.125rem" />}
              color="red"
              onClick={this.clearAllCompletedTasks}
            >
              <Text>Remove Completed Tasks</Text>
            </Button>
          </Group>

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
            handleToggleIsCompleted={this.toggleIsCompleted}
            filter={this.state.filter}
          />
        </AppShell>
      </>
    );
  }
}

export default Home;
