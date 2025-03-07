import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Auth from './Auth';

// Mock child components
vi.mock('./Login', () => ({
  default: () => <div data-testid="login-component">Login Component</div>
}));

vi.mock('./Register', () => ({
  default: () => <div data-testid="register-component">Register Component</div>
}));

vi.mock('./ResetPasswordForm', () => ({
  default: () => <div data-testid="reset-password-form">Reset Password Form</div>
}));

vi.mock('./ResetPasswordRequest', () => ({
  default: () => <div data-testid="reset-password-request">Reset Password Request</div>
}));

// Directly render with MemoryRouter instead of using renderWithProviders
const renderAuth = (initialPath) => {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="/account/login" element={<Auth handleClose={vi.fn()} />} />
        <Route path="/account/register" element={<Auth handleClose={vi.fn()} />} />
        <Route path="/account/reset-password-request" element={<Auth handleClose={vi.fn()} />} />
        <Route path="/account/reset-password" element={<Auth handleClose={vi.fn()} />} />
        <Route path="/" element={<div>Home</div>} />
      </Routes>
    </MemoryRouter>
  );
};

describe('Auth component', () => {
  it('shows login component on login path', () => {
    renderAuth('/account/login');
    expect(screen.getByTestId('login-component')).toBeInTheDocument();
  });

  it('shows register component on register path', () => {
    renderAuth('/account/register');
    expect(screen.getByTestId('register-component')).toBeInTheDocument();
  });

  it('shows reset password request component on correct path', () => {
    renderAuth('/account/reset-password-request');
    expect(screen.getByTestId('reset-password-request')).toBeInTheDocument();
  });

  it('shows reset password form component on correct path', () => {
    renderAuth('/account/reset-password');
    expect(screen.getByTestId('reset-password-form')).toBeInTheDocument();
  });

  it('shows nothing on other paths', () => {
    renderAuth('/');
    expect(screen.queryByTestId('login-component')).not.toBeInTheDocument();
    expect(screen.queryByTestId('register-component')).not.toBeInTheDocument();
    expect(screen.queryByTestId('reset-password-request')).not.toBeInTheDocument();
    expect(screen.queryByTestId('reset-password-form')).not.toBeInTheDocument();
  });
});