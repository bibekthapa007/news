import AdminLayout from "components/admin/AdminLayout";
import CreateCategoryForm from "features/category/CreateCategoryForm";

export default function CreateCategory() {
  return (
    <AdminLayout bgColor="white">
      <CreateCategoryForm />
    </AdminLayout>
  );
}
