import { useEffect } from "react";
import { useRouter } from "next/router";

import { useAppDispatch } from "store/hook";
import AdminLayout from "components/admin/AdminLayout";
import { fetchCategory } from "features/category/CategorySlice";
import CreateCategoryForm from "features/category/CreateCategoryForm";

export default function SingleAdminCategory() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const categoryId = router.query.categoryId as string;

  useEffect(() => {
    dispatch(fetchCategory(categoryId));
  }, [dispatch, categoryId]);

  return (
    <AdminLayout bgColor="white">
      <CreateCategoryForm />
    </AdminLayout>
  );
}
