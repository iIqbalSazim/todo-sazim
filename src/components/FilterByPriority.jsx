import React from "react";
import { Button, Group } from "@mantine/core";

class FilterByPriority extends React.Component {
  render() {
    return (
      <>
        <Group>
          <Button>High</Button>
          <Button>Medium</Button>
          <Button>Low</Button>
        </Group>
      </>
    );
  }
}

export default FilterByPriority;
