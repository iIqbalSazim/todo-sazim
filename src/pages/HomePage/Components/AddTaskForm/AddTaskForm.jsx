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
import { useForm } from "@mantine/form";

import { PRIORITY, PRIORITY_OPTIONS, COLORS } from "../../HomePageConstants";
import { createTask } from "../../Api/Methods";
import { taskFormValidationSchema } from "../../Validation/FormValidation";

const AddTaskForm = ({ isOpen, closeModal }) => {
  const form = useForm({
    initialValues: {
      description: "",
      priority: "",
      is_completed: false,
      due_date: "",
    },

    validate: taskFormValidationSchema,
  });

  const handleSubmit = async (values) => {
    await createTask({ task: { ...values } });

    closeModal();
    window.location.reload(false);
    alert("Task successfully added");
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
            defaultValue={PRIORITY.LOW}
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

export default AddTaskForm;
