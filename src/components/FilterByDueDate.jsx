import { Button, Group } from "@mantine/core";
import { IconChevronDown, IconX } from "@tabler/icons-react";
import React from "react";

class FilterByDueDate extends React.Component {
  render() {
    return (
      <Group position="right" mx={"lg"} pt={"xl"}>
        <Button
          rightIcon={
            !this.props.filter.dueDate ? (
              <IconChevronDown size={"1rem"} />
            ) : (
              <IconX size={"1rem"} />
            )
          }
          variant="outline"
          onClick={() => this.props.toggleFilterDueDate()}
        >
          Sort by Due Date
        </Button>
      </Group>
    );
  }
}

export default FilterByDueDate;
