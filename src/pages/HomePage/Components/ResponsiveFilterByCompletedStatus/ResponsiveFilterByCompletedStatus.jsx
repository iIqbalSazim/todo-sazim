import { Button, Center, MediaQuery } from "@mantine/core";

import { COLORS, COMPLETED_STATUS } from "../../HomePageConstants";

const ResponsiveFilterByCompletedStatus = ({
  setCompletedStatusFilter,
  filter,
}) => {
  return (
    <>
      <MediaQuery largerThan={"md"} styles={{ display: "none" }}>
        <Center>
          <Button.Group>
            <Button
              variant={
                filter.status === COMPLETED_STATUS.ALL ? "filled" : "outline"
              }
              color={COLORS.BUTTON}
              onClick={() => setCompletedStatusFilter(COMPLETED_STATUS.ALL)}
              size="xs"
            >
              All
            </Button>
            <Button
              variant={
                filter.status === COMPLETED_STATUS.ACTIVE ? "filled" : "outline"
              }
              color={COLORS.BUTTON}
              onClick={() => setCompletedStatusFilter(COMPLETED_STATUS.ACTIVE)}
              size="xs"
            >
              Active
            </Button>
            <Button
              variant={
                filter.status === COMPLETED_STATUS.COMPLETED
                  ? "filled"
                  : "outline"
              }
              color={COLORS.BUTTON}
              onClick={() =>
                setCompletedStatusFilter(COMPLETED_STATUS.COMPLETED)
              }
              size="xs"
            >
              Completed
            </Button>
          </Button.Group>
        </Center>
      </MediaQuery>
    </>
  );
};

export default ResponsiveFilterByCompletedStatus;
