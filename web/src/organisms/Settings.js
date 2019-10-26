import React from "react";
import { Flex, Box, Card, Heading, Text, Button } from "rebass";

const QuestionResults = ({ room, hide }) => {
  const save = () => {
    hide();
  }
  return (
    <Card variant="modal">
      <Box variant="modalBody">
        <Heading variant="blackSmall">
          <Flex justifyContent="space-between">
            Game Settings
            <Button type="button" p={0} onClick={hide}>
              X
            </Button>
          </Flex>
        </Heading>

        Settings

        <Flex mx={-2} mt={3}>
          <Box width={1 / 2} px={2}>
            <Button onClick={hide} width={1} variant="secondary">
              Cancel
            </Button>
          </Box>
          <Box width={1 / 2} px={2}>
            <Button onClick={save} width={1}>
              Save
            </Button>
          </Box>
        </Flex>
      </Box>
    </Card>
  )
};

export default QuestionResults;
