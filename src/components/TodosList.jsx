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
} from "@tabler/icons-react";
import React from "react";

class TodosList extends React.Component {
  colorByPriority = (priority) => {
    if (priority === "High") {
      return "red.4";
    }
    if (priority === "Medium") {
      return "cyan.6";
    }
    if (priority === "Low") {
      return "blue.3";
    }
  };

  sortByPriority = (todos) => {
    const sortedTodos = todos.sort((a, b) => {
      const priorityOrder = {
        High: 1,
        Medium: 2,
        Low: 3,
      };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
    return sortedTodos;
  };

  render() {
    let todos = this.sortByPriority(this.props.todos);

    return (
      <>
        <Container py="xl" fluid mx="xl">
          <SimpleGrid mx="xl" cols={1} verticalSpacing="lg">
            {todos.length !== 0 ? (
              todos.map((todo) => (
                <Card
                  key={todo.id}
                  bg={this.colorByPriority(todo.priority)}
                  shadow="sm"
                  radius="md"
                  p="xl"
                  mx="xl"
                  withBorder
                >
                  <Group position="apart" mt="md" mb="xs">
                    <Text weight={500} size={"xl"}>
                      {todo.title}
                    </Text>
                    <Group position="right">
                      <Badge
                        color={this.colorByPriority(todo.priority)}
                        variant="light"
                      >
                        {todo.priority}
                      </Badge>
                      <ActionIcon
                        color="white"
                        onClick={() => this.props.handleDelete(todo.id)}
                      >
                        <IconCircleMinus size="1.125rem" />
                      </ActionIcon>
                      <ActionIcon color="white">
                        <IconEdit size="1.125rem" />
                      </ActionIcon>
                    </Group>
                  </Group>
                  <Text size="sm" weight={300}>
                    {todo.description}
                  </Text>
                  <Text size="sm" weight={300}>
                    Created at {todo.createdAt}
                  </Text>
                </Card>
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
