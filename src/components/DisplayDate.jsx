import { Center, Title } from "@mantine/core";
import { DISPLAYDATE } from "../constants/displayDate";

const DisplayDate = () => {
  return (
    <Center>
      <Title radius={"sm"} mb={"xl"} pt={"sm"} color={DISPLAYDATE}>
        {new Date().toDateString()}
      </Title>
    </Center>
  );
};

export default DisplayDate;
