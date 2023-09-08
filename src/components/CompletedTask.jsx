import { ActionIcon, Badge, Box, Card, Group, Text } from "@mantine/core";
import {
  IconCircleCheck,
  IconCircleMinus,
  IconEditCircle,
} from "@tabler/icons-react";
import React from "react";

class CompletedTask extends React.Component {
  render() {
    const { task, handleDelete, handleToggleIsCompleted } = this.props;
    return (
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
              onClick={() => handleToggleIsCompleted(task.id)}
            >
              <IconCircleCheck size="1.125rem" />
            </ActionIcon>
            <ActionIcon
              variant="filled"
              bg="red.4"
              onClick={() => handleDelete(task.id)}
            >
              <IconCircleMinus size="1.125rem" />
            </ActionIcon>
          </Group>
        </Group>
        <Text size="xs" weight={300}>
          Created at {task.createdAt}
        </Text>
      </Card>
    );
  }
}

export default CompletedTask;
