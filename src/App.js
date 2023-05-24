import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout/MainLayout";
import AuthLayout from "./layouts/AuthLayout/AuthLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRouter from "./routes/AdminRouter";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import AdminAddUser from "./modules/AdminAddUser/AdminAddUser";
import AdminUserList from "./modules/AdminUserList/AdminUserList";

const Home = lazy(() => import("./modules/Home/Home"));
const MovieDetails = lazy(() =>
  import("./modules/MovieDetail/MovieDetails.jsx")
);
const BookingTicket = lazy(() =>
  import("./modules/BookingTicket/BookingTicket")
);
const InfoTicketed = lazy(() =>
  import("./modules/BookingTicket/InfoTicketed/InfoTicketed")
);

const SignUp = lazy(() => import("./modules/Authentication/signup/SignUp"));
const SignIn = lazy(() => import("./modules/Authentication/singin/SignIn"));

const AdminInfoUser = lazy(() =>
  import("./modules/AdminInfoUser/AdminInfoUser")
);
const BookingTicketed = lazy(() =>
  import("./modules/TicketedHistory/TicketedHistory")
);
const MovieManagement = lazy(() =>
  import("./modules/MovieManagement/MovieManagement")
);
const MovieAddNew = lazy(() =>
  import("./modules/MovieManagement/MovieAddNew/MovieAddNew")
);
const AddShowTimes = lazy(()=> import('./modules/MovieManagement/AddShowTimes/AddShowTimes'));

const TestComponent = lazy(() => import("./test/TestComponent"));
const Erros = lazy(()=> import('./components/Error/Error'));

function App() {
  return (
    // thực hiện router như trên
    <Suspense
      fallback={
        <div className="d-flex justify-content-center align-items-center">
          <img src="/img/loading.gif" class="img-fluid" alt="" />
        </div>
      }
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />

            <Route path="movies/:movieID" element={<MovieDetails />} />

            <Route
              path="/booking/:bookingID"
              element={
                <ProtectedRoute>
                  <BookingTicket />
                </ProtectedRoute>

                }>

            </Route>
            <Route path='info-ticketed' element={<InfoTicketed />} />
            
            <Route path='test' element={<TestComponent/>}/>
            <Route path='*' element={<Erros/>}/>


            <Route path="test" element={<TestComponent />} />
          </Route>

          <Route path="/" element={<AuthLayout />}>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
          </Route>

          <Route
            path="admin"
            element={
              <AdminRouter>
                <AdminLayout />
              </AdminRouter>
            }
          >
            <Route index element={<AdminInfoUser />} />
            <Route path="history" element={<BookingTicketed />} />
            <Route path="movies" element={<MovieManagement />} />
            <Route path="addmovies" element={<MovieAddNew />} />
            <Route path='movies/addshowtimes' element={<AddShowTimes/>}/>
            <Route path="users" element={<AdminUserList />} />
            <Route path="add-user" element={<AdminAddUser />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
