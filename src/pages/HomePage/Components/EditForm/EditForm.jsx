import { useState } from "react";

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

import { formatDueDate } from "../../HomePageHelpers";
import { PRIORITY_OPTIONS, COLORS } from "../../HomePageConstants";

const EditForm = ({ task, editTask, isOpen, closeModal }) => {
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleSubmit = (e) => {
    e.preventDefault();

    editTask(editedTask);
    closeModal();
  };

  return (
    <Modal opened={isOpen} onClose={() => closeModal()} centered>
      <form onSubmit={handleSubmit}>
        <SimpleGrid cols={1} p={"lg"}>
          <Title ta={"center"}>Edit Todo</Title>
          <Textarea
            defaultValue={editedTask.description}
            onChange={(e) =>
              setEditedTask({ ...editedTask, description: e.target.value })
            }
          />
          <Select
            data={PRIORITY_OPTIONS}
            defaultValue={editedTask.priority}
            onSelect={(e) =>
              setEditedTask({
                ...editedTask,
                priority: e.target.value.toLowerCase(),
              })
            }
          />
          <DateInput
            minDate={new Date()}
            defaultValue={new Date(editedTask.dueDate)}
            onChange={(input) =>
              setEditedTask({ ...editedTask, dueDate: formatDueDate(input) })
            }
            label="Due Date"
          />
          <Center>
            <Button color={COLORS.BUTTON} type="submit">
              Update
            </Button>
          </Center>
        </SimpleGrid>
      </form>
    </Modal>
  );
};

export default EditForm;