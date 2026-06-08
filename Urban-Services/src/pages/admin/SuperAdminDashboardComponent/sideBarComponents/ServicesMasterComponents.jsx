// src/pages/admin/admindashboardcomponent/ServicesMasterComponents.jsx
import React from 'react';
import FuturePlaceholder from '../FuturePlaceholder';
import ManageServices from './add-services/ManageServices';
import ServicesList from './ServicesList';

export const AllServicesList = () => (
 <ServicesList/>
);

export const AddNewService = () => (
  // <FuturePlaceholder title="Create Custom Service Form" subtitle="Insert custom dynamic forms for custom user service catalogs." />
  <ManageServices />
);