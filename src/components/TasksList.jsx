import {
  Button,
  Center,
  Container,
  ScrollArea,
  SimpleGrid,
  Text,
} from "@mantine/core";
import React from "react";
import CompletedTask from "./CompletedTask";
import ActiveTask from "./ActiveTAsk";

class TasksList extends React.Component {
  assignColorByPriority = (priority) => {
    if (priority === "High") {
      return "red.3";
    }
    if (priority === "Medium") {
      return "teal.2";
    }
    return "blue.1";
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

  sortTasks = (tasks) => {
    const active = this.getActiveTasks(tasks);
    const completed = this.getCompletedTasks(tasks);
    const sortedByPriority = this.sortByPriority(active);
    return [...sortedByPriority, ...completed];
  };

  filterByPriority = (tasks) => {
    let highPriority = tasks.filter((task) => task.priority === "High");
    let mediumPriority = tasks.filter((task) => task.priority === "Medium");
    let lowPriority = tasks.filter((task) => task.priority === "Low");

    if (this.props.priorityFilter === "High") {
      return highPriority;
    }
    if (this.props.priorityFilter === "Medium") {
      return mediumPriority;
    }
    if (this.props.priorityFilter === "Low") {
      return lowPriority;
    }
  };

  filterTasks = (tasks) => {
    const { filter } = this.props;

    if (filter.status === "all" && !filter.priority) {
      return this.sortTasks(tasks);
    }

    if (filter.status === "all") {
      let filteredTasks = tasks.filter((task) => task.isCompleted === false);

      if (filter.priority === "High") {
        filteredTasks = filteredTasks.filter(
          (task) => task.priority === "High"
        );
      }
      if (filter.priority === "Medium") {
        filteredTasks = filteredTasks.filter(
          (task) => task.priority === "Medium"
        );
      }
      if (filter.priority === "Low") {
        return filteredTasks.filter((task) => task.priority === "Low");
      }

      return this.sortTasks(filteredTasks);
    }

    if (filter.status === "active") {
      const activeTasks = this.sortByPriority(this.getActiveTasks(tasks));
      if (filter.priority === "High") {
        return activeTasks.filter((task) => task.priority === "High");
      }
      if (filter.priority === "Medium") {
        return activeTasks.filter((task) => task.priority === "Medium");
      }
      if (filter.priority === "Low") {
        return activeTasks.filter((task) => task.priority === "Low");
      }
      return this.sortByPriority(this.getActiveTasks(tasks));
    }

    if (filter.status === "completed") {
      return this.getCompletedTasks(tasks);
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.tasks !== this.props.tasks) {
      localStorage.setItem("tasks", JSON.stringify(this.props.tasks));
    }
  }

  render() {
    let tasks = this.filterTasks(this.props.tasks);

    return (
      <>
        <Container fluid mx="xl" p={"xl"}>
          <ScrollArea h={"50vh"} py={"xl"} auto="true">
            <SimpleGrid mx="xl" cols={1} verticalSpacing="lg">
              {tasks.length !== 0 ? (
                tasks.map((task) =>
                  task.isCompleted ? (
                    <CompletedTask
                      key={task.id}
                      task={task}
                      handleDelete={this.props.handleDelete}
                      handleToggleIsCompleted={
                        this.props.handleToggleIsCompleted
                      }
                    />
                  ) : (
                    <ActiveTask
                      task={task}
                      key={task.id}
                      assignColorByPriority={this.assignColorByPriority}
                      handleToggleIsCompleted={
                        this.props.handleToggleIsCompleted
                      }
                      openEditForm={this.props.openEditForm}
                      handleDelete={this.props.handleDelete}
                    />
                  )
                )
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
