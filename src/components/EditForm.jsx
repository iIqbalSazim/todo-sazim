import {
  Button,
  Center,
  Modal,
  Select,
  SimpleGrid,
  Textarea,
  Title,
} from "@mantine/core";
import React from "react";

class EditForm extends React.Component {
  state = this.props.task;

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.editTask(this.state);
    this.props.closeModal();
  };

  render() {
    const { isOpen, closeModal } = this.props;

    return (
      <Modal opened={isOpen} onClose={() => closeModal()}>
        <form onSubmit={this.handleSubmit}>
          <SimpleGrid cols={1} p={"lg"}>
            <Title ta={"center"}>Edit Todo</Title>
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

export default EditForm;
