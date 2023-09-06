import {
  Box,
  Button,
  Center,
  Modal,
  Select,
  SimpleGrid,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import React from "react";

class EditTodoForm extends React.Component {
  state = this.props.todo;

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    this.props.editTodo(this.state);
    this.props.closeModal();
  };
  render() {
    return (
      <Modal opened={this.props.isOpen} onClose={() => this.props.closeModal()}>
        {console.log(this.state)}
        <form onSubmit={this.handleSubmit}>
          <SimpleGrid cols={1} p={"xl"}>
            <Title ta={"center"}>Edit Todo</Title>
            <TextInput
              defaultValue={this.state.title}
              onChange={(e) => this.setState({ title: e.target.value })}
            />
            <Textarea
              defaultValue={this.state.description}
              onChange={(e) => this.setState({ description: e.target.value })}
            />
            <Select
              data={[
                { value: "High", label: "High" },
                { value: "Medium", label: "Medium" },
                { value: "Low", label: "Low" },
              ]}
              defaultValue={this.state.priority}
              onSelect={(e) => this.setState({ priority: e.target.value })}
            />
            <Center>
              <Button color="indigo.7" type="submit">
                Update
              </Button>
            </Center>
          </SimpleGrid>
        </form>
      </Modal>
    );
  }
}

export default EditTodoForm;
