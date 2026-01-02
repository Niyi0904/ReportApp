// components/emails/OnboardEmail.tsx
import React from 'react';
import { Html, Head, Preview, Body, Container, Section, Text, Button } from '@react-email/components';

interface OnboardEmailProps {
  firstName: string;
  email: string;
  resetLink: string;
}

export const OnboardEmail = ({ firstName, email, resetLink }: OnboardEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to Discipleship Management System</Preview>
    <Body style={{ backgroundColor: '#F3E8E1', margin: 0, padding: 0, fontFamily: 'Arial, sans-serif' }}>
      <Container style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '24px', maxWidth: '600px', margin: '40px auto', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <Section>
          <Text style={{ fontSize: '20px', fontWeight: 'bold', color: '#7A4A2E', marginBottom: '12px' }}>
            Hello {firstName},
          </Text>

          <Text style={{ fontSize: '16px', color: '#333', lineHeight: '1.5', marginBottom: '24px' }}>
            Welcome to our Discipleship Management System! Please set your password by clicking the button below to start your journey.
          </Text>

          <Button
            style={{
              backgroundColor: '#7A4A2E',
              color: '#F3E8E1',
              textDecoration: 'none',
              borderRadius: '6px',
              display: 'inline-block',
              fontWeight: 'bold',
              padding: '12px 24px',
            }}
            href={resetLink}
          >
            Set Your Password
          </Button>

          <Text style={{ fontSize: '14px', color: '#7A4A2E', marginTop: '32px' }}>
            God bless your ministry!
          </Text>

          <Text style={{ fontSize: '12px', color: '#999', marginTop: '16px' }}>
            If you did not expect this email, you can safely ignore it.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);
