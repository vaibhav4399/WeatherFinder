import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import Header from "../Header/Header";
import 'react-toastify/ReactToastify.min.css';

export const dataContext = createContext();

function Layout() {

    const [latitude, setLatitude] = useState(66.3493);
    const [longitude, setLongitude] = useState(-164.333);
    const [cityName, setCityName] = useState("Kotzebue");

    return (
        <dataContext.Provider value={{longitude, setLongitude, latitude, setLatitude, cityName, setCityName}}>
            <div>
                <Header />
                <main className="mt-24 sm:mt-28 flex justify-center">
                    <ToastContainer
                        newestOnTop={true}
                        theme="colored"
                        pauseOnHover
                        transition={Bounce}
                        draggable
                    />
                    <Outlet />
                </main>  
            </div>
        </dataContext.Provider>
    );
}


export default Layout;