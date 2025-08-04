import { BrowserRouter, Route, Routes } from 'react-router';
import { HomePage } from './pages/public/Home';
import { PublicLayout } from './templates/PublicLayout';
import { CategoriesPage } from './pages/public/Categories';
import { NotFoundPage} from './pages/public/NotFound';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path='/' index element={<HomePage />} />
          <Route path='/categories' element={<CategoriesPage />} />
          <Route path='/*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}


