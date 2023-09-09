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
import React from "react";

class EditForm extends React.Component {
  state = this.props.task;

  handleSubmit = (e) => {
    const { editTask, closeModal } = this.props;
    e.preventDefault();

    editTask(this.state);
    closeModal();
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
                { value: "high", label: "High" },
                { value: "medium", label: "Medium" },
                { value: "low", label: "Low" },
              ]}
              defaultValue={this.state.priority}
              onSelect={(e) =>
                this.setState({ priority: e.target.value.toLowerCase() })
              }
            />
            <DateInput
              minDate={new Date()}
              defaultValue={new Date(this.state.dueDate)}
              onChange={(value) =>
                this.setState({ dueDate: value.toDateString().slice(0, 15) })
              }
              label="Date input"
              placeholder="Date input"
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
