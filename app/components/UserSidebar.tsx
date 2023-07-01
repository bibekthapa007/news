import React from "react";
import paths from "../utils/paths";
import Link from "./Link";

function UserSidebar() {
  return (
    <>
      <Link href={paths.home} my={1}>
        Home
      </Link>
      <Link href={paths.setting} my={1}>
        Profile
      </Link>
      <Link href={paths.post} my={1}>
        Post
      </Link>
      <Link href={paths.category} my={1}>
        Category
      </Link>
      <Link href={paths.verifyMobile} my={1}>
        Verify Mobile
      </Link>
      <Link href={paths.changePassword} my={1}>
        Change Password
      </Link>
      <Link href="/#" my={1}>
        Log Out
      </Link>
    </>
  );
}

export default UserSidebar;
