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

import { PRIORITY_OPTIONS, COLORS } from "../../HomePageConstants";
import { useForm } from "@mantine/form";
import { taskFormValidationSchema } from "../../Validation/FormValidation";

const EditForm = ({ task, isOpen, closeModal, editTask }) => {
  const form = useForm({
    validateInputOnChange: true,
    initialValues: { ...task, due_date: new Date(task.due_date) },

    validate: taskFormValidationSchema,
  });

  const handleSubmit = async (values) => {
    await editTask({ ...values });

    closeModal();
    window.location.reload(false);
    alert("Task successfully updated");
  };

  return (
    <Modal opened={isOpen} onClose={() => closeModal()} centered>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <SimpleGrid cols={1} p={"lg"}>
          <Title ta={"center"}>Create Todo</Title>
          <Textarea
            placeholder="Write your task"
            {...form.getInputProps("description")}
          />
          <Select
            placeholder="Set priority"
            defaultValue={task.priority}
            data={PRIORITY_OPTIONS}
            {...form.getInputProps("priority")}
          />
          <DateInput
            minDate={new Date()}
            label="Due Date"
            {...form.getInputProps("due_date")}
          />
          <Center>
            <Button color={COLORS.BUTTON} type="submit">
              Create
            </Button>
          </Center>
        </SimpleGrid>
      </form>
    </Modal>
  );
};

export default EditForm;
