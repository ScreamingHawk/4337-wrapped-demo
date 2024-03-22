import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Home } from "./Home"
import { Account } from "./Account"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/account",
    element: <Account />,
  },
])

export const Router: React.FC = () => {
  return <RouterProvider router={router} />
}
