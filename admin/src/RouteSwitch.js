import React, { lazy, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from 'components/organisms/PrivateRoute';
import Header from './components/organisms/Header';
const Main = lazy(() => import('pages/main'));
const MemberBase = lazy(() => import('pages/member'));
const MemberList = lazy(() => import('pages/member/memberList'));
const MemberDetail = lazy(() => import('pages/member/memberDetail'));
const OrganizationBase = lazy(() => import('pages/organization'));
const OrganizationList = lazy(() => import('pages/organization/organizationList'));
const OrganizationDetail = lazy(() => import('pages/organization/organizationDetail'));
const PaymentBase = lazy(() => import('pages/payment'));
const PaymentList = lazy(() => import('pages/payment/paymentList'));
const PaymentDetail = lazy(() => import('pages/payment/paymentDetail'));
const DonationBase = lazy(() => import('pages/donation'));
const DonationList = lazy(() => import('pages/donation/donationList'));
const DonationDetail = lazy(() => import('pages/donation/donationDetail'));
const OperationBase = lazy(() => import('pages/operation'));
const OperationList = lazy(() => import('pages/operation/operationList'));
const OperationDetail = lazy(() => import('pages/operation/operationDetail'));
const RouteSwitch = () => {
  return (
    <div className="col max-height max-width">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/member" element={<MemberBase />}>
          <Route path=":type" element={<MemberList />}>
            <Route path=":id" element={<MemberDetail />} />
          </Route>
        </Route>
        <Route path="/organization" element={<OrganizationBase />}>
          <Route path=":type" element={<OrganizationList />}>
            <Route path=":id" element={<OrganizationDetail />} />
          </Route>
        </Route>
        <Route path="/payment" element={<PaymentBase />}>
          <Route path=":type" element={<PaymentList />}>
            <Route path=":id" element={<PaymentDetail />} />
          </Route>
        </Route>
        <Route path="/donation" element={<DonationBase />}>
          <Route path=":type" element={<DonationList />}>
            <Route path=":id" element={<DonationDetail />} />
          </Route>
        </Route>
        <Route path="/operation" element={<OperationBase />}>
          <Route path=":type" element={<OperationList />}>
            <Route path=":id" element={<OperationDetail />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default RouteSwitch;
