import { ActionIcon, Group, Menu } from "@mantine/core";
import { IconTrashFilled } from "@tabler/icons-react";
import React from "react";

class Bin extends React.Component {
  render() {
    const { trash, handleRetrieveAllClick, handleEmptyBinClick } = this.props;
    return (
      <Group position="right" my={"xl"}>
        {trash.length !== 0 ? (
          <Menu width={200} shadow="md" withArrow position="left" offset={0}>
            <Menu.Target>
              <ActionIcon size={"4rem"} color="red.4" variant="transparent">
                <IconTrashFilled stroke="1px" size={"3rem"} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item onClick={() => handleRetrieveAllClick()}>
                Retrieve all
              </Menu.Item>

              <Menu.Item onClick={() => handleEmptyBinClick()}>
                Empty Bin
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        ) : null}
      </Group>
    );
  }
}

export default Bin;
