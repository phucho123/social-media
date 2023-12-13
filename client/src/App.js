import { Navigate, Outlet, Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { apiRequest } from "./utils/api";
import { setPost } from "./redux/reducer/postSlice";
import LoadingFullScreen from "./components/utils/LoadingFullScreen";
import CommentModal from "./components/utils/modals/CommentModal";


const Layout = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user?.token) {
      return;
    }
    const fetchPosts = async () => {
      try {


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
  }, [dispatch, user]);

  return user?.token ? (
    <Outlet />
  ) : (<Navigate to={'/login'} replace />)
}

function App() {
  const isLoadingFullScreen = useSelector((state) => state.loading.fullScreen);
  return (
    <div className={`w-full min-h-[100vh] text-white bg-black`}>
      {
        isLoadingFullScreen && <LoadingFullScreen />
      }
      {/* <CommentModal /> */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
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
