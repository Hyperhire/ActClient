import React, { lazy, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import PrivateRoute from './components/organisms/PrivateRoute';
import { MEMBER_TYPE } from './constants/constant';

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
const ProfileInformation = lazy(() => import('pages/my/profileInformation'));
const OrgInformation = lazy(() => import('pages/my/orgInformation'));
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
const NftDetail = lazy(() => import('pages/my/nftDetail'));
const Payment = lazy(() => import('pages/payment'));
const OrgBase = lazy(() => import('pages/org'));
const SettlementHistory = lazy(() => import('pages/org/settlementHistory'));
const Verify = lazy(() => import('pages/login/verify'));
const NewsPost = lazy(() => import('pages/news/newsPost'));
const CampaignPost = lazy(() => import('pages/campaign/campaignPost'));

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
              <Route path="post" element={<PrivateRoute role={MEMBER_TYPE.ORGANIZATION} outlet={<CampaignPost setOption={setOption} />} path="/login" />} />
            </Route>
            <Route path="/news" element={<NewsBase setOption={setOption} />}>
              <Route path="list" element={<NewsList setOption={setOption} />} />
              <Route path=":id" element={<NewsDetail setOption={setOption} />} />
              <Route path="post" element={<PrivateRoute role={MEMBER_TYPE.ORGANIZATION} outlet={<NewsPost setOption={setOption} />} path="/login" />} />
            </Route>
            <Route path="/donation" element={<DonationBase setOption={setOption} />}>
              <Route path="" element={<PrivateRoute outlet={<Donation setOption={setOption} />} path="/login" />} />
              <Route path="payment" element={<DonationPayment setOption={setOption} />} />
            </Route>
            <Route path="/faq" element={<Faq setOption={setOption} />} />
            <Route path="/my" element={<PrivateRoute role={MEMBER_TYPE.INDIVIDUAL} outlet={<MyBase setOption={setOption} />} path="/login" />}>
              <Route path="profile" element={<Profile setOption={setOption} />} />
              <Route path="profile-information" element={<ProfileInformation setOption={setOption} />} />
              <Route path="paymentHistory" element={<PaymentHistory setOption={setOption} />} />
              <Route path="donationHistory" element={<DonationHistory setOption={setOption} />} />
            </Route>
            <Route path="/org" element={<PrivateRoute role={MEMBER_TYPE.ORGANIZATION} outlet={<OrgBase setOption={setOption} />} path="/login" />}>
              <Route path="profile" element={<Profile setOption={setOption} />} />
              <Route path="settlementHistory" element={<SettlementHistory setOption={setOption} />} />
              <Route path="organization-information" element={<OrgInformation setOption={setOption} />} />
              <Route path="donationHistory" element={<DonationHistory setOption={setOption} />} />
            </Route>
            <Route path="/redirect" element={<Redirect />} />
            <Route path="/payment/:orderId/:status" element={<Payment />} />
            <Route path="/verify" element={<PrivateRoute outlet={<Verify setOption={setOption} />} path="/login" />} />
            <Route path="/resign-membership" element={<PrivateRoute outlet={<ResignMembership setOption={setOption} />} path="/login" />} />
            <Route path="/nft" element={<PrivateRoute outlet={<NftDetail setOption={setOption} />} path="/login" />} />
          </Routes>
        </div>
      </div>
    </Container>
  );
};

export default RouteSwitch;
