import './App.css'
import HeaderComponent from './components/header/HeaderComponent.jsx'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import ListUserComponent from "./components/user/ListUserComponent.jsx"
import UserComponent from "./components/user/UserComponent.jsx"
import FooterComponent from './components/footer/FooterComponent'
import EquipmentListComponent from "./components/equipment/EquipmentListComponent.jsx";
import EquipmentComponent from "./components/equipment/EquipmentComponent.jsx";
import EquipmentGeneralComponent from './components/equipment/equipment-general/EquipmentGeneralComponent.jsx';
import EquipmentGeneralListComponent from './components/equipment/equipment-general/EquipmentGeneralListComponent.jsx';
import ListMaintenanceComponent from "./components/maintenance/ListMaintenanceComponent.jsx";
import MaintenanceComponent from "./components/maintenance/MaintenanceComponent.jsx";
import ListMaintenanceElectricalComponent from "./components/maintenance/maintenance-electricals/ListMaintenanceElectricalComponent.jsx";
import MaintenanceElectricalComponent from "./components/maintenance/maintenance-electricals/MaintenanceElectricalComponent.jsx";
import ListMaintenanceMechanicalComponent from "./components/maintenance/maintenance-mechanicals/ListMaintenanceMechanicalComponent.jsx";
import MaintenanceMechanicalComponent from "./components/maintenance/maintenance-mechanicals/MaintenanceMechanicalComponent.jsx";
import OrderComponent from "./components/order/OrderComponent.jsx";
import ListOrderComponent from "./components/order/ListOrderComponent.jsx";
import LoginComponent from "./components/login/LoginComponent.jsx";

function App() {

    return (
        <>
            <BrowserRouter>
                <HeaderComponent/>
                <Routes>
                    <Route path='/users' element={<ListUserComponent/>}></Route>
                    <Route path='/add-user' element={<UserComponent/>}></Route>
                    <Route path='/edit-user/:id' element={<UserComponent/>}></Route>

                    <Route path="/equipments" element={<EquipmentListComponent/>}></Route>
                    <Route path="/add-equipment" element={<EquipmentComponent/>}></Route>
                    <Route path="/edit-equipment/:id" element={<EquipmentComponent/>}></Route>

                    <Route path="/equipment-generals" element={<EquipmentGeneralListComponent/>}></Route>
                    <Route path="/add-equipment-general" element={<EquipmentGeneralComponent/>}></Route>
                    <Route path="/edit-equipment-general/:id" element={<EquipmentGeneralComponent/>}></Route>

                    <Route path="/maintenances" element={<ListMaintenanceComponent/>}></Route>
                    <Route path="/add-maintenance" element={<MaintenanceComponent/>}></Route>
                    <Route path="/edit-maintenance/:id" element={<MaintenanceComponent/>}></Route>

                    <Route path="/maintenance-electricals" element={<ListMaintenanceElectricalComponent/>}></Route>
                    <Route path="/add-maintenance-electrical" element={<MaintenanceElectricalComponent/>}></Route>
                    <Route path="/edit-maintenance-electrical/:id" element={<MaintenanceElectricalComponent/>}></Route>

                    <Route path="/maintenance-mechanicals" element={<ListMaintenanceMechanicalComponent/>}></Route>
                    <Route path="/add-maintenance-mechanical" element={<MaintenanceMechanicalComponent/>}></Route>
                    <Route path="/edit-maintenance-mechanical/:id" element={<MaintenanceMechanicalComponent/>}></Route>

                    <Route path="/orders" element={<ListOrderComponent />}></Route>
                    <Route path="/add-order" element={<OrderComponent />}></Route>
                    <Route path="/edit-order/:id" element={<OrderComponent />}></Route>


                    <Route path="/login" element={<LoginComponent />}></Route>
                </Routes>
                <FooterComponent/>
            </BrowserRouter>

        </>
    )
}

export default App

/***



 <Route path="/add-order" element={<OrderComponent />}></Route>
 <Route path="/edit-order/:id" element={<OrderComponent />}></Route>
 <Route path="/orders" element={<ListOrderComponent />}></Route>
 */