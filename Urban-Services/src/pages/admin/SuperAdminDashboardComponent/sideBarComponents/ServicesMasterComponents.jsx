// src/pages/admin/admindashboardcomponent/ServicesMasterComponents.jsx
import React from 'react';
import FuturePlaceholder from '../FuturePlaceholder';
import ManageServices from '../../ManageServices';

export const AllServicesList = () => (
  <FuturePlaceholder title="Services Master Grid" subtitle="Manage pricing, hourly base rates, and active system services." />
);

export const AddNewService = () => (
  // <FuturePlaceholder title="Create Custom Service Form" subtitle="Insert custom dynamic forms for custom user service catalogs." />
  <ManageServices />
);