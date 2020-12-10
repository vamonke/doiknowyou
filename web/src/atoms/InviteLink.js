import React, { useState } from "react";
import { Box, Flex, Text, Button } from "rebass";
import Icon from "react-eva-icons";

const InviteLink = () => {
  const [copied, setCopied] = useState(false);

  const webShare = () => {
    const link = document.location;
    const data = {
      url: link,
      text: "Let's play a game"
      // title: "Do I know you?"
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
      setCopied(true);
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
        color="gradient"
        onClick={webShare}
      >
        {copied ? (
          <Box key="link-2-outline" mb={-1}>
            <Icon fill="#FA7F00" name="link-2-outline" size="large" />
          </Box>
        ) : (
          <Box key="person-add-outline" mb={-1}>
            <Icon fill="#FA7F00" name="person-add-outline" size="large" />
          </Box>
        )}
        <Text ml={2}>{copied ? "Invite link copied" : "Invite friends"}</Text>
      </Button>
    </Flex>
  );
};

export default InviteLink;
