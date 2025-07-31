import { BrowserRouter, Route, Routes } from 'react-router';
import { HomePage } from './pages/public/Home';
import { PublicLayout } from './templates/PublicLayout';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path='/' index element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}


