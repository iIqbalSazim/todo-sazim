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
import React from "react";
import { HIGH, LOW, MEDIUM } from "../constants/priority";
import { formatDueDate, generateCurrentTimeAndDate } from "../helper/helper";
import { BUTTON } from "../constants/colors";

class AddTaskForm extends React.Component {
  state = {
    id: Math.round(Math.random() * 1000000),
    description: "Task details not provided",
    priority: LOW,
    isCompleted: false,
    createdAt: "",
    dueDate: new Date().toDateString().slice(0, 15),
  };

  handleSubmit = (e) => {
    const { createNewTask, closeForm } = this.props;
    e.preventDefault();
    createNewTask(this.state);

    this.setState({
      description: "",
      priority: "",
      isCompleted: false,
      createdAt: "",
      updatedAt: "",
      dueDate: "",
    });
    closeForm();
  };

  setCreatedAt = () => {
    let date = new Date();
    let createdAt = generateCurrentTimeAndDate(date);
    this.setState({ createdAt: createdAt });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
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
              onChange={(e) => this.setState({ description: e.target.value })}
            />
            <Select
              placeholder="Set priority"
              defaultValue={"low"}
              data={[
                { value: HIGH, label: "High" },
                { value: MEDIUM, label: "Medium" },
                { value: LOW, label: "Low" },
              ]}
              onSelect={(e) =>
                this.setState({ priority: e.target.value.toLowerCase() })
              }
            />
            <DateInput
              minDate={new Date()}
              defaultValue={new Date(this.state.dueDate)}
              onChange={(input) => {
                this.setState({ dueDate: formatDueDate(input) });
              }}
              label="Date input"
            />
            <Center>
              <Button color={BUTTON} type="submit" onClick={this.setCreatedAt}>
                Create
              </Button>
            </Center>
          </SimpleGrid>
        </Paper>
      </form>
    );
  }
}

export default AddTaskForm;
