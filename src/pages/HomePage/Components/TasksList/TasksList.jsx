import {
  Center,
  Container,
  MediaQuery,
  ScrollArea,
  SimpleGrid,
  Text,
} from "@mantine/core";

import CompletedTask from "./CompletedTask/CompletedTask";
import ActiveTask from "./ActiveTask/ActiveTask";

import { deleteTask } from "../../Api/Methods";
import { PRIORITY, COMPLETED_STATUS } from "../../HomePageConstants";

const TasksList = ({ toggleIsCompleted, openEditForm, filter, tasks }) => {
  const assignColorByPriority = (priority) => {
    if (priority === PRIORITY.HIGH) {
      return "violet.3";
    }
    if (priority === PRIORITY.MEDIUM) {
      return "indigo.2";
    }
    return "blue.1";
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    window.location.reload(false);
    alert("Task successfully deleted");
  };

  const getActiveTasks = (tasks) => {
    return tasks.filter((task) => !task.is_completed);
  };

  const getCompletedTasks = (tasks) => {
    return tasks.filter((task) => task.is_completed);
  };

  const sortByPriority = (tasks) => {
    return tasks.sort((item1, item2) => {
      const priorityOrder = {
        high: 1,
        medium: 2,
        low: 3,
      };
      return priorityOrder[item1.priority] - priorityOrder[item2.priority];
    });
  };

  const sortTasks = (tasks) => {
    const activeTasks = getActiveTasks(tasks);
    const completedTasks = getCompletedTasks(tasks);
    const sortedActiveByPriority = sortByPriority(activeTasks);
    return [...sortedActiveByPriority, ...completedTasks];
  };

  const getTaskByPriority = (tasks, priority) => {
    return tasks.filter((task) => task.priority === priority);
  };

  const filterActiveTasks = (tasks, priority) => {
    const activeTasks = sortByPriority(getActiveTasks(tasks));

    if (priority !== "") {
      return getTaskByPriority(activeTasks, priority);
    }

    return activeTasks;
  };

  const filterTasks = (tasks) => {
    const { status, priority } = filter;

    if (status === COMPLETED_STATUS.ALL && !priority) {
      return sortTasks(tasks);
    }

    if (status === COMPLETED_STATUS.ACTIVE || status === COMPLETED_STATUS.ALL) {
      return filterActiveTasks(tasks, priority);
    }

    if (status === COMPLETED_STATUS.COMPLETED) {
      return getCompletedTasks(tasks);
    }
  };

  const sortTasksByDueDate = (tasks) => {
    return tasks.sort(function (task1, task2) {
      return new Date(task1.dueDate) - new Date(task2.dueDate);
    });
  };

  if (filter.dueDate === true && filter.status !== COMPLETED_STATUS.COMPLETED) {
    tasks = sortTasksByDueDate(getActiveTasks(tasks));
  } else if (
    filter.dueDate === true &&
    filter.status === COMPLETED_STATUS.COMPLETED
  ) {
    tasks = sortTasksByDueDate(getCompletedTasks(tasks));
  } else {
    tasks = filterTasks(tasks);
  }

  return (
    <>
      <MediaQuery smallerThan={"md"} styles={{ display: "none" }}>
        <Container fluid mx="xl" p={"xl"}>
          <ScrollArea h={"47vh"} py={"xl"} auto="true">
            <SimpleGrid mx="xl" cols={1} verticalSpacing="lg">
              {tasks.length !== 0 ? (
                tasks.map((task) =>
                  task.is_completed ? (
                    <CompletedTask
                      key={task.id}
                      task={task}
                      deleteTask={handleDeleteTask}
                      toggleIsCompleted={toggleIsCompleted}
                    />
                  ) : (
                    <ActiveTask
                      task={task}
                      key={task.id}
                      assignColorByPriority={assignColorByPriority}
                      toggleIsCompleted={toggleIsCompleted}
                      openEditForm={openEditForm}
                      deleteTask={handleDeleteTask}
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
      </MediaQuery>

      <MediaQuery largerThan={"md"} styles={{ display: "none" }}>
        <Container fluid py={"md"}>
          <ScrollArea h={"47vh"} py={"xl"} auto="true">
            <SimpleGrid cols={1} verticalSpacing="lg">
              {tasks.length !== 0 ? (
                tasks.map((task) =>
                  task.is_completed ? (
                    <CompletedTask
                      key={task.id}
                      task={task}
                      deleteTask={deleteTask}
                      toggleIsCompleted={toggleIsCompleted}
                    />
                  ) : (
                    <ActiveTask
                      task={task}
                      key={task.id}
                      assignColorByPriority={assignColorByPriority}
                      toggleIsCompleted={toggleIsCompleted}
                      openEditForm={openEditForm}
                      deleteTask={deleteTask}
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
      </MediaQuery>
    </>
  );
};

export default TasksList;
