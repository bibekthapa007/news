import { useEffect } from "react";
import { useRouter } from "next/router";

import { useAppDispatch } from "store/hook";
import AdminLayout from "components/admin/AdminLayout";
import CreatePostForm from "features/post/CreatePostForm";
import { fetchPost } from "features/adminPost/AdminPostSlice";

export default function SingleAdminPost() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const slug = router.query.slug as string;

  useEffect(() => {
    dispatch(fetchPost(slug));
  }, [dispatch, slug]);

  return (
    <AdminLayout bgColor="white">
      <CreatePostForm />
    </AdminLayout>
  );
}
