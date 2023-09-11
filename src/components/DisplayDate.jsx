import { Center, Title } from "@mantine/core";
import React from "react";
import { DISPLAYDATE } from "../constants/displayDate";

class DisplayDate extends React.Component {
  render() {
    return (
      <Center>
        <Title
          radius={"sm"}
          mb={"xl"}
          pt={"sm"}
          color={DISPLAYDATE}
        >{`${new Date().toDateString()}`}</Title>
      </Center>
    );
  }
}

export default DisplayDate;
