import React from "react";
import NextLink from "next/link";
import { Link as ChackraLink } from "@chakra-ui/react";

const Link = ({
  children,
  href,
  as,
  passHref,
  replace,
  scroll,
  shallow,
  locale,
  nextLink,
  decoration,
  ...chackraProps
}: any) => {
  chackraProps._hover = {
    ...chackraProps._hover,
    textDecoration: decoration || "none",
  };
  return (
    <NextLink
      href={href}
      as={as}
      passHref={passHref}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      locale={locale}
      {...nextLink}
    >
      <ChackraLink {...chackraProps}>{children}</ChackraLink>
    </NextLink>
  );
};

export default Link;
