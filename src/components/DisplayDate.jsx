import { Center, Title } from "@mantine/core";
import { COLORS } from "../constants/constant";

const DisplayDate = () => {
  return (
    <Center>
      <Title radius={"sm"} mb={"xl"} pt={"sm"} color={COLORS.DISPLAYDATE}>
        {new Date().toDateString()}
      </Title>
    </Center>
  );
};

export default DisplayDate;
