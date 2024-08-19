import React, { useState } from 'react';

const FooterManagement = () => {
  const [footer, setFooter] = useState({
    additionalLinks: ['Privacy Policy', 'Terms of Service'],
    socialMediaLinks: {
      facebook: 'https://facebook.com/example',
      twitter: 'https://twitter.com/example',
      linkedin: 'https://linkedin.com/company/example',
    },
    newsletterSignup: true,
  });

  const handleLinkChange = (index, value) => {
    const updatedLinks = [...footer.additionalLinks];
    updatedLinks[index] = value;
    setFooter({ ...footer, additionalLinks: updatedLinks });
  };

  const handleSocialMediaChange = (platform, value) => {
    setFooter({
      ...footer,
      socialMediaLinks: { ...footer.socialMediaLinks, [platform]: value }
    });
  };

  const handleNewsletterChange = () => {
    setFooter({ ...footer, newsletterSignup: !footer.newsletterSignup });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to the server
    console.log('Submitted Footer Data:', footer);
    alert('Footer updated successfully!');
  };

  return (
    <div className="footer-management">
      <h2>Footer Management</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Additional Links:</label>
          {footer.additionalLinks.map((link, index) => (
            <div key={index}>
              <input
                type="text"
                value={link}
                onChange={(e) => handleLinkChange(index, e.target.value)}
                placeholder={`Link ${index + 1}`}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => setFooter({ ...footer, additionalLinks: [...footer.additionalLinks, ''] })}
          >
            Add Link
          </button>
        </div>

        <div className="form-group">
          <label>Social Media Links:</label>
          {Object.keys(footer.socialMediaLinks).map((platform) => (
            <div key={platform}>
              <label>{platform.charAt(0).toUpperCase() + platform.slice(1)} URL:</label>
              <input
                type="url"
                value={footer.socialMediaLinks[platform]}
                onChange={(e) => handleSocialMediaChange(platform, e.target.value)}
                placeholder={`Enter ${platform} URL`}
              />
            </div>
          ))}
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={footer.newsletterSignup}
              onChange={handleNewsletterChange}
            />
            Enable Newsletter Signup
          </label>
        </div>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default FooterManagement;
