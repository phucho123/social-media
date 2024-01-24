import { Navigate, Outlet, Route, Routes, BrowserRouter, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { api, apiRequest } from "./utils/api";
import { setPost } from "./redux/reducer/postSlice";
import LoadingFullScreen from "./components/utils/LoadingFullScreen";
import CommentModal from "./components/utils/modals/CommentModal";
import ImageModal from "./components/utils/modals/ImageModal";
import { updateUser } from "./redux/reducer/userSlice";
import FriendTab from "./components/home/FriendTab";
import NotificationTab from "./components/home/NotificationTab";
import HomeTab from "./components/home/HomeTab";
import UpdateProfileModal from "./components/utils/modals/UpdateProfileModal";


const Layout = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.token) {
      return;
    }
    const fetchPosts = async () => {
      try {
        const userVerifyToken = await apiRequest({
          url: "/users/get-user",
          method: "GET",
          token: user.token,
        });
        if (userVerifyToken.status != 200) {
          window.localStorage.removeItem("user");
          navigate("/login");
          return;
        }
        dispatch(updateUser(
          userVerifyToken.data
        ));
        const res = await apiRequest({
          url: "/posts/get-posts",
          method: "GET"
        });

        // console.log(res.data);

        if (res.status === 200) dispatch(setPost(res.data));

      } catch (err) {
        console.log(err);
      }
    }
    fetchPosts();
  }, [dispatch]);

  return user?.token ? (
    <Outlet />
  ) : (<Navigate to={'/login'} replace />)
}

function App() {
  const isLoadingFullScreen = useSelector((state) => state.loading.fullScreen);
  const user = useSelector(state => state.user.user);
  return (
    <div className={`w-full min-h-[100vh] text-white bg-white`}>
      {
        isLoadingFullScreen && <LoadingFullScreen />
      }
      {
        user && <CommentModal />
      }
      {
        user && <UpdateProfileModal />
      }
      <ImageModal />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/' element={<Home />}>
              <Route path="/" element={<HomeTab />} />
              <Route path="friends" element={<FriendTab />} />
              <Route path="notifications" element={<NotificationTab />} />
            </Route>
            <Route path='profile/:id' element={<Profile />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
