import { ActionIcon, Card, Group, MediaQuery, Text } from "@mantine/core";
import { IconCircleCheck, IconCircleMinus } from "@tabler/icons-react";

const CompletedTask = ({ task, deleteTask, toggleIsCompleted }) => {
  return (
    <>
      <MediaQuery smallerThan={"sm"} styles={{ display: "none" }}>
        <Card bg="gray.2" px="xl" py="xs" mx="xl" withBorder>
          <Group position="apart">
            <Text
              weight={500}
              size={"15px"}
              color="gray.6"
              td="line-through"
              maw={"70%"}
            >
              {task.description}
            </Text>
            <Group>
              <ActionIcon
                variant="filled"
                bg={"cyan.4"}
                onClick={() => toggleIsCompleted(task.id)}
              >
                <IconCircleCheck size="1.125rem" />
              </ActionIcon>
              <ActionIcon
                variant="filled"
                bg="red.4"
                onClick={() => deleteTask(task.id)}
              >
                <IconCircleMinus size="1.125rem" />
              </ActionIcon>
            </Group>
          </Group>
          <Text size="xs" weight={300}>
            Created at {task.createdAt}
          </Text>
        </Card>
      </MediaQuery>

      <MediaQuery largerThan={"sm"} styles={{ display: "none" }}>
        <Card bg="gray.2" py="sm" withBorder>
          <Group position="apart">
            <Text
              weight={500}
              size={"md"}
              color="gray.6"
              td="line-through"
              maw={"70%"}
            >
              {task.description}
            </Text>
            <Group>
              <ActionIcon
                size={"sm"}
                variant="filled"
                bg={"cyan.4"}
                onClick={() => toggleIsCompleted(task.id)}
              >
                <IconCircleCheck size="1rem" />
              </ActionIcon>
              <ActionIcon
                size={"sm"}
                variant="filled"
                bg="red.4"
                onClick={() => deleteTask(task.id)}
              >
                <IconCircleMinus size="1rem" />
              </ActionIcon>
            </Group>
          </Group>
          <Text size="xs" weight={300} pt={"md"}>
            Created at {task.createdAt}
          </Text>
        </Card>
      </MediaQuery>
    </>
  );
};

export default CompletedTask;
