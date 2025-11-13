import { Outlet } from "react-router-dom";
import VendorFooter from "./VendorFooter";
import VendorHeader from "./VendorHeader";

export default function VendorMaster(){
    return(
        <>
        
            <VendorHeader/>
             <Outlet/>
            <VendorFooter/>
           

        
        </>
        
    )
}