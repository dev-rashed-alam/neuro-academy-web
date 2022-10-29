import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../assets/styles/Form.scss";
import { Form } from "react-bootstrap";
import { dateFormat } from "../../Config/Constant";
import { FormContext } from "../../Context/FormContext";
import { capitalizeFirstLetter } from "../../Config/HelperUtils";

const DatePickerComponent = ({
  controlId,
  label,
  placeHolder,
  clearAble,
  minDate,
  maxDate,
  value,
  name,
  errors,
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
    <Form.Group
      controlId={controlId}
      className={
        errors && Object.keys(errors).length > 0 && errors[name]
          ? "field-error"
          : ""
      }
    >
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
      {errors && Object.keys(errors).length > 0 && errors[name] && (
        <Form.Control.Feedback type="invalid">
          {capitalizeFirstLetter(errors[name])}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default DatePickerComponent;
