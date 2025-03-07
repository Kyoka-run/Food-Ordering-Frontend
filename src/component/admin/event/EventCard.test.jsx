import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import EventCard from './EventCard';

describe('EventCard component', () => {
  const mockEvent = {
    eventId: 'event123',
    name: 'Summer Festival',
    description: 'Annual summer celebration',
    location: 'City Park',
    image: 'festival.jpg',
    startTime: '2023-07-01T10:00:00',
    endTime: '2023-07-01T18:00:00'
  };

  it('renders event details correctly', () => {
    render(<EventCard item={mockEvent} />);
    
    expect(screen.getByTestId(`event-card-${mockEvent.eventId}`)).toBeInTheDocument();
    expect(screen.getByTestId(`event-name-${mockEvent.eventId}`)).toHaveTextContent(mockEvent.name);
    expect(screen.getByTestId(`event-description-${mockEvent.eventId}`)).toHaveTextContent(mockEvent.description);
    expect(screen.getByTestId(`event-location-${mockEvent.eventId}`)).toHaveTextContent(mockEvent.location);
  });

  it('does not show admin buttons when isAdmin is false', () => {
    render(<EventCard item={mockEvent} isAdmin={false} />);
    
    expect(screen.queryByTestId(`edit-button-${mockEvent.eventId}`)).not.toBeInTheDocument();
    expect(screen.queryByTestId(`delete-button-${mockEvent.eventId}`)).not.toBeInTheDocument();
  });

  it('shows admin buttons when isAdmin is true', () => {
    render(
      <EventCard 
        item={mockEvent} 
        isAdmin={true} 
        onEdit={() => {}} 
        onDelete={() => {}}
      />
    );
    
    expect(screen.getByTestId(`edit-button-${mockEvent.eventId}`)).toBeInTheDocument();
    expect(screen.getByTestId(`delete-button-${mockEvent.eventId}`)).toBeInTheDocument();
  });

  it('calls onEdit with event when edit button is clicked', () => {
    const onEditMock = vi.fn();
    
    render(
      <EventCard 
        item={mockEvent} 
        isAdmin={true} 
        onEdit={onEditMock} 
        onDelete={() => {}}
      />
    );
    
    fireEvent.click(screen.getByTestId(`edit-button-${mockEvent.eventId}`));
    expect(onEditMock).toHaveBeenCalledWith(mockEvent);
  });

  it('calls onDelete with eventId when delete button is clicked', () => {
    const onDeleteMock = vi.fn();
    
    render(
      <EventCard 
        item={mockEvent} 
        isAdmin={true} 
        onEdit={() => {}} 
        onDelete={onDeleteMock}
      />
    );
    
    fireEvent.click(screen.getByTestId(`delete-button-${mockEvent.eventId}`));
    expect(onDeleteMock).toHaveBeenCalledWith(mockEvent.eventId);
  });
});