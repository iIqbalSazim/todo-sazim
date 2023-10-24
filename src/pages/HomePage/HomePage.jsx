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
import RemoveCompletedConfirmModal from "./Components/RemoveCompletedConfirmModal/RemoveCompletedConfirmModal";
import TasksList from "./Components/TasksList/TasksList";
import ResponsiveFilterByCompletedStatus from "./Components/ResponsiveFilterByCompletedStatus/ResponsiveFilterByCompletedStatus";
import Bin from "./Components/Bin/Bin";
import {
  deleteArchivedTasks,
  deleteCompletedTasks,
  fetchAllTasks,
  retrieveArchived,
  updateTask,
  updateTaskIsCompleted,
  updateTaskIsDeleted,
} from "./Api/Methods";

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
    const local = JSON.parse(localStorage.getItem("tasks"));
    let data = [];
    if (local && local.length !== 0) {
      data = local;
    } else {
      const res = await fetchAllTasks();
      data = res.data;
    }
    const active = [];
    const deleted = [];
    data.map((el) => {
      if (!el.is_deleted) {
        active.push(el);
      } else {
        deleted.push(el);
      }
    });
    setTrash(deleted);
    setTasks(active);
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

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

  const archiveTask = async (task) => {
    await updateTaskIsDeleted(task.id, {
      task: { is_deleted: true },
    });

    const index = findIndexWithId(tasks, task.id);
    const deletedTask = { ...task, is_deleted: true };
    const updatedTasks = tasks;
    updatedTasks[index] = deletedTask;

    setTasks(updatedTasks);

    window.location.reload(false);
    alert("Task archived");
  };

  const clearAllCompletedTasks = async () => {
    await deleteCompletedTasks();
    window.location.reload(false);
    alert("All completed tasks removed!");
  };

  const editTask = async (editedTask) => {
    const index = findIndexWithId(tasks, editedTask.id);
    const updatedTasks = tasks;
    updatedTasks[index] = editedTask;
    setTasks(updatedTasks);

    await updateTask(editedTask.id, { task: { ...editedTask } });
  };

  const emptyTrash = async () => {
    await deleteArchivedTasks();
    setTrash([]);
    alert("Archived tasks removed");
  };

  const retrieveAll = async () => {
    await retrieveArchived();
    setTrash([]);
    setTasks([...tasks, ...trash]);
    alert("Archived tasks retrieved");
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
            editTask={editTask}
          />
        ) : null}
        <RemoveCompletedConfirmModal
          isConfirmModalOpen={isConfirmModalOpen}
          closeModal={setIsConfirmModalToClose}
          clearAllCompletedTasks={clearAllCompletedTasks}
        />
        <TasksList
          tasks={tasks}
          openEditForm={handleOpenEditForm}
          toggleIsCompleted={toggleIsCompleted}
          filter={filter}
          archiveTask={archiveTask}
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
