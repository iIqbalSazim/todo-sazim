import { ActionIcon, Badge, Card, Code, Group, Text } from "@mantine/core";
import {
  IconCircleCheck,
  IconCircleMinus,
  IconEditCircle,
} from "@tabler/icons-react";

const ActiveTask = ({
  task,
  assignColorByPriority,
  toggleIsCompleted,
  openEditForm,
  deleteTask,
}) => {
  return (
    <Card
      bg={assignColorByPriority(task.priority)}
      shadow={"md"}
      radius={"md"}
      px="xl"
      py="xs"
      mx="xl"
      withBorder
    >
      <Group position="apart">
        <Text weight={500} size={"15px"} maw={"70%"}>
          {task.description}
        </Text>
        <Group position="right">
          <Badge color={assignColorByPriority(task.priority)} variant="light">
            {task.priority}
          </Badge>
          <ActionIcon
            variant="light"
            onClick={() => toggleIsCompleted(task.id)}
            bg="teal.1"
          >
            <IconCircleCheck size="1.125rem" />
          </ActionIcon>
          <ActionIcon
            variant="light"
            onClick={() => openEditForm(task)}
            bg="white"
          >
            <IconEditCircle size="1.125rem" />
          </ActionIcon>
          <ActionIcon
            variant="light"
            bg="red.1"
            onClick={() => deleteTask(task.id)}
          >
            <IconCircleMinus size="1.125rem" />
          </ActionIcon>
        </Group>
      </Group>
      <Group position="apart" pt={"md"}>
        <Text size="xs" weight={300}>
          Created at {task.createdAt}
        </Text>
        <Code size={"sm"} radius={"md"} color="red">
          Complete by: {task.dueDate}
        </Code>
      </Group>
    </Card>
  );
};

export default ActiveTask;
