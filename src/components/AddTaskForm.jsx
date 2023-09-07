import {
  Button,
  Center,
  Paper,
  Select,
  SimpleGrid,
  Textarea,
  Title,
} from "@mantine/core";
import React from "react";

class AddTaskForm extends React.Component {
  state = {
    id: Math.round(Math.random() * 1000000),
    description: "Task details not provided",
    priority: "Low",
    isCompleted: false,
    createdAt: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createNewTask(this.state);

    this.setState({
      description: "",
      priority: "",
      isCompleted: false,
      createdAt: "",
      updatedAt: "",
    });
    this.props.closeForm();
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
              data={[
                { value: "High", label: "High" },
                { value: "Medium", label: "Medium" },
                { value: "Low", label: "Low" },
              ]}
              onSelect={(e) => this.setState({ priority: e.target.value })}
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
