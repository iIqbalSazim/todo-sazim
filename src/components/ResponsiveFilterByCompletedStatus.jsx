import { Button, Center, MediaQuery } from "@mantine/core";
import { COLORS, COMPLETED_STATUS } from "../constants/constant";

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
            >
              All
            </Button>
            <Button
              variant={
                filter.status === COMPLETED_STATUS.ACTIVE ? "filled" : "outline"
              }
              color={COLORS.BUTTON}
              onClick={() => setCompletedStatusFilter(COMPLETED_STATUS.ACTIVE)}
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
