import { Button, Grid, Group, Modal, Text, Title } from "@mantine/core";

const ConfirmModal = ({
  clearAllCompletedTasks,
  closeModal,
  isConfirmModalOpen,
}) => {
  const handleDeleteClick = () => {
    clearAllCompletedTasks();
    closeModal();
  };

  return (
    <Modal opened={isConfirmModalOpen} centered onClose={() => closeModal()}>
      <Grid columns={2} gutter={"md"} px={"lg"} pb={"lg"}>
        <Grid.Col span={2}>
          <Title>Confirm Delete</Title>
        </Grid.Col>
        <Grid.Col span={2}>
          <Text>
            Are you sure you want to permanently delete all completed tasks?
          </Text>
        </Grid.Col>
        <Grid.Col span={2} />
        <Grid.Col span={2} />
        <Grid.Col span={2} />
        <Grid.Col span={2} />
        <Grid.Col span={2}>
          <Group position="right">
            <Button color="indigo.7" onClick={() => closeModal()}>
              No, Keep them.
            </Button>
            <Button color="red" onClick={() => handleDeleteClick()}>
              Yes, Delete!
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
    </Modal>
  );
};

export default ConfirmModal;
