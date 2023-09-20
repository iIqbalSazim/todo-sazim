import { Button, MediaQuery } from "@mantine/core";
import { IconX } from "@tabler/icons-react";

import { PRIORITY, COLORS } from "../../../HomePageConstants";

const FilterByPriority = ({ setFilter, filter }) => {
  return (
    <>
      <MediaQuery smallerThan={"md"} styles={{ display: "none" }}>
        <Button.Group>
          <Button
            variant={
              filter.priority === PRIORITY.HIGH && !filter.dueDate
                ? "filled"
                : "outline"
            }
            color={COLORS.PRIORITY_BUTTON}
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
            color={COLORS.PRIORITY_BUTTON}
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
            color={COLORS.PRIORITY_BUTTON}
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
      </MediaQuery>

      <MediaQuery largerThan={"md"} styles={{ display: "none" }}>
        <Button.Group>
          <Button
            variant={
              filter.priority === PRIORITY.HIGH && !filter.dueDate
                ? "filled"
                : "outline"
            }
            color={COLORS.PRIORITYBUTTON}
            onClick={() => setFilter(PRIORITY.HIGH)}
            size="xs"
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
            size="xs"
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
            size="xs"
          >
            Low
          </Button>
          <Button
            variant="light"
            color={"indigo.4"}
            size="xs"
            rightIcon={<IconX size={"1rem"} />}
            onClick={() => setFilter("")}
          >
            Clear
          </Button>
        </Button.Group>
      </MediaQuery>
    </>
  );
};

export default FilterByPriority;
