import React, { lazy, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/organisms/PrivateRoute';
const Nav = lazy(() => import('components/organisms/Nav'));
const Main = lazy(() => import('pages/main'));
const Login = lazy(() => import('pages/login'));
const LoginMain = lazy(() => import('pages/login/main'));
const FindPassword = lazy(() => import('pages/login/findPassword'));
const Register = lazy(() => import('pages/login/register'));
const Organization = lazy(() => import('pages/organization'));
const OrganizationList = lazy(() => import('pages/organization/organizationList'));
const OrganizationDetail = lazy(() => import('pages/organization/organizationDetail'));
const OrganizationDonation = lazy(() => import('pages/organization/organizationDonation'));
const OrganizationPayment = lazy(() => import('pages/organization/organizationPayment'));
const Disclosure = lazy(() => import('pages/disclosure'));
const Faq = lazy(() => import('pages/faq'));
const Footer = lazy(() => import('components/organisms/Footer'));

const RouteSwitch = () => {
  const [option, setOption] = useState({ title: '', back: false });
  return (
    <>
      <Nav option={option} />
      <Routes>
        <Route path="/" element={<Main setOption={setOption} />} />
        <Route path="/login" element={<Login setOption={setOption} />}>
          <Route path="" element={<LoginMain setOption={setOption} />} />
          <Route path="find-password" element={<FindPassword setOption={setOption} />} />
          <Route path="register" element={<Register setOption={setOption} />} />
        </Route>
        <Route path="/organization" element={<Organization setOption={setOption} />}>
          <Route path="" element={<OrganizationList setOption={setOption} />} />
          <Route path="/organization/:id" element={<OrganizationDetail setOption={setOption} />} />
          <Route path="/organization/:id/donation" element={<OrganizationDonation setOption={setOption} />} />
          <Route path="/organization/:id/payment" element={<OrganizationPayment setOption={setOption} />} />
        </Route>
        <Route path="/disclosure" element={<Disclosure setOption={setOption} />} />
        {/*<Route path="/faq" element={<Faq setOption={setOption} />} />*/}
        <Route path="/faq" element={<PrivateRoute outlet={<Faq setOption={setOption} />} path="/login" />} />
      </Routes>
      <Footer />
    </>
  );
};

export default RouteSwitch;
