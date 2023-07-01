// if routes are to be changed in future
// using this will save a lot of time in future

//  <Link  href = {paths.register} />
// or
//  <Link  href = {paths.category('id-999')} />

const paths = {
  login: "/login",
  register: "/register",
  home: "/home",
  category: "/category",
  post: "/post",
  setting: "/setting",
  userInfo: "/user-info",
  changePassword: "/changePassword",
  verifyMobile: "/verifyMobile",

  adminHome: "/admin",
  adminPost: "/admin/post",
  adminCreatePost: "/admin/post/create",
  adminCategory: "/admin/category",
  adminCreateCategory: "/admin/category/create",

  singlePost(slug: string | null) {
    if (slug) {
      return `/post/${slug}`;
    }

    return "/post";
  },

  singleCategory(categoryId: string | null) {
    if (categoryId) {
      return `/category/${categoryId}`;
    }

    return "/category";
  },

  adminSinglePost(slug: string | null) {
    if (slug) {
      return `/admin/post/${slug}`;
    }

    return "/admin/post";
  },

  categoryPosts(categoryId: string) {
    return `/category/${categoryId}/post`;
  },
};

export default paths;
