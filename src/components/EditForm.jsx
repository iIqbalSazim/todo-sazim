import React from "react";
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
import { HIGH, LOW, MEDIUM } from "../constants/priority";
import { formatDueDate } from "../helper/helper";
import { BUTTON } from "../constants/colors";

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
      <Modal opened={isOpen} onClose={() => closeModal()} centered>
        <form onSubmit={this.handleSubmit}>
          <SimpleGrid cols={1} p={"lg"}>
            <Title ta={"center"}>Edit Todo</Title>
            <Textarea
              defaultValue={this.state.description}
              onChange={(e) => this.setState({ description: e.target.value })}
            />
            <Select
              data={[
                { value: HIGH, label: "High" },
                { value: MEDIUM, label: "Medium" },
                { value: LOW, label: "Low" },
              ]}
              defaultValue={this.state.priority}
              onSelect={(e) =>
                this.setState({ priority: e.target.value.toLowerCase() })
              }
            />
            <DateInput
              minDate={new Date()}
              defaultValue={new Date(this.state.dueDate)}
              onChange={(input) =>
                this.setState({ dueDate: formatDueDate(input) })
              }
              label="Date input"
              placeholder="Date input"
            />
            <Center>
              <Button color={BUTTON} type="submit">
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
