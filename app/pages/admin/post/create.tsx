import { useEffect } from "react";
import { useRouter } from "next/router";

import { useAppDispatch } from "store/hook";
import { fetchPost } from "features/adminPost/AdminPostSlice";
import CreatePostForm from "features/post/CreatePostForm";
import AdminLayout from "components/admin/AdminLayout";

export default function SingleAdminPost() {
  let dispatch = useAppDispatch();
  let router = useRouter();
  let slug = router.query.slug as string;

  useEffect(() => {
    dispatch(fetchPost(slug));
  }, [dispatch, slug]);

  return (
    <AdminLayout bgColor="white">
      <CreatePostForm />
    </AdminLayout>
  );
}
