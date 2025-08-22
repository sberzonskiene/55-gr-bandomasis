import { BrowserRouter, Route, Routes } from 'react-router';
import { HomePage } from './pages/public/Home';
import { PublicLayout } from './templates/PublicLayout';
import { NotFoundPage } from './pages/public/NotFound';
import { ContainersPage } from './pages/public/Containers';
import { BoxesPage } from './pages/public/Boxes';
import { ContainerInnerPage } from './pages/public/ContainerInner';
import { BoxInnerPage } from './pages/public/BoxInner';
import { RegisterPage } from './pages/public/Register';
import { LoginPage } from './pages/public/Login';
import { AdminDasboardPage } from './pages/admin/Dashboard';
import { AdminLayout } from './templates/AdminLayout';
import { AdminContainersAllPage } from './pages/admin/containers/ContainersAll';
import { AdminNewContainerPage } from './pages/admin/containers/NewContainer';
import { AdminViewContainerPage } from './pages/admin/containers/ViewContainer';
import { AdminEditContainerPage } from './pages/admin/containers/EditContainer';
import { AdminContainersPublishedPage } from './pages/admin/containers/ContainersPublished';
import { AdminContainersDraftPage } from './pages/admin/containers/ContainersDraft';
import { AdminBoxesAllPage } from './pages/admin/boxes/BoxesAll';
import { AdminNewBoxPage } from './pages/admin/boxes/NewBox';
import { AdminViewBoxPage } from './pages/admin/boxes/ViewBox';
import { AdminEditBoxPage } from './pages/admin/boxes/EditBox';
import { AdminBoxesPublishedPage } from './pages/admin/boxes/BoxesPublished';
import { AdminBoxesDraftPage } from './pages/admin/boxes/BoxesDraft';
import { LogoutPage } from './pages/public/Logout';
import { UserContextWrapper } from './context/user/UserContextWrapper';
import { ContainersContextWrapper } from './context/containers/ContainersContextWrapper';
import { BoxesContextWrapper } from './context/boxes/BoxesContextWrapper';

export function App() {
  return (
    <UserContextWrapper>
      <ContainersContextWrapper>
        <BoxesContextWrapper>
          <BrowserRouter>
            <Routes>
              <Route element={<PublicLayout />}>
                <Route path='/' index element={<HomePage />} />
                <Route path='/boxes' element={<BoxesPage />} />
                <Route path='/boxes/:box' element={<BoxInnerPage />} />
                <Route path='/containers' element={<ContainersPage />} />
                <Route path='/containers/:container' element={<ContainerInnerPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/logout' element={<LogoutPage />} />
              </Route>

              <Route element={<AdminLayout />}>
                <Route path='/admin' element={<AdminDasboardPage />} />

                <Route path='/admin/boxes' element={<AdminBoxesAllPage />} />
                <Route path='/admin/boxes/new' element={<AdminNewBoxPage />} />
                <Route path='/admin/boxes/:box' element={<AdminViewBoxPage />} />
                <Route path='/admin/boxes/:box/edit' element={<AdminEditBoxPage />} />
                <Route path='/admin/boxes/published' element={<AdminBoxesPublishedPage />} />
                <Route path='/admin/boxes/draft' element={<AdminBoxesDraftPage />} />

                <Route path='/admin/containers' element={<AdminContainersAllPage />} />
                <Route path='/admin/containers/new' element={<AdminNewContainerPage />} />
                <Route path='/admin/containers/:container' element={<AdminViewContainerPage />} />
                <Route path='/admin/containers/:container/edit' element={<AdminEditContainerPage />} />
                <Route path='/admin/containers/published' element={<AdminContainersPublishedPage />} />
                <Route path='/admin/containers/draft' element={<AdminContainersDraftPage />} />
              </Route>

              <Route element={<PublicLayout />}>
                <Route path='*' element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </BoxesContextWrapper>
      </ContainersContextWrapper>
    </UserContextWrapper>
  );
}