import { Button, Group, Text } from "@mantine/core";
import { IconPlus, IconTrashX } from "@tabler/icons-react";
import React from "react";

class ActionButtons extends React.Component {
  render() {
    return (
      <>
        <Group position="apart" p={"lg"}>
          <Button
            color="indigo"
            leftIcon={<IconPlus size="1.125rem" />}
            onClick={this.props.handleNewTodoClick}
          >
            <Text>Add todo</Text>
          </Button>
          <Button
            leftIcon={<IconTrashX size="1.125rem" />}
            color="red"
            onClick={this.props.handleRemoveCompletedClick}
          >
            <Text>Remove Completed</Text>
          </Button>
        </Group>
      </>
    );
  }
}

export default ActionButtons;
