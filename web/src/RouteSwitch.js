import React, { lazy, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import PrivateRoute from './components/organisms/PrivateRoute';

const Nav = lazy(() => import('components/organisms/Nav'));
const Main = lazy(() => import('pages/main'));
const LoginBase = lazy(() => import('pages/login'));
const Login = lazy(() => import('pages/login/login'));
const FindPassword = lazy(() => import('pages/login/findPassword'));
const RegisterBase = lazy(() => import('pages/register'));
const Register = lazy(() => import('pages/register/register'));
const RegisterByEmail = lazy(() => import('pages/register/registerByEmail'));
const MyBase = lazy(() => import('pages/my'));
const Profile = lazy(() => import('pages/my/profile'));
const ResignMembership = lazy(() => import('pages/my/resignMembership'));
const PaymentHistory = lazy(() => import('pages/my/paymentHistory'));
const DonationHistory = lazy(() => import('pages/my/donationHistory'));
const OrganizationBase = lazy(() => import('pages/organization'));
const OrganizationList = lazy(() => import('pages/organization/organizationList'));
const OrganizationDetail = lazy(() => import('pages/organization/organizationDetail'));
const CampaignList = lazy(() => import('pages/campaign/campaignList'));
const CampaignBase = lazy(() => import('pages/campaign'));
const CampaignDetail = lazy(() => import('pages/campaign/campaignDetail'));
const NewsBase = lazy(() => import('pages/news'));
const NewsList = lazy(() => import('pages/news/newsList'));
const NewsDetail = lazy(() => import('pages/news/newsDetail'));
const DonationBase = lazy(() => import('pages/donation'));
const Donation = lazy(() => import('pages/donation/donation'));
const DonationPayment = lazy(() => import('pages/donation/donationPayment'));
const Faq = lazy(() => import('pages/faq'));
const Redirect = lazy(() => import('pages/redirect'));

const RouteSwitch = () => {
  const [option, setOption] = useState({ title: '', back: false });
  return (
    <Container maxWidth="sm" sx={{ height: '100%' }} disableGutters>
      <div className="col max-height max-width">
        <Nav option={option} />
        <div className="flex-1 max-width">
          <Routes>
            <Route path="/" element={<Main setOption={setOption} />} />
            <Route path="/login" element={<LoginBase setOption={setOption} />}>
              <Route path="" element={<Login setOption={setOption} />} />
            </Route>
            <Route path="/register" element={<RegisterBase setOption={setOption} />}>
              <Route path="" element={<Register setOption={setOption} />} />
              <Route path=":type" element={<RegisterByEmail setOption={setOption} />} />
            </Route>
            <Route path="/find-password" element={<FindPassword setOption={setOption} />} />
            <Route path="/organization" element={<OrganizationBase setOption={setOption} />}>
              <Route path="" element={<OrganizationList setOption={setOption} />} />
              <Route path=":id" element={<OrganizationDetail setOption={setOption} />} />
            </Route>
            <Route path="/campaign" element={<CampaignBase setOption={setOption} />}>
              <Route path="" element={<CampaignList setOption={setOption} />} />
              <Route path=":id" element={<CampaignDetail setOption={setOption} />} />
            </Route>
            <Route path="/news" element={<NewsBase setOption={setOption} />}>
              <Route path="list" element={<NewsList setOption={setOption} />} />
              <Route path=":id" element={<NewsDetail setOption={setOption} />} />
            </Route>
            <Route path="/donation" element={<DonationBase setOption={setOption} />}>
              <Route path="" element={<PrivateRoute outlet={<Donation setOption={setOption} />} path="/login" />} />
              <Route path="payment" element={<DonationPayment setOption={setOption} />} />
            </Route>
            <Route path="/faq" element={<Faq setOption={setOption} />} />
            <Route path="/my" element={<MyBase setOption={setOption} />}>
              <Route path="profile" element={<Profile setOption={setOption} />} />
              <Route path="resign-membership" element={<ResignMembership setOption={setOption} />} />
              <Route path="paymentHistory" element={<PaymentHistory setOption={setOption} />} />
              <Route path="donationHistory" element={<DonationHistory setOption={setOption} />} />
            </Route>
            <Route path="/redirect" element={<Redirect />} />
          </Routes>
        </div>
      </div>
    </Container>
  );
};

export default RouteSwitch;
