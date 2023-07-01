export interface Post {
  _id: string;
  title: string;
  description: string;
  slug: string;
  isPublished: boolean;
  isSensitive: boolean;
  views?: number;
  imageLink?: string;
  link?: string;
  linklabel?: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  categories: string[];
  tags: string[];
}

export interface PostForm {
  _id: string;
  title: string;
  nepaliTitle: string;
  description: string;
  nepaliDescription: string;
  slug: string;
  isPublished: boolean;
  isSensitive: boolean;
  imageLink?: string;
  link?: string;
  linklabel?: string;
  author: string;
  categories: string[];
  tags: string[];
  userFiles: any;
}

export interface PostsResponse {
  posts: Post[];
  total: number;
  message: string;
}

export interface PostResponse {
  post: Post;
  message: string;
  post_id?: string;
}

export interface IPostState {
  posts: Post[];
  postsLoading: boolean;
  postsError: string;
  postsTotal: number;
  page: number;
  nomore: boolean;

  post: Post | null | undefined;
  postLoading: boolean;
  postError: string;

  creating: boolean;
  createError: "";

  deleting: boolean;
  deleteError: "";

  updating: boolean;
  updateError: "";
}

export interface IAdminPostState {
  posts: Post[];
  postsLoading: boolean;
  postsError: string;
  page: number;
  perPage: number;
  total: number;
  selectedRows: number;
  filter: any;
  paginationRowsPerPage: number[];
  nomore: boolean;

  post: Post | null | undefined;
  postLoading: boolean;
  postError: string;

  creating: boolean;
  createError: "";

  deleting: boolean;
  deleteError: "";

  updating: boolean;
  updateError: "";
}

export interface IPostAction {
  createPost: (post: Post) => void;
  updatePost: (post_id: number) => void;
  fetchPosts: () => void;
  fetchPost: (post_id: number) => void;
  deletePost: (post_id: number) => void;
}
