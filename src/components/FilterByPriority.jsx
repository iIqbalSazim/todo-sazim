import { Button } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { HIGH, LOW, MEDIUM } from "../constants/priority";
import { PRIORITYBUTTON } from "../constants/colors";

const FilterByPriority = ({ setFilter, filter }) => {
  return (
    <>
      <Button.Group>
        <Button
          variant={
            filter.priority === HIGH && !filter.dueDate ? "filled" : "outline"
          }
          color={PRIORITYBUTTON}
          onClick={() => setFilter(HIGH)}
        >
          High
        </Button>
        <Button
          variant={
            filter.priority === MEDIUM && !filter.dueDate ? "filled" : "outline"
          }
          color={PRIORITYBUTTON}
          onClick={() => setFilter(MEDIUM)}
        >
          Medium
        </Button>
        <Button
          variant={
            filter.priority === LOW && !filter.dueDate ? "filled" : "outline"
          }
          color={PRIORITYBUTTON}
          onClick={() => setFilter(LOW)}
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
