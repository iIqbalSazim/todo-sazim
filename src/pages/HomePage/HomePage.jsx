import { useEffect, useState } from "react";

import { AppShell, Header, Title, Navbar, MediaQuery } from "@mantine/core";

import { findIndexWithId } from "./HomePageHelpers";
import { COMPLETED_STATUS } from "./HomePageConstants";

import FilterByCompletedStatus from "./Components/FilterByCompletedStatus/FilterByCompletedStatus";
import DisplayDate from "./Components/DisplayDate/DisplayDate";
import ActionButtons from "./Components/ActionButtons/ActionButtons";
import FilterByDueDate from "./Components/FilterByDueDate/FilterByDueDate";
import AddTaskForm from "./Components/AddTaskForm/AddTaskForm";
import EditForm from "./Components/EditForm/EditForm";
import ConfirmModal from "./Components/ConfirmModal/ConfirmModal";
import TasksList from "./Components/TasksList/TasksList";
import ResponsiveFilterByCompletedStatus from "./Components/ResponsiveFilterByCompletedStatus/ResponsiveFilterByCompletedStatus";
import Bin from "./Components/Bin/Bin";
import { fetchAllTasks, updateTaskIsCompleted } from "./Api/Methods";

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

  const getAllTasks = async () => {
    const res = await fetchAllTasks();
    setTasks(res.data);
  };

  useEffect(() => {
    const localTasks = JSON.parse(localStorage.getItem("tasks"));
    if (localTasks && localTasks.length !== 0) {
      setTasks([...localTasks]);
    } else {
      getAllTasks();
    }
    const localTrash = JSON.parse(localStorage.getItem("trash"));
    if (localTrash) {
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
        updateTaskIsCompleted(id, {
          task: { is_completed: !task.is_completed },
        });
        return { ...task, is_completed: !task.is_completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const clearAllCompletedTasks = () => {
    let updatedList = tasks.filter((task) => task.is_completed !== true);

    if (JSON.stringify(tasks) === JSON.stringify(updatedList)) {
      alert("You have no completed tasks to remove");
    } else {
      setTasks(updatedList);
    }
  };

  const toggleIsAddFormOpen = () => {
    setIsAddFormOpen(!isAddFormOpen);
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
            closeModal={toggleIsAddFormOpen}
            isOpen={isAddFormOpen}
          />
        ) : null}
        {isEditFormOpen ? (
          <EditForm
            closeModal={toggleIsEditFormOpen}
            isOpen={isEditFormOpen}
            task={toBeEdited}
          />
        ) : null}

        <ConfirmModal
          isConfirmModalOpen={isConfirmModalOpen}
          closeModal={setIsConfirmModalToClose}
          clearAllCompletedTasks={clearAllCompletedTasks}
        />
        <TasksList
          tasks={tasks}
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
