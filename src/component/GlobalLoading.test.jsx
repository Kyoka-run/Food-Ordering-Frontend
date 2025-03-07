import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import GlobalLoading from './GlobalLoading';

describe('GlobalLoading Component', () => {
  it('renders loading indicator when loading prop is true', () => {
    render(<GlobalLoading loading={true} />);
    
    // The Backdrop should be in the document
    const backdrop = document.querySelector('.MuiBackdrop-root');
    expect(backdrop).toBeInTheDocument();
    
    // CircularProgress should be in the document
    const circularProgress = document.querySelector('.MuiCircularProgress-root');
    expect(circularProgress).toBeInTheDocument();
  });

  it('does not render anything when loading prop is false', () => {
    render(<GlobalLoading loading={false} />);
    
    // No Backdrop or CircularProgress should be rendered
    const backdrop = document.querySelector('.MuiBackdrop-root');
    expect(backdrop).not.toBeInTheDocument();
    
    const circularProgress = document.querySelector('.MuiCircularProgress-root');
    expect(circularProgress).not.toBeInTheDocument();
  });

  it('does not render anything when loading prop is undefined', () => {
    render(<GlobalLoading />);
    
    // No Backdrop or CircularProgress should be rendered
    const backdrop = document.querySelector('.MuiBackdrop-root');
    expect(backdrop).not.toBeInTheDocument();
    
    const circularProgress = document.querySelector('.MuiCircularProgress-root');
    expect(circularProgress).not.toBeInTheDocument();
  });

  it('renders with correct z-index for proper layering', () => {
    render(<GlobalLoading loading={true} />);
    
    // The Backdrop should have the expected z-index
    const backdrop = document.querySelector('.MuiBackdrop-root');
    const backdropStyle = window.getComputedStyle(backdrop);
    
    // Check if z-index is a number and is greater than 0
    // The exact value might vary based on the MUI implementation
    expect(parseInt(backdropStyle.zIndex, 10)).toBeGreaterThan(0);
  });
});