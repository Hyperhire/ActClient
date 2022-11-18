import React, { lazy, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
const Nav = lazy(() => import('components/organisms/Nav'));
const Main = lazy(() => import('pages/main'));
const Header = lazy(() => import('components/organisms/Header'));
const Login = lazy(() => import('pages/login'));
const FindPassword = lazy(() => import('pages/login/findPassword'));
const Organization = lazy(() => import('pages/organization'));
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
        <Route element={<Header title={option.title} />}>
          <Route path="/login" element={<Login setOption={setOption} />} />
          <Route path="/login/find-password" element={<FindPassword setOption={setOption} />} />
          <Route path="/organization" element={<Organization setOption={setOption} />} />
          <Route path="/disclosure" element={<Disclosure setOption={setOption} />} />
          <Route path="/faq" element={<Faq setOption={setOption} />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default RouteSwitch;
