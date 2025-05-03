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
      element:<MainLayout/>,
      children:[
        {element:<Login />, path:"login"},
        {element:<Register/>, path:"register"}
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
const Login = Loadable(
  lazy(() => import("../pages/auth/login")),
);
const Register =Loadable(
  lazy(()=>import("../pages/auth/register"))
)
const Setting = Loadable(
  lazy(() => import("../pages/dashboard/setting")),
);
const Page404 = Loadable(lazy(() => import("../pages/Page404")));
