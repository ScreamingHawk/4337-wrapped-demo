import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { PageWrapper } from "../components/PageWrapper"
import { AccountPage } from "./Account"
import { HomePage } from "./Home"
import { TryPage } from "./Try"

const wrapped = (element: React.ReactNode) => (
  <PageWrapper>{element}</PageWrapper>
)

const router = createBrowserRouter([
  {
    path: "/",
    element: wrapped(<HomePage />),
  },
  {
    path: "/account",
    element: wrapped(<AccountPage />),
  },
  {
    path: "/try",
    element: wrapped(<TryPage />),
  },
])

export const Router: React.FC = () => {
  return <RouterProvider router={router} />
}
