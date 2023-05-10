import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import {createBrowserRouter,RouterProvider,Outlet} from 'react-router-dom';
import About from "./components/About";
import Error from './components/Error';
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import RestaurantMenu from "./components/RestaurantMenu";

/**
 * <div id ="parent">
 *    <div id = "child">
 *       <h1>I'm h1 tag</h1>
 *       <h2>I'm h2 tag</h2>
 *    </div>
 *    <div id="child2">
 *         <h1>I'm h1 tag</h1>
 *         <h2>I'm h2 tag</h2>
 *    </div>
 * </div>
 *
 */

// const parent = React.createElement("div", { id: "parent" }, [
//   React.createElement("div", { id: "child" }, [
//     React.createElement("h1", {}, "I'm h1 tag"),
//     React.createElement("h2", {}, "I'm h2 tag"),
//   ]),
//   React.createElement("div", { id: "child2" }, [
//     React.createElement("h1", {}, "I'm h1 tag"),
//     React.createElement("h2", {}, "I'm h2 tag"),
//   ]),
// ]);
// console.log(parent);
// const heading = React.createElement(
//   "h1",
//   { id: "heading", xyz: "abc" },
//   "Hello world from React!"
// );





//JSX
const heading = (
  <h1 className="head" tabIndex="5">
    Namaste React using JSX
  </h1>
);
const root = ReactDOM.createRoot(document.getElementById("root"));



const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Outlet/>
      <Footer/>
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<AppLayout/>,
    errorElement:<Error/>,
    children:[
      {
        path:"/",
        element:<Body/>
      },
      {
        path:"/about",
        element:<About/>
      },
      {
        path:"/contact",
        element:<Contact/>
      },
      {
        path:"/RestaurantMenu/:id",
        element:<RestaurantMenu/>
      }
    ]
  }
  
])
root.render(<RouterProvider router={appRouter}></RouterProvider>);
