import { Route, Routes } from "react-router-dom"
import DefaultLayout from "./components/containers/default/DefaultLayout"
import Login from "./components/account/LoginPage"
import Register from "./components/account/RegisterPage"
import CategoryListPage from "./components/category/list/CategoryListPage"
import AdminLayout from "./components/containers/admin/AdminLayout"
import CategoryCreatePage from "./components/category/create/CategoryCreatePage"

function App() {
   return (
      <>
         <Routes>
            <Route path="/" element={<DefaultLayout />}>

               <Route path={"login"} element={<Login />} />
               <Route path={"register"} element={<Register />} />

               <Route index element={<CategoryListPage />} />

            </Route>

            <Route path={"/admin"} element={<AdminLayout />}>
               <Route path={"category"}>
                  <Route index element={<CategoryListPage />} />
                  <Route path={"create"} element={<CategoryCreatePage />} />
               </Route>
            </Route>

         </Routes>
      </>
   )
}

export default App
