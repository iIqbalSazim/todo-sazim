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

class EditToDoForm extends React.Component {
  state = {
    title: "This is my test title",
    description: "This is my test description",
    priority: "high",
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
  };
  render() {
    return (
      <Modal opened={true}>
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
                { value: "high", label: "High" },
                { value: "medium", label: "Medium" },
                { value: "low", label: "Low" },
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

export default EditToDoForm;
