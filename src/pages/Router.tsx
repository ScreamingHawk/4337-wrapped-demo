import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Home } from "./Home"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
])

export const Router: React.FC = () => {
  return <RouterProvider router={router} />
}
