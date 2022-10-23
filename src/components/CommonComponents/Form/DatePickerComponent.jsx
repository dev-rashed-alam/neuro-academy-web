import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Form } from "react-bootstrap";
import { dateFormat } from "../../Config/Constant";
import { FormContext } from "../../Context/FormContext";

const DatePickerComponent = ({
  controlId,
  label,
  placeHolder,
  clearAble,
  minDate,
  maxDate,
  value,
  name,
}) => {
  const { handleChange } = useContext(FormContext);
  const [startDate, setStartDate] = useState(null);
  useEffect(() => {
    if (value) {
      let date = new Date(value);
      setStartDate(date);
    }
  }, [value]);

  const handleDatePicker = (date) => {
    setStartDate(date);
    handleChange({ target: { name: name, value: date.toDateString() } });
  };

  return (
    <Form.Group controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <div style={{ display: "block", overflow: "hidden" }}>
        <DatePicker
          selected={startDate}
          onChange={(date) => handleDatePicker(date)}
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
