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

class AddTaskForm extends React.Component {
  state = {
    id: Math.round(Math.random() * 1000000),
    description: "Task details not provided",
    priority: "low",
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
    let currTime =
      date.toLocaleTimeString().slice(0, 4) +
      date.toLocaleTimeString().slice(7);
    let createdAt = `${currTime} | ${date.toDateString()}`;
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
                { value: "high", label: "High" },
                { value: "medium", label: "Medium" },
                { value: "low", label: "Low" },
              ]}
              onSelect={(e) =>
                this.setState({ priority: e.target.value.toLowerCase() })
              }
            />
            <DateInput
              minDate={new Date()}
              defaultValue={new Date(this.state.dueDate)}
              onChange={(value) => {
                this.setState({ dueDate: value.toDateString().slice(0, 15) });
              }}
              label="Date input"
            />
            <Center>
              <Button
                color="indigo.7"
                type="submit"
                onClick={this.setCreatedAt}
              >
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
