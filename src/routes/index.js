import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

// layouts
import DashboardLayout from "../layouts/dashboard";

// config
import { DEFAULT_PATH } from "../config";
import LoadingScreen from "../components/LoadingScreen";
import MainLayout from "../layouts/main";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path:"/auth",
      element:<MainLayout />,
      children:[
        {element:<Login />, path:"login"},
        {element:<Register/>, path:"register"},
        {element:<ForgetPassword/>, path:"ForgetPassword"},
        {element:<Verify />, path:"Verify"},
        {element:<SetNewPasssword />, path:"New-Password"},
      ]
    },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        { path: "app", element: <GeneralApp /> },
        // /setting
        { path: "Setting", element: <Setting /> },
        { path: "Group", element: <Group /> },
        { path: "call", element: <Call /> },
        { path: "Profile", element: <Profile /> },
        
        
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

const GeneralApp = Loadable(
  lazy(() => import("../pages/dashboard/GeneralApp")),
);
const Group = Loadable(
  lazy(() => import("../pages/dashboard/Group")),
);
const Login = Loadable(
  lazy(() => import("../pages/auth/login")),
);
const Call = Loadable(
  lazy(() => import("../pages/dashboard/call")),
);
const Profile = Loadable(
  lazy(() => import("../pages/dashboard/Profile")),
);

const Register =Loadable(
  lazy(()=>import("../pages/auth/register"))
)
const ForgetPassword =Loadable(
  lazy(()=>import("../pages/auth/forgetPassword"))
)
const SetNewPasssword =Loadable(
  lazy(()=>import("../pages/auth/SetNewPasssword"))
)
const Verify =Loadable(
  lazy(()=>import("../pages/auth/verify"))
)
const Setting = Loadable(
  lazy(() => import("../pages/dashboard/setting")),
);
const Page404 = Loadable(lazy(() => import("../pages/Page404")));
