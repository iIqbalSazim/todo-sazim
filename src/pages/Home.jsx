import {
  Box,
  Button,
  Center,
  Tabs,
  Flex,
  List,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { IconCircle, IconCircleCheck } from "@tabler/icons-react";
import React from "react";

class Home extends React.Component {
  state = {
    item: "",
    priority: "High",
    isCompleted: false,
  };
  render() {
    return (
      <div>
        <Center>
          <h1>To-do</h1>
        </Center>
        <Center>
          <Flex direction="column" justify="center" align="center" gap="md">
            <Button color="violet">New todo</Button>
            <Tabs variant="pills" color="indigo" defaultValue="all">
              <Tabs.List grow>
                <Tabs.Tab value="all">All</Tabs.Tab>
                <Tabs.Tab value="active">Active</Tabs.Tab>
                <Tabs.Tab value="completed">Completed</Tabs.Tab>
              </Tabs.List>
            </Tabs>
          </Flex>
        </Center>
        <Box py={"xl"}>
          <Center>
            <List
              spacing="xs"
              size="sm"
              center
              icon={
                <ThemeIcon color="violet" size={24} radius="xl">
                  <IconCircle size="1rem" />
                </ThemeIcon>
              }
            >
              <List.Item>Todo High</List.Item>
              <List.Item>Todo Medium</List.Item>
              <List.Item>Todo Low</List.Item>
              <List.Item>Todo 2</List.Item>
              <List.Item
                icon={
                  <ThemeIcon color="indigo" size={24} radius="xl">
                    <IconCircleCheck size="1rem" />
                  </ThemeIcon>
                }
              >
                <Text td={"line-through"}>Todo completed</Text>
              </List.Item>
            </List>
          </Center>
        </Box>
      </div>
    );
  }
}

export default Home;
