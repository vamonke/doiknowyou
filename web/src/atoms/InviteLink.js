import React, { useState } from "react";
import { Box, Flex, Text, Button } from "rebass";
import Icon from "react-eva-icons";

const InviteLink = () => {
  const [buttonText, setButtonText] = useState("Invite friends");
  const [buttonIcon, setButtonIcon] = useState("person-add-outline");

  const webShare = () => {
    const link = document.location;
    const data = {
      url: link,
      text: "Join game",
      title: "Do I know you?"
    };
    if (navigator.canShare && navigator.canShare(data)) {
      navigator
        .share(data)
        .then(() => console.log("Share was successful."))
        .catch(error => {
          console.log("Sharing failed", error);
          copyToClipboard(link);
        });
    } else {
      console.log(`Your system doesn't support sharing links`);
      copyToClipboard(link);
    }
  };

  const copyToClipboard = async link => {
    // Unsupported on IE but its k
    try {
      await navigator.clipboard.writeText(link);
      setButtonText("Invite link copied");
      setButtonIcon("person-add-outline");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <Flex justifyContent="center">
      <Button
        type="button"
        variant="link"
        px={3}
        py={2}
        my={2}
        color="orange"
        onClick={webShare}
      >
        {buttonIcon === "person-add-outline" ? (
          <Box key="person-add-outline" mb={-1}>
            <Icon fill="#FA7F00" name="person-add-outline" size="large" />
          </Box>
        ) : (
          <Box key="person-add-outline" mb={-1}>
            <Icon fill="#FA7F00" name="person-add-outline" size="large" />
          </Box>
        )}
        <Text ml={2}>{buttonText}</Text>
      </Button>
    </Flex>
  );
};

export default InviteLink;
