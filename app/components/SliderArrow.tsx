import React from "react";

import { Box, Flex } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/button";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ArrowProps {
  className?: string;
  currentSlide?: number;
  slideCount?: number;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const PrevArrow = ({
  className,
  currentSlide,
  slideCount,
  onClick,
  ...props
}: ArrowProps) => {
  let noMore = className && className.includes("slick-disabled");
  return (
    <Flex
      position="absolute"
      top="0%"
      mx={-8}
      justifyContent={"center"}
      zIndex={10}
    >
      <IconButton
        aria-label="Previous slide"
        onClick={onClick}
        borderRadius="100%"
        boxShadow="lg"
        opacity={!noMore ? 1 : 0.5}
        disabled={!!noMore}
      >
        <FiChevronLeft fontSize="32px" fontWeight="600" />
      </IconButton>
    </Flex>
  );
};

export const NextArrow = ({ className, onClick }: ArrowProps) => {
  let noMore = className && className.includes("slick-disabled");

  return (
    <Box position="absolute" top="0%" mx={-8} right={0} zIndex={10}>
      <IconButton
        aria-label="Next slide"
        onClick={onClick}
        borderRadius="100%"
        boxShadow="lg"
        opacity={!noMore ? 1 : 0}
        disabled={!!noMore}
      >
        <FiChevronRight fontSize="32px" fontWeight="600" />
      </IconButton>
    </Box>
  );
};
