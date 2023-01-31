import React, { lazy, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from 'components/organisms/PrivateRoute';
const Login = lazy(() => import('pages/login'));
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
      <Routes>
        <Route path="/" element={<PrivateRoute outlet={<Navigate to="/member" />} path="/login" />} />
        <Route path="/login" element={<Login />} />

        <Route path="/member" element={<PrivateRoute outlet={<MemberBase />} path="/" />}>
          <Route path=":type" element={<MemberList />}>
            <Route path=":id" element={<MemberDetail />} />
          </Route>
        </Route>

        <Route path="/organization" element={<PrivateRoute outlet={<OrganizationBase />} path="/" />}>
          <Route path=":type" element={<OrganizationList />} />
          <Route path=":type/:id" element={<OrganizationDetail />} />
        </Route>

        <Route path="/payment" element={<PrivateRoute outlet={<PaymentBase />} path="/" />}>
          <Route path=":type" element={<PaymentList />}>
            <Route path=":id" element={<PaymentDetail />} />
          </Route>
        </Route>
        <Route path="/donation" element={<PrivateRoute outlet={<DonationBase />} path="/" />}>
          <Route path=":type" element={<DonationList />}>
            <Route path=":id" element={<DonationDetail />} />
          </Route>
        </Route>
        <Route path="/operation" element={<PrivateRoute outlet={<OperationBase />} path="/" />}>
          <Route path=":type" element={<OperationList />} />
          <Route path=":type/:id" element={<OperationDetail />} />
        </Route>
      </Routes>
    </div>
  );
};

export default RouteSwitch;
