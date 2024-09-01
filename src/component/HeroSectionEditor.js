import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HeroSectionEditor = () => {
  const [background, setBackground] = useState('');
  const [headline, setHeadline] = useState('');
  const [subHeadline, setSubHeadline] = useState('');
  const [ctaText, setCtaText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasData, setHasData] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchHeroSection = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/hero-section');
        if (response.data) {
          const { background, headline, subHeadline, ctaText } = response.data;
          setBackground(background || '');
          setHeadline(headline || '');
          setSubHeadline(subHeadline || '');
          setCtaText(ctaText || '');
          setHasData(true);
        } else {
          setBackground('');
          setHeadline('');
          setSubHeadline('');
          setCtaText('');
          setHasData(false);
        }
      } catch (err) {
        console.error('Error fetching hero section data:', err);
        setError('Failed to fetch hero section data.');
      }
    };

    fetchHeroSection();
  }, []);

  const handleSaveChanges = async () => {
    setIsLoading(true);
    setError('');
    try {
      await axios.post('http://localhost:5001/api/hero-section', {
        background,
        headline,
        subHeadline,
        ctaText
      });
      alert('Hero section updated successfully!');
      setHasData(true);
      setIsAdding(false);
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating hero section data:', err);
      setError('Failed to update hero section.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddHeroSection = () => {
    setIsAdding(true);
  };

  const handleEditHeroSection = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setIsEditing(false);
    // Optionally reset form fields to previous values or defaults here
  };

  const isVideo = background.endsWith('.mp4') || background.endsWith('.webm') || background.endsWith('.ogv');
  const isImage = background.endsWith('.jpg') || background.endsWith('.jpeg') || background.endsWith('.png');

  return (
    <div style={{ padding: '20px' }}>
      <h2>Hero Section Editor</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!hasData && !isAdding && (
        <div>
          <button type="button" onClick={handleAddHeroSection}>
            Add Hero Section
          </button>
        </div>
      )}

      {isAdding && (
        <div>
          <div>
            <label>Background Image/Video URL:</label>
            <input
              type="text"
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              placeholder="Enter URL of background image/video"
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label>Headline:</label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="Enter headline"
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label>Sub-headline:</label>
            <input
              type="text"
              value={subHeadline}
              onChange={(e) => setSubHeadline(e.target.value)}
              placeholder="Enter sub-headline"
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label>CTA Button Text:</label>
            <input
              type="text"
              value={ctaText}
              onChange={(e) => setCtaText(e.target.value)}
              placeholder="Enter CTA button text"
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <button type="button" onClick={handleSaveChanges} disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
            <button type="button" onClick={handleCancel} style={{ marginLeft: '10px' }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {hasData && !isEditing && (
        <div>
          <button type="button" onClick={handleEditHeroSection}>
            Edit
          </button>
        </div>
      )}

      {(hasData && isEditing) || (isAdding && !hasData) ? (
        <div>
          <div>
            <label>Background Image/Video URL:</label>
            <input
              type="text"
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              placeholder="Enter URL of background image/video"
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label>Headline:</label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="Enter headline"
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label>Sub-headline:</label>
            <input
              type="text"
              value={subHeadline}
              onChange={(e) => setSubHeadline(e.target.value)}
              placeholder="Enter sub-headline"
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label>CTA Button Text:</label>
            <input
              type="text"
              value={ctaText}
              onChange={(e) => setCtaText(e.target.value)}
              placeholder="Enter CTA button text"
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <button type="button" onClick={handleSaveChanges} disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
            <button type="button" onClick={handleCancel} style={{ marginLeft: '10px' }}>
              Cancel
            </button>
          </div>
        </div>
      ) : null}

      {hasData && !isAdding && (
        <>
          <hr />
          <h3>Preview</h3>
          <div style={{
            position: 'relative',
            width: '100%',
            height: '80vh',
            backgroundColor: 'white',
            color: '#fff',
            textAlign: 'center',
            borderRadius: '8px',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            {isVideo ? (
              <video
                loop
                muted
                autoPlay
                playsInline
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}
              >
                <source src={background} type="video/mp4" />
                <source src={background.replace('.mp4', '.webm')} type="video/webm" />
                <source src={background.replace('.mp4', '.ogv')} type="video/ogv" />
                Your browser does not support the video tag.
              </video>
            ) : isImage ? (
              <img
                src={background}
                alt="Background"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}
              />
            ) : (
              <div style={{ width: '100%', height: '100%', backgroundColor: '#333' }}></div>
            )}
            <div style={{
              position: 'relative',
              zIndex: 1,
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
              color: '#fff',
            }}>
              <h1 style={{ margin: '0 0 10px 0' }}>{headline}</h1>
              <h2 style={{ margin: '0 0 20px 0' }}>{subHeadline}</h2>
              <button style={{
                padding: '10px 20px',
                fontSize: '16px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '4px'
              }}>{ctaText}</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HeroSectionEditor;
