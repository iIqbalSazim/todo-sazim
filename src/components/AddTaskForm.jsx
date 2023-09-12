import {
  Button,
  Center,
  Paper,
  Select,
  SimpleGrid,
  Textarea,
  Title,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useState } from "react";
import { LOW } from "../constants/priority";
import { formatDueDate, generateCurrentTimeAndDate } from "../helper/helper";
import { BUTTON } from "../constants/colors";
import { selectPriorityData } from "../constants/formData";

const AddTaskForm = ({ createNewTask, closeForm }) => {
  const [newTask, setNewTask] = useState({
    id: Math.round(Math.random() * 1000000),
    description: "Task details not provided",
    priority: LOW,
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

    closeForm();
  };

  const setCreatedAt = () => {
    let date = new Date();
    let createdAt = generateCurrentTimeAndDate(date);
    setNewTask({ ...newTask, createdAt: createdAt });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Paper
        shadow="lg"
        p="xl"
        radius={"md"}
        my={20}
        mx={"30%"}
        bg={"white.0"}
        withBorder
      >
        <SimpleGrid cols={1} verticalSpacing={"xl"}>
          <Title ta={"center"}>Create Todo</Title>
          <Textarea
            placeholder="Write your task"
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
          />
          <Select
            placeholder="Set priority"
            defaultValue={LOW}
            data={selectPriorityData}
            onSelect={(e) =>
              setNewTask({ ...newTask, priority: e.target.value.toLowerCase() })
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
            <Button color={BUTTON} type="submit" onClick={setCreatedAt}>
              Create
            </Button>
          </Center>
        </SimpleGrid>
      </Paper>
    </form>
  );
};

export default AddTaskForm;
