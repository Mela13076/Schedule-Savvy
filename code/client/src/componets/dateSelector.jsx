import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the CSS

function DatepickerForm() {
  const [selectedDate, setSelectedDate] = useState(null);

  // Handle date selection
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Selected Date:', selectedDate);
    // Perform your form submission logic here
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="date">
        <Form.Label>Date:</Form.Label>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="MM/dd/yyyy" // Customize date format if needed
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default DatepickerForm;
