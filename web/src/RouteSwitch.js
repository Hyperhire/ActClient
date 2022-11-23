import React, { lazy, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import PrivateRoute from './components/organisms/PrivateRoute';
const Nav = lazy(() => import('components/organisms/Nav'));
const Main = lazy(() => import('pages/main'));
const Login = lazy(() => import('pages/login'));
const LoginMain = lazy(() => import('pages/login/main'));
const FindPassword = lazy(() => import('pages/login/findPassword'));
const Register = lazy(() => import('pages/login/register'));
const My = lazy(() => import('pages/my'));
const Profile = lazy(() => import('pages/my/profile'));
const PaymentHistory = lazy(() => import('pages/my/paymentHistory'));
const DonationHistory = lazy(() => import('pages/my/donationHistory'));
const Organization = lazy(() => import('pages/organization'));
const OrganizationList = lazy(() => import('pages/organization/organizationList'));
const OrganizationDetail = lazy(() => import('pages/organization/organizationDetail'));
const OrganizationDonation = lazy(() => import('pages/organization/organizationDonation'));
const OrganizationPayment = lazy(() => import('pages/organization/organizationPayment'));
const Disclosure = lazy(() => import('pages/disclosure'));
const Faq = lazy(() => import('pages/faq'));

const RouteSwitch = () => {
  const [option, setOption] = useState({ title: '', back: false });
  return (
    <Container maxWidth="sm" sx={{ height: '100%' }} disableGutters>
      <div className="col max-height max-width">
        <Nav option={option} />
        <div className="flex-1 max-width">
          <Routes>
            <Route path="/" element={<Main setOption={setOption} />} />
            <Route path="/login" element={<Login setOption={setOption} />}>
              <Route path="" element={<LoginMain setOption={setOption} />} />
              <Route path="find-password" element={<FindPassword setOption={setOption} />} />
              <Route path="register" element={<Register setOption={setOption} />} />
            </Route>
            <Route path="/organization" element={<Organization setOption={setOption} />}>
              <Route path="" element={<OrganizationList setOption={setOption} />} />
              <Route path=":id" element={<OrganizationDetail setOption={setOption} />} />
              <Route path=":id/donation" element={<PrivateRoute outlet={<OrganizationDonation setOption={setOption} />} path="/login" />} />
              <Route path=":id/payment" element={<OrganizationPayment setOption={setOption} />} />
            </Route>
            <Route path="/disclosure" element={<Disclosure setOption={setOption} />} />
            <Route path="/faq" element={<PrivateRoute outlet={<Faq setOption={setOption} />} path="/login" />} />
            {/*<Route path="/my" element={<PrivateRoute outlet={<My setOption={setOption} />} path="/login" />}>*/}
            {/*  <Route path="profile" element={<Profile setOption={setOption} />} />*/}
            {/*  <Route path="paymentHistory" element={<PaymentHistory setOption={setOption} />} />*/}
            {/*  <Route path="donationHistory" element={<DonationHistory setOption={setOption} />} />*/}
            {/*</Route>*/}
            <Route path="/my" element={<My setOption={setOption} />}>
              <Route path="profile" element={<Profile setOption={setOption} />} />
              <Route path="paymentHistory" element={<PaymentHistory setOption={setOption} />} />
              <Route path="donationHistory" element={<DonationHistory setOption={setOption} />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Container>
  );
};

export default RouteSwitch;
