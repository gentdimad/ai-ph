import { createBrowserRouter } from 'react-router-dom'
import SplashPage from '../pages/SplashPage'
import HomePage from '../pages/HomePage'
import PostPage from '../pages/PostPage'
import TagPage from '../pages/TagPage'
import AuthorPage from '../pages/AuthorPage'
import AboutPage from '../pages/AboutPage'
import LearnToBuildPage from '../pages/LearnToBuildPage'
import AIToolsPage from '../pages/AIToolsPage'
import AINewsPage from '../pages/AINewsPage'
import TopicPage from '../pages/TopicPage'
import NotFoundPage from '../pages/NotFoundPage'

export const DEFAULT_ROOT_PATH = '/home'
export const DEFAULT_ABOUT_PATH = '/about/'
export const LEARN_TO_BUILD_PATH = '/learn-to-build'
export const AI_TOOLS_PATH = '/ai-tools'
export const AI_NEWS_PATH = '/ai-news'
export const TOPIC_PATH = '/topic/:slug'

export const router = createBrowserRouter([
  { path: '/', element: <SplashPage /> },
  { path: DEFAULT_ROOT_PATH, element: <HomePage /> },
  { path: '/post/:slug', element: <PostPage /> },
  { path: '/tag/:tag', element: <TagPage /> },
  { path: '/author/:id', element: <AuthorPage /> },
  { path: DEFAULT_ABOUT_PATH, element: <AboutPage /> },
  { path: LEARN_TO_BUILD_PATH, element: <LearnToBuildPage /> },
  { path: AI_TOOLS_PATH, element: <AIToolsPage /> },
  { path: AI_NEWS_PATH, element: <AINewsPage /> },
  { path: TOPIC_PATH, element: <TopicPage /> },
  { path: '*', element: <NotFoundPage /> },
], {
  basename: import.meta.env.BASE_URL
})
