import { Box, Container, Flex, Heading, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { HiChevronUp } from "react-icons/hi";
import Link from "next/link";

function Footer() {
  const handleSrollToTop = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    window.scrollTo(0, 0);
  };
  return (
    <Box bg="gray.200" color="black">
      <Container maxW="container.xl">
        <Flex
          justifyContent={"space-between"}
          display={["flex", "flex", "flex", "block"]}
          alignItems={"center"}
          py={2}
        >
          <Flex
            flexDir={["column", "row"]}
            justifyContent="space-between"
            mr={2}
          >
            <Text>Sojo News. All right reserved.</Text>
            <Button
              colorScheme="green"
              display={["none", "none", "none", "block"]}
              onClick={handleSrollToTop}
            >
              <HiChevronUp />
            </Button>
            <Flex>
              <Link href="/privacy">
                <Text color="green.600" mr="4" textDecor={"underline"}>
                  Privacy Policy
                </Text>
              </Link>
              <Link href="/terms">
                <Text color="green.600" textDecor={"underline"}>
                  Terms and Conditions
                </Text>
              </Link>
            </Flex>
          </Flex>
          <Button
            colorScheme="green"
            display={["", "", "", "none"]}
            onClick={handleSrollToTop}
          >
            <HiChevronUp />
          </Button>
        </Flex>
      </Container>
    </Box>
  );
}

export default Footer;
