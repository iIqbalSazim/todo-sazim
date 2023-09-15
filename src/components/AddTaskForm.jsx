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
import { useState } from "react";
import { formatDueDate, generateCurrentTimeAndDate } from "../helper/helper";
import { PRIORITY } from "../constants/constant";
import { PRIORITY_OPTIONS } from "../constants/constant";
import { COLORS } from "../constants/constant";

const AddTaskForm = ({ createNewTask, isOpen, closeModal }) => {
  const [newTask, setNewTask] = useState({
    id: Math.round(Math.random() * 1000000),
    description: "Task details not provided",
    priority: PRIORITY.LOW,
    isCompleted: false,
    createdAt: "",
    dueDate: new Date().toDateString().slice(0, 15),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createNewTask(newTask);
    setNewTask({
      description: "",
      priority: "",
      isCompleted: false,
      createdAt: "",
      updatedAt: "",
      dueDate: "",
    });

    closeModal();
  };

  const setCreatedAt = () => {
    let date = new Date();
    let createdAt = generateCurrentTimeAndDate(date);
    setNewTask({ ...newTask, createdAt: createdAt });
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
            defaultValue={new Date(newTask.dueDate)}
            onChange={(input) => {
              setNewTask({ ...newTask, dueDate: formatDueDate(input) });
            }}
            label="Date input"
          />
          <Center>
            <Button color={COLORS.BUTTON} type="submit" onClick={setCreatedAt}>
              Create
            </Button>
          </Center>
        </SimpleGrid>
      </form>
    </Modal>
  );
};

export default AddTaskForm;
