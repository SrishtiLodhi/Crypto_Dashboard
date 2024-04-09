import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  display: flex;
  align-items: center;
  padding: 10px;
  color: white;
`;

const FooterItem = styled.div`
  display: flex; /* Added to allow alignment of image and text */
  align-items: center; /* Align image and text vertically */
  text-align: center;
  font-family: 'Space Grotesk';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 10px;
  letter-spacing: 0.02em;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #969696;
`;

const Divider = styled.span`
  margin: 0 10px;
  color: #4B4B4B;
`;

const Chip = styled.span`
  padding: 4px 6px;
  background: #141414;
  border-radius: 4px;
font-family: 'Space Grotesk';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 10px;
letter-spacing: 0.02em;
font-feature-settings: 'pnum' on, 'lnum' on;
color: #969696;

  &:hover {
    background-color: #4B4B4B;
  }
`;

const EllipseSVG = (
  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="4" cy="4" r="4" fill="#00E388" />
  </svg>
);

const IconWithText = styled.div`
  display: flex;
  align-items: center;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterItem>
        <IconWithText>
          {EllipseSVG}
          <span style={{ marginLeft: '5px' }}>Stable Connection</span>
        </IconWithText>
      </FooterItem>
      <Divider>|</Divider>
      <FooterItem>
        <IconWithText>
        {EllipseSVG}
          <span style={{ marginLeft: '5px' }}>Response Time Name holder (xxxms)</span>
        </IconWithText>
      </FooterItem>
      <Divider>|</Divider>
      <FooterItem>XX,XXX TPS</FooterItem>
      <Divider>|</Divider>
      <FooterItem>Average Gas Prices:
      <Chip style={{ marginLeft: '5px', marginRight: '5px' }}>SPOT: X,XXXX€</Chip>
      <Chip>PERP: X,XXXX€</Chip>
      </FooterItem>
    </FooterContainer>
  );
};

export default Footer;
