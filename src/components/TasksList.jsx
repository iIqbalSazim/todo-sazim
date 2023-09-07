import {
  ActionIcon,
  Badge,
  Box,
  Card,
  Center,
  Container,
  Group,
  ScrollArea,
  SimpleGrid,
  Text,
} from "@mantine/core";
import {
  IconCircleCheck,
  IconCircleMinus,
  IconEditCircle,
} from "@tabler/icons-react";
import React from "react";

class TasksList extends React.Component {
  assignColorByPriority = (priority) => {
    if (priority === "High") {
      return "cyan.4";
    }
    if (priority === "Medium") {
      return "teal.3";
    }
    return "blue.2";
  };

  getActiveTasks = (tasks) => {
    return tasks.filter((task) => !task.isCompleted);
  };

  getCompletedTasks = (tasks) => {
    return tasks.filter((task) => task.isCompleted);
  };

  sortByPriority = (tasks) => {
    return tasks.sort((item1, item2) => {
      const priorityOrder = {
        High: 1,
        Medium: 2,
        Low: 3,
      };
      return priorityOrder[item1.priority] - priorityOrder[item2.priority];
    });
  };

  sortByCompletedStatus = (tasks) => {
    const active = this.getActiveTasks(tasks);
    const completed = this.getCompletedTasks(tasks);
    const sortedByPriority = this.sortByPriority(active);
    return [...sortedByPriority, ...completed];
  };

  displayTasksByFilterCompletedStatus = (tasks) => {
    if (this.props.filter === "active") {
      return this.sortByPriority(this.getActiveTasks(tasks));
    }
    if (this.props.filter === "completed") {
      return this.getCompletedTasks(tasks);
    }
    return this.sortByCompletedStatus(tasks);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.tasks !== this.props.tasks) {
      localStorage.setItem("tasks", JSON.stringify(this.props.tasks));
    }
  }

  render() {
    let tasks = this.displayTasksByFilterCompletedStatus(this.props.tasks);

    return (
      <>
        <Container fluid mx="xl">
          <ScrollArea h={"63vh"} py={"xl"} auto="true">
            <SimpleGrid mx="xl" cols={1} verticalSpacing="lg">
              {tasks.length !== 0 ? (
                tasks.map((task) => (
                  <Box key={task.id}>
                    <Card
                      bg={
                        task.isCompleted
                          ? "gray.2"
                          : this.assignColorByPriority(task.priority)
                      }
                      shadow={task.isCompleted ? "" : "md"}
                      radius={task.isCompleted ? "" : "md"}
                      px="xl"
                      py="xs"
                      mx="xl"
                      withBorder
                    >
                      <Group position="apart">
                        <Text
                          weight={500}
                          color={task.isCompleted ? "gray.6" : ""}
                          size={"15px"}
                          td={task.isCompleted ? "line-through" : ""}
                          maw={"70%"}
                        >
                          {task.description}
                        </Text>

                        {task.isCompleted ? (
                          <Group>
                            <ActionIcon
                              variant="filled"
                              bg={"cyan.4"}
                              onClick={() =>
                                this.props.handleToggleIsCompleted(task.id)
                              }
                            >
                              <IconCircleCheck size="1.125rem" />
                            </ActionIcon>
                            <ActionIcon
                              variant="filled"
                              bg="red.4"
                              onClick={() => this.props.handleDelete(task.id)}
                            >
                              <IconCircleMinus size="1.125rem" />
                            </ActionIcon>
                          </Group>
                        ) : (
                          <Group position="right">
                            <Badge
                              color={this.assignColorByPriority(task.priority)}
                              variant="light"
                            >
                              {task.priority}
                            </Badge>
                            <ActionIcon
                              variant="light"
                              onClick={() =>
                                this.props.handleToggleIsCompleted(task.id)
                              }
                              bg="teal.1"
                            >
                              <IconCircleCheck size="1.125rem" />
                            </ActionIcon>
                            <ActionIcon
                              variant="light"
                              onClick={() => this.props.openEditForm(task)}
                              bg="white"
                            >
                              <IconEditCircle size="1.125rem" />
                            </ActionIcon>
                            <ActionIcon
                              variant="light"
                              bg="red.1"
                              onClick={() => this.props.handleDelete(task.id)}
                            >
                              <IconCircleMinus size="1.125rem" />
                            </ActionIcon>
                          </Group>
                        )}
                      </Group>
                      <Text size="xs" weight={300}>
                        Created at {task.createdAt}
                      </Text>
                    </Card>
                  </Box>
                ))
              ) : (
                <Center>
                  <Text size={"xl"} my={"xl"}>
                    NO TODOS
                  </Text>
                </Center>
              )}
            </SimpleGrid>
          </ScrollArea>
        </Container>
      </>
    );
  }
}

export default TasksList;
