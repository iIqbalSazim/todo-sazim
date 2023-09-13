import { Button, Group } from "@mantine/core";
import { IconChevronDown, IconX } from "@tabler/icons-react";

const FilterByDueDate = ({ filter, toggleFilterDueDate }) => {
  return (
    <Group position="right" mx={"lg"} pt={"xl"}>
      <Button
        rightIcon={
          !filter.dueDate ? (
            <IconChevronDown size={"1rem"} />
          ) : (
            <IconX size={"1rem"} />
          )
        }
        variant="outline"
        onClick={() => toggleFilterDueDate()}
      >
        Sort by Due Date
      </Button>
    </Group>
  );
};

export default FilterByDueDate;
