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
} from "@mantine/core";
import {
  IconCircle,
  IconCircleCheck,
  IconCircleMinus,
  IconPlus,
} from "@tabler/icons-react";
import React from "react";
import AddTodoForm from "../components/AddTodoForm";
import TodosList from "../components/TodosList";
import FilterTodos from "../components/FilterTodos";
import EditToDoForm from "../components/EditToDoForm";

class Home extends React.Component {
  state = {
    todos: [],
    isAddFormOpen: false,
    isEditFormOpen: false,
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
  toggleEditTodoForm = () => {
    this.setState((prevState) => {
      return { isEditFormOpen: !prevState.isEditFormOpen };
    });
  };

  handleTodoCardClick = () => {
    this.toggleEditTodoForm;
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
                fw={"normal"}
              >
                TO-DO APP
              </Title>
            </Header>
          }
        >
          <Center>
            <Button color="red" onClick={this.handleNewTodoClick}>
              <IconPlus size="1.125rem" /> New todo
            </Button>
          </Center>
          {this.state.isAddFormOpen ? (
            <AddTodoForm
              createNewTodo={this.createNewTodo}
              closeForm={this.toggleAddTodoForm}
            />
          ) : null}
          {this.state.isEditFormOpen ? <EditToDoForm /> : null}
          <TodosList todos={this.state.todos} handleDelete={this.deleteTodo} />
          <FilterTodos />
        </AppShell>
      </>
    );
  }
}

export default Home;
