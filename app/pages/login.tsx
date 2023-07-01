import { useEffect } from "react";
import { Box, Heading } from "@chakra-ui/react";
import GoogleLogin from "react-google-login";
import { useRouter } from "next/router";

import { googleLogin } from "features/auth/AuthSlice";
import { useAppDispatch, useAppSelector } from "store/hook";
import DashboardLayout from "components/DashboardLayout";
import { SigninResponse } from "types/auth";

export default function SignInPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const responseGoogle = (data: any) => {
    dispatch(googleLogin({ token: data.tokenId }));
  };

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        router.replace("admin");
      } else {
        if (user.role !== "admin" && !user.gender) {
          router.replace("/user-info");
        } else {
          router.replace("/");
        }
      }
    }
  }, [user]);

  const googleError = (error: any) => {
    console.error(error, "Google error");
  };

  return (
    <DashboardLayout>
      <Box
        w={{ base: "100%", md: "60%" }}
        flex="flex"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          w={{ base: "full", md: "xl" }}
          px={{ base: "8", md: "16" }}
          mt={"20"}
        >
          <Heading py="2">
            Continue browsing your personalized new stories.
          </Heading>
          <Box mt="10" p="0" bg="white" rounded="md" shadow="md">
            <GoogleLogin
              style={{ width: "100% !important", boxShadow: "none !important" }}
              clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
              buttonText="Login With Google"
              onSuccess={responseGoogle}
              onFailure={googleError}
              cookiePolicy={"single_host_origin"}
            />
          </Box>
        </Box>
      </Box>
    </DashboardLayout>
  );
}
