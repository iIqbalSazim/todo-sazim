import {
  ActionIcon,
  Badge,
  Card,
  Code,
  Group,
  MediaQuery,
  Text,
} from "@mantine/core";
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
    <>
      <MediaQuery smallerThan={"sm"} styles={{ display: "none" }}>
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
            <Text weight={500} size={"lg"} maw={"70%"}>
              {task.description}
            </Text>
            <Group position="right">
              <Badge
                color={assignColorByPriority(task.priority)}
                variant="light"
              >
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
              Created at {task.created_at}
            </Text>
            <Code
              size={"sm"}
              radius={"md"}
              bg={assignColorByPriority(task.priority)}
            >
              Complete by: {task.due_date}
            </Code>
          </Group>
        </Card>
      </MediaQuery>

      <MediaQuery largerThan={"sm"} styles={{ display: "none" }}>
        <Card
          bg={assignColorByPriority(task.priority)}
          shadow={"sm"}
          radius={"md"}
          py="sm"
          withBorder
        >
          <Group position="right" spacing={"sm"}>
            <Badge
              color={assignColorByPriority(task.priority)}
              variant="light"
              size="sm"
            >
              {task.priority}
            </Badge>
            <ActionIcon
              variant="light"
              onClick={() => toggleIsCompleted(task.id)}
              bg="teal.1"
            >
              <IconCircleCheck size="1.2rem" />
            </ActionIcon>
            <ActionIcon
              variant="light"
              onClick={() => openEditForm(task)}
              bg="white"
            >
              <IconEditCircle size="1.2rem" />
            </ActionIcon>
            <ActionIcon
              variant="light"
              bg="red.1"
              onClick={() => deleteTask(task.id)}
            >
              <IconCircleMinus size="1.2rem" />
            </ActionIcon>
          </Group>
          <Text weight={500} size={"lg"} w={"100%"} py={"xs"}>
            {task.description}
          </Text>
          <Group position="right">
            <Code
              size={"xs"}
              radius={"md"}
              bg={assignColorByPriority(task.priority)}
            >
              Complete by:{" "}
              {task.due_data ? task.due_date.slice(4) : "no due date"}
            </Code>
          </Group>
        </Card>
      </MediaQuery>
    </>
  );
};

export default ActiveTask;
