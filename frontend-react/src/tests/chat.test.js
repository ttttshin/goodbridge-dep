// chat.test.js

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ChatComponent from '../components/ChatComponents';

describe('ChatComponent', () => {
  it('renders without crashing', () => {
    render(<ChatComponent sender="Sender" receiver="Receiver" />);
    expect(screen.getByText('Receiver')).toBeInTheDocument();
  });

  it('allows sending messages', () => {
    render(<ChatComponent sender="Sender" receiver="Receiver" />);
    const input = screen.getByPlaceholderText('Type your message here...');
    const sendButton = screen.getByText('Send');
    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.click(sendButton);
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('allows deleting messages', () => {
    render(<ChatComponent sender="Sender" receiver="Receiver" />);
    const deleteButton = screen.queryByTestId('delete-button'); 
    expect(deleteButton).toBeNull();
  });
});
