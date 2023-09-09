import React from "react";
import { Button, Group } from "@mantine/core";

class FilterByPriority extends React.Component {
  handleClearFilterByPriority = () => {
    const { setFilter } = this.props;
    setFilter("");
  };

  handleButtonClick = (value) => {
    this.props.setFilter(value);
  };

  render() {
    const { setFilter, filter } = this.props;
    return (
      <>
        <Button.Group>
          <Button
            variant={
              filter.priority === "high" && !filter.dueDate
                ? "filled"
                : "outline"
            }
            color="indigo.3"
            onClick={() => this.handleButtonClick("high")}
          >
            High
          </Button>
          <Button
            variant={
              filter.priority === "medium" && !filter.dueDate
                ? "filled"
                : "outline"
            }
            color="indigo.3"
            onClick={() => this.handleButtonClick("medium")}
          >
            Medium
          </Button>
          <Button
            variant={
              filter.priority === "low" && !filter.dueDate
                ? "filled"
                : "outline"
            }
            color="indigo.3"
            onClick={() => this.handleButtonClick("low")}
          >
            Low
          </Button>
          <Button
            variant="light"
            color="indigo.4"
            onClick={() => this.handleClearFilterByPriority()}
          >
            Clear Filtering By Priority
          </Button>
        </Button.Group>
      </>
    );
  }
}

export default FilterByPriority;
