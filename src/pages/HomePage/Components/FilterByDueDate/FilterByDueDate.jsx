import { Button, Group, MediaQuery, Text } from "@mantine/core";
import { IconChevronDown, IconX } from "@tabler/icons-react";

const FilterByDueDate = ({ filter, toggleFilterDueDate }) => {
  return (
    <Group position="right" mr={"md"} pt={"xl"}>
      <MediaQuery largerThan={"md"} styles={{ display: "none" }}>
        <Button
          rightIcon={
            !filter.dueDate ? (
              <IconChevronDown size={"1rem"} />
            ) : (
              <IconX size={"1rem"} />
            )
          }
          variant="outline"
          size="xs"
          onClick={() => toggleFilterDueDate()}
        >
          <Text size={"xs"}>Sort by Due Date</Text>
        </Button>
      </MediaQuery>

      <MediaQuery smallerThan={"md"} styles={{ display: "none" }}>
        <Button
          rightIcon={
            !filter.dueDate ? (
              <IconChevronDown size={"1rem"} />
            ) : (
              <IconX size={"1rem"} />
            )
          }
          data-testid="due-date-button-md"
          variant="outline"
          onClick={() => toggleFilterDueDate()}
        >
          Sort by Due Date
        </Button>
      </MediaQuery>
    </Group>
  );
};

export default FilterByDueDate;
