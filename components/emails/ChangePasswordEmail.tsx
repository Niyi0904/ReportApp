// components/emails/ChangePasswordEmail.tsx
import React from 'react';
import { Html, Head, Preview, Body, Container, Section, Text, Button } from '@react-email/components';

export interface ChangePasswordEmailProps {
    email: string
  firstName: string;
  resetLink: string;
}

export const ChangePasswordEmail = ({ firstName, email, resetLink }: ChangePasswordEmailProps) => (
  <Html>
    <Head />
    <Preview>Reset Your Password</Preview>

    <Body style={{ backgroundColor: '#F3E8E1', margin: 0, padding: 0, fontFamily: 'Arial, sans-serif' }}>
      <Container
        style={{
          backgroundColor: '#fff',
          borderRadius: '8px',
          padding: '24px',
          maxWidth: '600px',
          margin: '40px auto',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        }}
      >
        <Section>
          <Text style={{ fontSize: '20px', fontWeight: 'bold', color: '#7A4A2E', marginBottom: '12px' }}>
            Hello {firstName},
          </Text>

          <Text style={{ fontSize: '16px', color: '#333', lineHeight: '1.5', marginBottom: '24px' }}>
            We received a request to reset your password. Click the button below to set a new password for your account.
          </Text>

          <Button
            href={resetLink}
            style={{
              backgroundColor: '#7A4A2E',
              color: '#F3E8E1',
              textDecoration: 'none',
              borderRadius: '6px',
              display: 'inline-block',
              fontWeight: 'bold',
              padding: '12px 24px',
            }}
          >
            Reset Password
          </Button>

          <Text style={{ fontSize: '14px', color: '#7A4A2E', marginTop: '32px' }}>
            If you didn’t request a password reset, you can safely ignore this email.
          </Text>

          <Text style={{ fontSize: '12px', color: '#999', marginTop: '16px' }}>
            This link will expire in a few hours for security purposes.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);
