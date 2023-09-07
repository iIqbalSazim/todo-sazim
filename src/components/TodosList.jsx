import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Card,
  Center,
  Container,
  Group,
  List,
  SimpleGrid,
  Text,
  ThemeIcon,
} from "@mantine/core";
import {
  IconCircle,
  IconCircleCheck,
  IconCircleMinus,
  IconEdit,
  IconEditCircle,
} from "@tabler/icons-react";
import React from "react";

class TodosList extends React.Component {
  assignColorByPriority = (priority) => {
    if (priority === "High") {
      return "red.3";
    }
    if (priority === "Medium") {
      return "cyan.4";
    }
    if (priority === "Low") {
      return "blue.3";
    }
  };

  getActiveTodos = (todos) => {
    return todos.filter((todo) => !todo.isCompleted);
  };

  getCompletedTodos = (todos) => {
    return todos.filter((todo) => todo.isCompleted);
  };

  sortByPriority = (todos) => {
    return todos.sort((a, b) => {
      const priorityOrder = {
        High: 1,
        Medium: 2,
        Low: 3,
      };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  };

  sortByCompletedStatus = (todos) => {
    const active = this.getActiveTodos(todos);
    const completed = this.getCompletedTodos(todos);
    const sortedByPriority = this.sortByPriority(active);
    return [...sortedByPriority, ...completed];
  };

  displayTodosByFilterClick = (todos) => {
    if (this.props.filter === "active") {
      return this.sortByPriority(this.getActiveTodos(todos));
    }
    if (this.props.filter === "completed") {
      return this.getCompletedTodos(todos);
    }
    return this.sortByCompletedStatus(todos);
  };

  render() {
    let todos = this.displayTodosByFilterClick(this.props.todos);

    return (
      <>
        <Container py="xl" fluid mx="xl">
          <SimpleGrid mx="xl" cols={1} verticalSpacing="lg">
            {todos.length !== 0 ? (
              todos.map((todo) => (
                <Box key={todo.id}>
                  <Card
                    bg={
                      todo.isCompleted
                        ? "gray.2"
                        : this.assignColorByPriority(todo.priority)
                    }
                    shadow={todo.isCompleted ? "" : "md"}
                    radius={todo.isCompleted ? "" : "md"}
                    px="xl"
                    py="xs"
                    mx="xl"
                    withBorder
                  >
                    <Group position="apart">
                      <Text
                        weight={500}
                        color={todo.isCompleted ? "gray.6" : ""}
                        size={"30px"}
                        td={todo.isCompleted ? "line-through" : ""}
                      >
                        {todo.description}
                      </Text>

                      {todo.isCompleted ? (
                        <Group>
                          <ActionIcon
                            variant="filled"
                            bg={"cyan.4"}
                            onClick={() =>
                              this.props.handleToggleIsCompleted(todo.id)
                            }
                          >
                            <IconCircleCheck size="1.125rem" />
                          </ActionIcon>
                          <ActionIcon
                            variant="filled"
                            bg="red.4"
                            onClick={() => this.props.handleDelete(todo.id)}
                          >
                            <IconCircleMinus size="1.125rem" />
                          </ActionIcon>
                        </Group>
                      ) : (
                        <Group position="right">
                          <Badge
                            color={this.assignColorByPriority(todo.priority)}
                            variant="light"
                          >
                            {todo.priority}
                          </Badge>
                          <ActionIcon
                            variant="light"
                            onClick={() =>
                              this.props.handleToggleIsCompleted(todo.id)
                            }
                            bg="teal.1"
                          >
                            <IconCircleCheck size="1.125rem" />
                          </ActionIcon>
                          <ActionIcon
                            variant="light"
                            onClick={() => this.props.openEditForm(todo)}
                            bg="white"
                          >
                            <IconEditCircle size="1.125rem" />
                          </ActionIcon>
                          <ActionIcon
                            variant="light"
                            bg="red.1"
                            onClick={() => this.props.handleDelete(todo.id)}
                          >
                            <IconCircleMinus size="1.125rem" />
                          </ActionIcon>
                        </Group>
                      )}
                    </Group>
                    <Text size="xs" weight={300}>
                      Created at {todo.createdAt}
                    </Text>
                  </Card>
                </Box>
              ))
            ) : (
              <Center>
                <Text size={"xl"} my={"xl"}>
                  You have no todos
                </Text>
              </Center>
            )}
          </SimpleGrid>
        </Container>
      </>
    );
  }
}

export default TodosList;
