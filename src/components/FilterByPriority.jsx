import React from "react";
import { Button, Group } from "@mantine/core";

class FilterByPriority extends React.Component {
  render() {
    const { setFilter } = this.props;
    return (
      <>
        <Button.Group>
          <Button
            variant="outline"
            color="indigo.4"
            onClick={() => setFilter("High")}
          >
            High
          </Button>
          <Button
            variant="outline"
            color="indigo.4"
            onClick={() => setFilter("Medium")}
          >
            Medium
          </Button>
          <Button
            variant="outline"
            color="indigo.4"
            onClick={() => setFilter("Low")}
          >
            Low
          </Button>
          <Button
            variant="filled"
            color="indigo.4"
            onClick={() => setFilter("")}
          >
            Clear Filtering By Priority
          </Button>
        </Button.Group>
      </>
    );
  }
}

export default FilterByPriority;
