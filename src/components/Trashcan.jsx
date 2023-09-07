import { ActionIcon, Group, Menu } from "@mantine/core";
import { IconTrash, IconTrashFilled } from "@tabler/icons-react";
import React from "react";

class Trashcan extends React.Component {
  render() {
    return (
      <Group position="right" my={"xl"}>
        {this.props.trash.length !== 0 ? (
          <Menu width={200} shadow="md" withArrow position="left" offset={0}>
            <Menu.Target>
              <ActionIcon size={"4rem"} color="red.4" variant="transparent">
                <IconTrashFilled stroke="1px" size={"3rem"} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item onClick={this.props.handleRetrieveTodosClick}>
                Retrieve todos
              </Menu.Item>

              <Menu.Item onClick={this.props.handlePermanentlyDeleteTodosClick}>
                Permanently delete todos
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        ) : (
          <ActionIcon
            size={"4rem"}
            color="black"
            variant="transparent"
            disabled
          >
            <IconTrash stroke="1px" size={"3rem"} />
          </ActionIcon>
        )}
      </Group>
    );
  }
}

export default Trashcan;
