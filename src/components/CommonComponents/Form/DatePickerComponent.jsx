import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Form } from "react-bootstrap";
import { dateFormat } from "../../Config/Constant";

const DatePickerComponent = ({
  controlId,
  label,
  placeHolder,
  clearAble,
  minDate,
  maxDate,
}) => {
  const [startDate, setStartDate] = useState(null);
  return (
    <Form.Group controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <div style={{ display: "block", overflow: "hidden" }}>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          placeholderText={placeHolder}
          isClearable={clearAble}
          minDate={minDate}
          maxDate={maxDate}
          dateFormat={dateFormat}
        />
      </div>
    </Form.Group>
  );
};

export default DatePickerComponent;
