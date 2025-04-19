# React Frontend development

## Setup React Project

1. Scaffold project using Vite: `npm create vite@latest`
2. Setup routing using React Router: `npm install react-router-dom`
3. Configure the routing

   - References:
     - [React Router](https://www.w3schools.com/react/react_router.asp)

   ```js
   import {BrowserRouter, Routes, Route} from "react-router-dom"
   export default function App(){
       return (
           <BrowserRouter>
               <Routes>
                   // can group elements to setup common layout and path
                   <Route path="/" element={<Layout/>}>
                       <Route index element={<Home/>} />
                   </Route>
               </Routes>
           </BrowserRouter>
       )
   }

   // The <Outlet> renders the current route selected.
   import { Outlet } from "react-router-dom";
   export default function Layout() {
   return (
       <>
       <h1>Layout</h1>
       <div>
           <Outlet />
       </div>
       </>
   );
   }
   ```

4. Install Material UI: `npm install @mui/material @emotion/react @emotion/styled @mui/icons-material`
5. Set `title` and add favicon in `index.html`
6. Using material UI, customize the palette - [Palette Customization](https://mui.com/material-ui/customization/palette/)

## Routing

- https://reactrouter.com/start/declarative/routing

## Material UI Menu Hover

- there are some quirks with Material UI Menu hover because of the modal. Use the `material-ui-popup-state` package to work around this issue
- https://www.npmjs.com/package/material-ui-popup-state
- https://jcoreio.github.io/material-ui-popup-state/ --> sample
