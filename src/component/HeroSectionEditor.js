import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HeroSectionEditor = () => {
  const [background, setBackground] = useState('');
  const [headline, setHeadline] = useState('');
  const [subHeadline, setSubHeadline] = useState('');
  const [ctaText, setCtaText] = useState('');

  useEffect(() => {
    // Fetch current hero section data
    axios.get('http://localhost:5001/api/hero-section')
      .then(response => {
        const { background, headline, subHeadline, ctaText } = response.data;
        setBackground(background || '');
        setHeadline(headline || '');
        setSubHeadline(subHeadline || '');
        setCtaText(ctaText || '');
      })
      .catch(err => console.error('Error fetching hero section data:', err));
  }, []);

  const handleSaveChanges = () => {
    // Post updated hero section data
    axios.post('http://localhost:5001/api/hero-section', {
      background,
      headline,
      subHeadline,
      ctaText
    })
    .then(response => {
      alert('Hero section updated successfully!');
    })
    .catch(err => console.error('Error updating hero section data:', err));
  };

  return (
    <div>
      <h2>Hero Section Editor</h2>
      <div>
        <label>Background Image/Video URL:</label>
        <input type="text" value={background} onChange={(e) => setBackground(e.target.value)} />
      </div>
      <div>
        <label>Headline:</label>
        <input type="text" value={headline} onChange={(e) => setHeadline(e.target.value)} />
      </div>
      <div>
        <label>Sub-headline:</label>
        <input type="text" value={subHeadline} onChange={(e) => setSubHeadline(e.target.value)} />
      </div>
      <div>
        <label>CTA Button Text:</label>
        <input type="text" value={ctaText} onChange={(e) => setCtaText(e.target.value)} />
      </div>
      <div>
        <button type="button" onClick={handleSaveChanges}>Save Changes</button>
      </div>
    </div>
  );
};

export default HeroSectionEditor;
