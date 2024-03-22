import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Home } from "./Home"
import { Account } from "./Account"
import { PageWrapper } from "../components/PageWrapper"

const wrapped = (element: React.ReactNode) => (
  <PageWrapper>{element}</PageWrapper>
)

const router = createBrowserRouter([
  {
    path: "/",
    element: wrapped(<Home />),
  },
  {
    path: "/account",
    element: wrapped(<Account />),
  },
])

export const Router: React.FC = () => {
  return <RouterProvider router={router} />
}
