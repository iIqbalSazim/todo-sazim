import { useState } from "react";

import {
  Button,
  Center,
  Modal,
  Select,
  SimpleGrid,
  Textarea,
  Title,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";

import { PRIORITY, PRIORITY_OPTIONS, COLORS } from "../../HomePageConstants";
import { createTask } from "../../Api/Methods";

const AddTaskForm = ({ isOpen, closeModal }) => {
  const [newTask, setNewTask] = useState({
    description: "Task details not provided",
    priority: PRIORITY.LOW,
    is_completed: false,
    due_date: new Date().toDateString(),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createTask({ task: { ...newTask } });

    closeModal();
    window.location.reload(false);
    alert("Task successfully added");
  };

  return (
    <Modal opened={isOpen} onClose={() => closeModal()} centered>
      <form onSubmit={handleSubmit}>
        <SimpleGrid cols={1} p={"lg"}>
          <Title ta={"center"}>Create Todo</Title>
          <Textarea
            placeholder="Write your task"
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
          />
          <Select
            placeholder="Set priority"
            defaultValue={PRIORITY.LOW}
            data={PRIORITY_OPTIONS}
            onSelect={(e) =>
              setNewTask({
                ...newTask,
                priority: e.target.value.toLowerCase(),
              })
            }
          />
          <DateInput
            minDate={new Date()}
            defaultValue={new Date()}
            onChange={(input) => {
              setNewTask({ ...newTask, due_date: input });
            }}
            label="Due Date"
          />
          <Center>
            <Button color={COLORS.BUTTON} type="submit">
              Create
            </Button>
          </Center>
        </SimpleGrid>
      </form>
    </Modal>
  );
};

export default AddTaskForm;
