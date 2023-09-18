import { Button, Flex, Group, MediaQuery, Text } from "@mantine/core";
import { IconPlus, IconTrashX } from "@tabler/icons-react";

import FilterByPriority from "./FilterByPriority/FilterByPriority";

const ActionButtons = ({
  handleNewToDoClick,
  setIsConfirmModalOpen,
  setFilter,
  filter,
}) => {
  return (
    <>
      <MediaQuery smallerThan={"md"} styles={{ display: "none" }}>
        <Group position="apart" p={"lg"}>
          <Button
            color="indigo"
            leftIcon={<IconPlus size="1.125rem" />}
            onClick={() => handleNewToDoClick()}
          >
            <Text>Add todo</Text>
          </Button>
          <FilterByPriority setFilter={setFilter} filter={filter} />
          <Button
            leftIcon={<IconTrashX size="1.125rem" />}
            color="red"
            onClick={() => setIsConfirmModalOpen()}
          >
            <Text>Remove Completed</Text>
          </Button>
        </Group>
      </MediaQuery>
      <MediaQuery largerThan={"md"} styles={{ display: "none" }}>
        <Flex direction={"column"} align={"center"}>
          <Group position="center" py={"xl"}>
            <Button
              size="xs"
              color="indigo"
              leftIcon={<IconPlus size="1rem" />}
              onClick={() => handleNewToDoClick()}
            >
              <Text size={"xs"}>Todo</Text>
            </Button>
            <Button
              size="xs"
              leftIcon={<IconTrashX size="1rem" />}
              color="red"
              onClick={() => setIsConfirmModalOpen()}
            >
              <Text size={"xs"}>Completed</Text>
            </Button>
          </Group>
          <FilterByPriority setFilter={setFilter} filter={filter} />
        </Flex>
      </MediaQuery>
    </>
  );
};

export default ActionButtons;
