import React, { useState } from "react";
import { Box, Flex, Text, Button } from "rebass";
import Icon from "react-eva-icons";
import QRCode from "qrcode.react";

const InviteLink = () => {
  const [copied, setCopied] = useState(false);
  const link = document.location.href;

  const webShare = () => {
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

  const copyToClipboard = async () => {
    // Unsupported on IE but its k
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <>
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
      <Flex justifyContent="center">
        <Box pb={3}>
          <QRCode
            value={link}
            style={{ maxWidth: "100%", height: "auto", width: 96 }}
            fgColor="#2C2736"
            size={1024}
          />
        </Box>
      </Flex>
    </>
  );
};

export default InviteLink;
