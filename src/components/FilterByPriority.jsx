import { Button } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { PRIORITY } from "../constants/constant";
import { COLORS } from "../constants/constant";

const FilterByPriority = ({ setFilter, filter }) => {
  return (
    <>
      <Button.Group>
        <Button
          variant={
            filter.priority === PRIORITY.HIGH && !filter.dueDate
              ? "filled"
              : "outline"
          }
          color={COLORS.PRIORITYBUTTON}
          onClick={() => setFilter(PRIORITY.HIGH)}
        >
          High
        </Button>
        <Button
          variant={
            filter.priority === PRIORITY.MEDIUM && !filter.dueDate
              ? "filled"
              : "outline"
          }
          color={COLORS.PRIORITYBUTTON}
          onClick={() => setFilter(PRIORITY.MEDIUM)}
        >
          Medium
        </Button>
        <Button
          variant={
            filter.priority === PRIORITY.LOW && !filter.dueDate
              ? "filled"
              : "outline"
          }
          color={COLORS.PRIORITYBUTTON}
          onClick={() => setFilter(PRIORITY.LOW)}
        >
          Low
        </Button>
        <Button
          variant="light"
          color={"indigo.4"}
          size="sm"
          rightIcon={<IconX size={"1rem"} />}
          onClick={() => setFilter("")}
        >
          Clear Filter
        </Button>
      </Button.Group>
    </>
  );
};

export default FilterByPriority;
