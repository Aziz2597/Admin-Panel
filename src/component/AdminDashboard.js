import React from 'react';
import HeaderManagement from './HeaderManagement';
import HeroSectionEditor from './HeroSectionEditor';
import AboutUsSnapshotManagement from './AboutUsSnapshotManagement';
import TestimonialsManagement from './TestimonialsManagement';
import StatisticsManagement from './StatisticsManagement';
import PortfolioManagement from './PortfolioManagement';
import EventsManagement from './EventsManagement';
import ContactInfoManagement from './ContactInfoManagement';
import FooterManagement from './FooterManagement';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <HeaderManagement />
      <HeroSectionEditor />
      <AboutUsSnapshotManagement />
      <TestimonialsManagement />
      <StatisticsManagement />
      <PortfolioManagement />
      <EventsManagement />
      <ContactInfoManagement />
      <FooterManagement />
    </div>
  );
};

export default AdminDashboard;
