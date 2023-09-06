import {
  Button,
  Center,
  Select,
  SimpleGrid,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import React from "react";

class AddTodoForm extends React.Component {
  state = {
    id: Math.random(),
    title: "",
    description: "",
    priority: "",
    isCompleted: false,
    createdAt: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createNewTodo(this.state);

    // clean up form data
    this.setState({
      title: "",
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
    let createdAt = `${date.toLocaleTimeString()} | ${date.toDateString()}`;
    this.setState({ createdAt: createdAt });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <SimpleGrid
          cols={1}
          bg={"gray.1"}
          px={"xl"}
          py={"xl"}
          my={20}
          mx={"30%"}
        >
          <Title ta={"center"}>Create Todo</Title>
          <TextInput
            placeholder="Title"
            value={this.state.title}
            onChange={(e) => this.setState({ title: e.target.value })}
          />
          <Textarea
            placeholder="Write your task"
            value={this.state.description}
            onChange={(e) => this.setState({ description: e.target.value })}
          />
          <Select
            placeholder="Select one priority status"
            data={[
              { value: "high", label: "High" },
              { value: "medium", label: "Medium" },
              { value: "low", label: "Low" },
            ]}
            onSelect={(e) => this.setState({ priority: e.target.value })}
          />
          <Center>
            <Button color="indigo.7" type="submit" onClick={this.setCreatedAt}>
              Create
            </Button>
          </Center>
        </SimpleGrid>
      </form>
    );
  }
}

export default AddTodoForm;
