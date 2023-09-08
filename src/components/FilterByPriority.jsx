import React from "react";
import { Button, Group } from "@mantine/core";

class FilterByPriority extends React.Component {
  state = { variant: "outline" };

  handleClearFilterByPriority = () => {
    const { setFilter } = this.props;
    setFilter("");
    this.setState({ variant: "outline" });
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
            variant={this.state.variant}
            color="indigo.4"
            onClick={() => this.handleButtonClick("High")}
          >
            High
          </Button>
          <Button
            variant={this.state.variant}
            color="indigo.4"
            onClick={() => this.handleButtonClick("Medium")}
          >
            Medium
          </Button>
          <Button
            variant={this.state.variant}
            color="indigo.4"
            onClick={() => this.handleButtonClick("Low")}
          >
            Low
          </Button>
          <Button
            variant="filled"
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
