import { Route, Routes } from "react-router-dom"
import DefaultLayout from "./components/containers/default/DefaultLayout"
import LoginPage from "./components/account/LoginPage.tsx"
import RegisterPage from "./components/account/RegisterPage.tsx"
import CategoryListPage from "./components/categories/list/CategoryListPage.tsx"
import PostListPage from "./components/posts/list/PostListPage.tsx"
import PostPage from "./components/posts/list/PostPage.tsx"
import CategoryEditPage from "./components/categories/edit/CategoryEditPage.tsx"
import CategoryCreatePage from "./components/categories/create/CategoryCreatePage.tsx"
import PostCreatePage from "./components/posts/create/PostCreatePage.tsx"
import PostEditPage from "./components/posts/edit/PostEditPage.tsx"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>

          <Route path={"login"} element={<LoginPage />} />
          <Route path={"register"} element={<RegisterPage />} />

          <Route index element={<CategoryListPage />} />
          <Route path={"category/:id/:urlSlug"} element={<PostListPage />} />
          <Route path={"category/edit/:id"} element={<CategoryEditPage />} />
          <Route path={"category/create"} element={<CategoryCreatePage />} />

          <Route path={"post/:id/:urlSlug"} element={<PostPage />} />
          <Route path={"post/create"} element={<PostCreatePage />} />
          <Route path={"post/edit/:id"} element={<PostEditPage />} />

        </Route>
      </Routes>
    </>
  )
}

export default App
