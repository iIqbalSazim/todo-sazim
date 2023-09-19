import {
  AppShell,
  Header,
  Title,
  Navbar,
  MediaQuery,
  Button,
  Center,
} from "@mantine/core";
import { useEffect, useState } from "react";
import AddTaskForm from "../components/AddTaskForm";
import TasksList from "../components/TasksList";
import FilterByCompletedStatus from "../components/FilterByCompletedStatus";
import EditForm from "../components/EditForm";
import ActionButtons from "../components/ActionButtons";
import Bin from "../components/Bin";

import { findIndexWithId } from "../helper/helper";
import ConfirmModal from "../components/ConfirmModal";
import FilterByDueDate from "../components/FilterByDueDate";
import DisplayDate from "../components/DisplayDate";
import { COLORS, COMPLETED_STATUS } from "../constants/constant";
import ResponsiveFilterByCompletedStatus from "../components/ResponsiveFilterByCompletedStatus";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [toBeEdited, setToBeEdited] = useState({});
  const [filter, setFilter] = useState({
    status: COMPLETED_STATUS.ALL,
    priority: "",
    dueDate: false,
  });
  const [trash, setTrash] = useState([]);

  useEffect(() => {
    const localTasks = JSON.parse(localStorage.getItem("tasks"));
    const localTrash = JSON.parse(localStorage.getItem("trash"));
    if (localTasks.length !== 0) {
      setTasks([...localTasks]);
    }
    if (localTrash.length !== 0) {
      setTrash(localTrash);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("trash", JSON.stringify(trash));
  }, [trash]);

  const setIsConfirmModalToOpen = () => {
    setIsConfirmModalOpen(true);
  };

  const setIsConfirmModalToClose = () => {
    setIsConfirmModalOpen(false);
  };

  const toggleFilterDueDate = () => {
    setFilter({ ...filter, dueDate: !filter.dueDate });
  };

  const setCompletedStatusFilter = (status) => {
    setFilter({ ...filter, status: status });
  };

  const setPriorityStatusFilter = (priority) => {
    setFilter({ ...filter, priority: priority });
  };

  const toggleIsCompleted = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const clearAllCompletedTasks = () => {
    let updatedList = tasks.filter((task) => task.isCompleted !== true);

    if (JSON.stringify(tasks) === JSON.stringify(updatedList)) {
      alert("You have no completed tasks to remove");
    } else {
      setTasks(updatedList);
    }
  };

  const toggleIsAddFormOpen = () => {
    setIsAddFormOpen(!isAddFormOpen);
  };

  const addNewTask = (task) => {
    setTasks([...tasks, task]);
  };

  const toggleIsEditFormOpen = () => {
    setIsEditFormOpen(!isEditFormOpen);
  };

  const handleOpenEditForm = (task) => {
    toggleIsEditFormOpen();
    setToBeEdited(task);
  };

  const editTask = (edited) => {
    const index = findIndexWithId(tasks, edited.id);
    const updatedTasks = tasks;
    updatedTasks[index] = edited;
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    let removedTask = tasks.filter((task) => task.id === id)[0];
    addToTrash(removedTask);
    let updatedList = tasks.filter((task) => task.id !== id);
    setTasks(updatedList);
  };

  const addToTrash = (removedTask) => {
    setTrash([...trash, removedTask]);
  };

  const emptyTrash = () => {
    setTrash([]);
    localStorage.removeItem("trash");
  };

  const retrieveAll = () => {
    setTasks([...tasks, ...trash]);
    emptyTrash();
  };

  return (
    <>
      <AppShell
        padding="xl"
        navbarOffsetBreakpoint={"md"}
        navbar={
          <Navbar
            width={{ base: 200 }}
            hiddenBreakpoint={"md"}
            height={"full"}
            p="xl"
            bg={"gray.2"}
            hidden={"true"}
          >
            <Navbar.Section grow mt={"120%"}>
              <FilterByCompletedStatus setFilter={setCompletedStatusFilter} />
            </Navbar.Section>
          </Navbar>
        }
        header={
          <Header
            p={"lg"}
            height={"90"}
            sx={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}
          >
            <MediaQuery smallerThan={"sm"} styles={{ display: "none" }}>
              <Title
                order={1}
                ta={"left"}
                h={"fit"}
                color="indigo.9"
                fw={"200"}
                tt="capitalize"
              >
                &lt;TODO OR <strong>!</strong>TODO /&gt;
              </Title>
            </MediaQuery>

            <MediaQuery largerThan={"sm"} styles={{ display: "none" }}>
              <Title
                order={2}
                ta={"left"}
                h={"fit"}
                color="indigo.9"
                fw={"200"}
                mt={"sm"}
                tt="capitalize"
              >
                &lt;TODO OR <strong>!</strong>TODO /&gt;
              </Title>
            </MediaQuery>
          </Header>
        }
      >
        <DisplayDate />
        <ActionButtons
          filter={filter}
          setFilter={setPriorityStatusFilter}
          handleNewToDoClick={toggleIsAddFormOpen}
          setIsConfirmModalOpen={setIsConfirmModalToOpen}
        />
        <FilterByDueDate
          toggleFilterDueDate={toggleFilterDueDate}
          filter={filter}
        />
        {isAddFormOpen ? (
          <AddTaskForm
            createNewTask={addNewTask}
            closeModal={toggleIsAddFormOpen}
            isOpen={isAddFormOpen}
          />
        ) : null}
        {isEditFormOpen ? (
          <EditForm
            closeModal={toggleIsEditFormOpen}
            isOpen={isEditFormOpen}
            task={toBeEdited}
            editTask={editTask}
          />
        ) : null}

        <ConfirmModal
          isConfirmModalOpen={isConfirmModalOpen}
          closeModal={setIsConfirmModalToClose}
          clearAllCompletedTasks={clearAllCompletedTasks}
        />
        <TasksList
          tasks={tasks}
          deleteTask={deleteTask}
          openEditForm={handleOpenEditForm}
          toggleIsCompleted={toggleIsCompleted}
          filter={filter}
        />
        <ResponsiveFilterByCompletedStatus
          setCompletedStatusFilter={setCompletedStatusFilter}
          filter={filter}
        />
        <Bin
          handleRetrieveAllClick={retrieveAll}
          handleEmptyBinClick={emptyTrash}
          trash={trash}
        />
      </AppShell>
    </>
  );
};

export default Home;
