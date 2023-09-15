import { Tabs } from "@mantine/core";
import { COLORS } from "../constants/constant";

const FilterByCompletedStatus = ({ setFilter }) => {
  return (
    <Tabs
      orientation="vertical"
      variant="pills"
      color={COLORS.BUTTON}
      defaultValue="all"
      onTabChange={(value) => setFilter(value)}
      h={"180px"}
    >
      <Tabs.List position="apart">
        <Tabs.Tab value="all">All</Tabs.Tab>
        <Tabs.Tab value="active">Active</Tabs.Tab>
        <Tabs.Tab value="completed">Completed</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
};

export default FilterByCompletedStatus;
