export interface Category {
  _id: string;
  title: string;
  description: string;
  slug: string;
  imageLink?: string;
  userFiles: any;
}

export interface CategoryForm {
  _id: string;
  title: string;
  description: string;
  slug: string;
  imageLink?: string;
  userFiles: any;
}

export interface CategoriesResponse {
  categories: Category[];
  message: string;
}

export interface CategoryResponse {
  category: Category;
  message: string;
  category_id?: string;
}

export interface ICategoryState {
  categories: Category[];
  categoriesLoading: boolean;
  categoriesError: string;

  category: Category | null | undefined;
  categoryLoading: boolean;
  categoryError: string;

  creating: boolean;
  createError: "";

  deleting: boolean;
  deleteError: "";

  updating: boolean;
  updateError: "";
}

export interface IVaccineAction {
  createCategory: (category: Category) => void;
  updateCategory: (category_id: number) => void;
  fetchCategories: () => void;
  fetchCategory: (category_id: number) => void;
  deleteCategory: (category_id: number) => void;
}
