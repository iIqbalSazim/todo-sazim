import { AppShell, Header, Title, Navbar } from "@mantine/core";
import React from "react";
import AddTaskForm from "../components/AddTaskForm";
import TasksList from "../components/TasksList";
import FilterByCompletedStatus from "../components/FilterByCompletedStatus";
import EditForm from "../components/EditForm";
import ActionButtons from "../components/ActionButtons";
import Bin from "../components/Bin";

import { findIndexWithId } from "../helper/helper";

class Home extends React.Component {
  state = {
    tasks: [],
    isAddFormOpen: false,
    isEditFormOpen: false,
    toBeEdited: {},
    filter: { status: "all", priority: "" },
    trash: [],
  };

  setCompletedStatusFilter = (status) => {
    this.setState((prevState) => {
      return { filter: { ...prevState.filter, status: status } };
    });
  };

  setPriorityStatusFilter = (priority) => {
    this.setState((prevState) => {
      return { filter: { ...prevState.filter, priority: priority } };
    });
  };

  setIsCompleted = (id) => {
    const updatedTasks = this.state.tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });

    this.setState({ tasks: updatedTasks });
  };

  clearAllCompletedTasks = () => {
    let updatedList = this.state.tasks.filter(
      (task) => task.isCompleted !== true
    );

    this.setState({ tasks: updatedList });
  };

  setIsAddFormOpen = () => {
    this.setState((prevState) => {
      return { isAddFormOpen: !prevState.isAddFormOpen };
    });
  };

  addNewTask = (task) => {
    this.setState((prevState) => {
      return { tasks: [...prevState.tasks, task] };
    });
  };

  setIsEditFormOpen = () => {
    this.setState((prevState) => {
      return { isEditFormOpen: true };
    });
  };

  setIsEditFormClose = () => {
    this.setState((prevState) => {
      return { isEditFormOpen: false };
    });
  };

  handleOpenEditForm = (task) => {
    this.setIsEditFormOpen();
    this.setState((prevState) => {
      return { toBeEdited: task };
    });
  };

  editTask = (edited) => {
    const index = findIndexWithId(this.state.tasks, edited.id);
    const updatedTasks = this.state.tasks;
    updatedTasks[index] = edited;

    this.setState({ tasks: updatedTasks });
  };

  deleteTask = (id) => {
    let tasks = this.state.tasks;
    let removedTask = tasks.filter((task) => task.id === id)[0];
    this.addToTrash(removedTask);
    let updatedList = tasks.filter((task) => task.id !== id);
    this.setState({ tasks: updatedList });
  };

  addToTrash = (removedTask) => {
    this.setState((prevState) => {
      return { trash: [...prevState.trash, removedTask] };
    });
  };

  emptyTrash = () => {
    this.setState({ trash: [] });
    localStorage.removeItem("trash");
  };

  retrieveAll = () => {
    this.setState((prevState) => {
      return { tasks: [...prevState.tasks, ...this.state.trash] };
    });
    this.emptyTrash();
  };

  componentDidMount() {
    this.setState((prevState) => {
      return {
        tasks: JSON.parse(localStorage.getItem("tasks")) || [],
        trash: JSON.parse(localStorage.getItem("trash")) || [],
      };
    });
  }

  componentDidUpdate(prevState) {
    let local = JSON.parse(localStorage.getItem("trash")) || [];
    if (JSON.stringify(this.state.trash) !== JSON.stringify(local)) {
      localStorage.setItem("trash", JSON.stringify(this.state.trash));
      console.log("trash updated");
    }
    console.log(JSON.stringify(this.state.trash) === JSON.stringify(local));
    console.log(this.state.trash);
    console.log(local);
  }

  render() {
    return (
      <>
        {console.log(this.state.filter)}
        <AppShell
          padding="xl"
          navbar={
            <Navbar width={{ base: 200 }} height={"full"} p="xl" bg={"gray.2"}>
              <Navbar.Section grow mt={"120%"}>
                <FilterByCompletedStatus
                  setFilter={this.setCompletedStatusFilter}
                />
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
                &lt;TODO OR <strong>!</strong>TODO /&gt;
              </Title>
            </Header>
          }
        >
          <ActionButtons
            setFilter={this.setPriorityStatusFilter}
            handleNewToDoClick={this.setIsAddFormOpen}
            handleRemoveCompletedClick={this.clearAllCompletedTasks}
          />
          {this.state.isAddFormOpen ? (
            <AddTaskForm
              createNewTask={this.addNewTask}
              closeForm={this.setIsAddFormOpen}
            />
          ) : null}
          {this.state.isEditFormOpen ? (
            <EditForm
              closeModal={this.setIsEditFormClose}
              isOpen={this.state.isEditFormOpen}
              task={this.state.toBeEdited}
              editTask={this.editTask}
            />
          ) : null}
          <TasksList
            tasks={this.state.tasks}
            handleDelete={this.deleteTask}
            openEditForm={this.handleOpenEditForm}
            handleToggleIsCompleted={this.setIsCompleted}
            filter={this.state.filter}
          />
          <Bin
            handleRetrieveAllClick={this.retrieveAll}
            handleEmptyBinClick={this.emptyTrash}
            trash={this.state.trash}
          />
        </AppShell>
      </>
    );
  }
}

export default Home;
