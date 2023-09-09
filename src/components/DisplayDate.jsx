import { Center, Title } from "@mantine/core";
import React from "react";

class DisplayDate extends React.Component {
  render() {
    return (
      <Center>
        <Title
          radius={"sm"}
          mb={"xl"}
          pt={"sm"}
        >{`${new Date().toDateString()}`}</Title>
      </Center>
    );
  }
}

export default DisplayDate;
