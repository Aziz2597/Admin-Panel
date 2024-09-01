import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Section = styled.div`
  flex: 1;
  min-width: 200px;
  margin: 10px;
`;

const Title = styled.h4`
  margin-bottom: 10px;
  font-size: 1.2em;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  margin-bottom: 8px;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 10px;
  font-size: 1.5em;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Section>
        <Title>Contact Us</Title>
        <p>Phone: +123 456 7890</p>
        <p>Email: contact@example.com</p>
        <p>Address: 123 Main Street, Anytown, USA</p>
      </Section>
      <Section>
        <Title>Quick Links</Title>
        <List>
          <ListItem><Link to="/about">About Us</Link></ListItem>
          <ListItem><Link to="/services">Services</Link></ListItem>
          <ListItem><Link to="/contact">Contact Us</Link></ListItem>
          <ListItem><Link to="/privacy">Privacy Policy</Link></ListItem>
        </List>
      </Section>
      <Section>
        <Title>Follow Us</Title>
        <SocialIcons>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        </SocialIcons>
      </Section>
      <Section>
        <Title>Recent Posts</Title>
        <List>
          <ListItem><Link to="/post/1">Post Title 1</Link></ListItem>
          <ListItem><Link to="/post/2">Post Title 2</Link></ListItem>
          <ListItem><Link to="/post/3">Post Title 3</Link></ListItem>
        </List>
      </Section>
      <Section style={{ textAlign: 'center' }}>
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </Section>
    </FooterContainer>
  );
};

export default Footer;
