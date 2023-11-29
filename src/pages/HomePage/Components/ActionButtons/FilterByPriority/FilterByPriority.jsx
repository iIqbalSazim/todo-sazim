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
            data-testid="high-button-sm"
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
            data-testid="medium-button-sm"
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
            data-testid="low-button-sm"
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
            data-testid="high-button-md"
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
            data-testid="medium-button-md"
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
            data-testid="low-button-md"
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
