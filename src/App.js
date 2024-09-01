// src/App.js
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HeaderManagement from './component/HeaderManagement';
import HeroSectionEditor from './component/HeroSectionEditor';
import AboutUsSnapshotManagement from './component/AboutUsSnapshotManagement';
import TestimonialsManagement from './component/TestimonialsManagement';
import StatisticsManagement from './component/StatisticsManagement';
import PortfolioManagement from './component/PortfolioManagement';
import EventsManagement from './component/EventsManagement';
import ContactInfoManagement from './component/ContactInfoManagement';
import FooterManagement from './component/FooterManagement';
import KeyFeaturesManagement from './component/KeyFeaturesManagement';
import './styles/app.css';

function HomePage() {
  return (
    <div className="homepage">
      <h1>Admin Dashboard Components</h1>
      <ul>
        <li><Link to="/header-management" target="_blank">Header Management</Link></li>
        <li><Link to="/hero-section-editor" target="_blank">Hero Section Editor</Link></li>
        <li><Link to="/key-features-management" target="_blank">Key Features Management</Link></li>
        <li><Link to="/about-us-snapshot-management" target="_blank">About Us Snapshot Management</Link></li>
        <li><Link to="/testimonials-management" target="_blank">Testimonials Management</Link></li>
        <li><Link to="/statistics-management" target="_blank">Statistics Management</Link></li>
        <li><Link to="/portfolio-management" target="_blank">Portfolio Management</Link></li>
        <li><Link to="/events-management" target="_blank">Events Management</Link></li>
        <li><Link to="/contact-info-management" target="_blank">Contact Info Management</Link></li>
        <li><Link to="/footer-management" target="_blank">Footer Management</Link></li>
      </ul>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/header-management" element={<HeaderManagement />} />
        <Route path="/hero-section-editor" element={<HeroSectionEditor />} />
        <Route path="/key-features-management" element={<KeyFeaturesManagement />} />
        <Route path="/about-us-snapshot-management" element={<AboutUsSnapshotManagement />} />
        <Route path="/testimonials-management" element={<TestimonialsManagement />} />
        <Route path="/statistics-management" element={<StatisticsManagement />} />
        <Route path="/portfolio-management" element={<PortfolioManagement />} />
        <Route path="/events-management" element={<EventsManagement />} />
        <Route path="/contact-info-management" element={<ContactInfoManagement />} />
        <Route path="/footer-management" element={<FooterManagement />} />
      </Routes>
    </div>
  );
}

export default App;
