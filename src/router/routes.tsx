import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import PostPage from '../pages/PostPage'
import TagPage from '../pages/TagPage'
import AuthorPage from '../pages/AuthorPage'
import AboutPage from '../pages/AboutPage'
import NotFoundPage from '../pages/NotFoundPage'

export const DEFAULT_ROOT_PATH = '/'
export const DEFAULT_ABOUT_PATH = '/about/'

export const router = createBrowserRouter([
  { path: DEFAULT_ROOT_PATH, element: <HomePage /> },
  { path: '/post/:slug', element: <PostPage /> },
  { path: '/tag/:tag', element: <TagPage /> },
  { path: '/author/:id', element: <AuthorPage /> },
  { path: DEFAULT_ABOUT_PATH, element: <AboutPage /> },
  { path: '*', element: <NotFoundPage /> },
], {
  basename: import.meta.env.BASE_URL
})
