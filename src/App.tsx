import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './layout'
import { Loader } from './static/loader'

const IndexPage = lazy(() => import('./pages'))
const UserPage = lazy(() => import('./pages/user'))

export const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={
          <div className="flex justify-center items-center h-screen w-full">
            <Loader />
          </div>
        }>
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="user/:id" element={<UserPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  )
}