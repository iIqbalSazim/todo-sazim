import { Center, MediaQuery, Title } from "@mantine/core";
import { COLORS } from "../../HomePageConstants";

const DisplayDate = () => {
  return (
    <Center>
      <MediaQuery smallerThan={"md"} styles={{ display: "none" }}>
        <Title
          radius={"sm"}
          fw={"400"}
          mb={"xl"}
          pt={"sm"}
          color={COLORS.DISPLAY_DATE}
        >
          {new Date().toDateString()}
        </Title>
      </MediaQuery>

      <MediaQuery largerThan={"md"} styles={{ display: "none" }}>
        <Title order={2} fw={"400"} mb={"sm"} color={COLORS.DISPLAY_DATE}>
          {new Date().toDateString()}
        </Title>
      </MediaQuery>
    </Center>
  );
};

export default DisplayDate;
