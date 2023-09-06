import { Center, Tabs } from "@mantine/core";
import React from "react";

class FilterTodos extends React.Component {
  render() {
    return (
      <>
        <Center>
          <Tabs variant="pills" color="indigo" defaultValue="all">
            <Tabs.List grow>
              <Tabs.Tab value="all">All</Tabs.Tab>
              <Tabs.Tab value="active">Active</Tabs.Tab>
              <Tabs.Tab value="completed">Completed</Tabs.Tab>
            </Tabs.List>
          </Tabs>
        </Center>
      </>
    );
  }
}

export default FilterTodos;
