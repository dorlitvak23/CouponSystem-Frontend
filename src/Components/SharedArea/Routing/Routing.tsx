import { Route, Routes } from "react-router-dom";
import About from "../../AboutArea/About/About";
import { CompanyList } from "../../AdminArea/CompanyList/CompanyList";
import Login from "../../AuthArea/Login/Login";
import Home from "../../HomeArea/Home/Home";
import Main from "../../LayoutArea/Main/Main";
import Menu from "../../LayoutArea/Menu/Menu";
import AddCompany from "../../AdminArea/AddCompany/AddCompany";
import GetCompany from "../../AdminArea/GetCompany/GetCompany";
import RemoveCompany from "../../AdminArea/DeleteCompany/DeleteCompany";
import UpdateCompany from "../../AdminArea/UpdateCompany/UpdateCompany";
import GetAllCustomers from "../../AdminArea/GetAllCustomers/GetAllCustomers";
import AddCustomer from "../../AdminArea/AddCustomer/AddCustomer";
import RemoveCustomer from "../../AdminArea/DeleteCustomer/DeleteCustomer";
import GetCustomer from "../../AdminArea/GetOneCustomer/GetOneCustomer";
import UpdateCustomer from "../../AdminArea/UpdateCustomer/UpdateCustomer";
import GetAllCompanyCoupons from "../../UserArea/CompanyArea/GetAllCompanyCoupons/GetAllCompanyCoupons";
import AddCoupon from "../../UserArea/CompanyArea/AddCoupon/AddCoupon";
import GetCompanyInfo from "../../UserArea/CompanyArea/GetCompanyInfo/GetCompanyInfo";
import RemoveCoupon from "../../UserArea/CompanyArea/RemoveCoupon/RemoveCoupon";
import UpdateCoupon from "../../UserArea/CompanyArea/UpdateCoupon/UpdateCoupon";
import GetAllCoupons from "../../UserArea/CustomerArea/GetAllCoupons/GetAllCoupons";
import GetAllCustomerCoupons from "../../UserArea/CustomerArea/GetAllCustomerCoupons/GetAllCustomerCoupons";
import GetCustomerInfo from "../../UserArea/CustomerArea/GetCustomerInfo/GetCustomerInfo";


function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />

            <Route path="/admin/companies" element={<CompanyList />} />
            <Route path="/admin/customers" element={<GetAllCustomers />} />
            <Route path="/companies/add" element={<AddCompany />} />
            <Route path="/customers/add" element={<AddCustomer />} />
            <Route path="/companies/view/:id" element={<GetCompany />} />
            <Route path="/customers/view/:id" element={<GetCustomer />} />
            <Route path="/companies/remove/:id" element={<RemoveCompany />} />
            <Route path="/customers/remove/:id" element={<RemoveCustomer />} />
            <Route path="/companies/update/:id" element={<UpdateCompany />} />
            <Route path="/customers/update/:id" element={<UpdateCustomer />} />

            <Route path="/company/coupons" element={<GetAllCompanyCoupons />} />
            <Route path="/company/coupon/add" element={<AddCoupon />} />
            <Route path="/company/coupon/update/:id" element={<UpdateCoupon />} />
            <Route path="/company/coupon/delete/:id" element={<RemoveCoupon />} />
            <Route path="/company/view" element={<GetCompanyInfo />} />

            <Route path="/customer/view" element={<GetCustomerInfo />} />
            <Route path="/customer/coupons" element={<GetAllCoupons />} />
            <Route path="/customer/coupons/owned" element={<GetAllCustomerCoupons />} />






        </Routes>
    );
}

export default Routing;
