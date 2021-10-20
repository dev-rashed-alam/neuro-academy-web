import React, { Component } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { FormContext } from "../../Context/FormContext";
import TextComponent from "../../CommonComponents/Form/TextComponent";
import SelectComponent from "../../CommonComponents/Form/SelectComponent";
import CheckboxComponent from "../../CommonComponents/Form/CheckboxComponent";
import RadioButtonComponent from "../../CommonComponents/Form/RadioButtonComponent";
import DatePickerComponent from "../../CommonComponents/Form/DatePickerComponent";
import EditorComponent from "../../CommonComponents/Form/EditorComponent";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

export default class FormElements extends Component {
  static contextType = FormContext;

  componentDidMount() {
    console.log(this.context);
  }

  render() {
    const { gender, agree } = this.context.inputData;
    return (
      <>
        <Card>
          <Card.Body>
            <Row className="align-items-center">
              <Col>
                <TextComponent
                  label="Name"
                  placeHolder="Enter Your Name"
                  name="name"
                  required={false}
                  type="text"
                  controlId="name"
                />
              </Col>
              <Col>
                <SelectComponent
                  label="Select One"
                  placeholder="Select One"
                  multiple={false}
                  options={options}
                  name="color"
                />
              </Col>
              <Col>
                <CheckboxComponent
                  label="Check me Out"
                  name="agree"
                  value={agree}
                  controlId="agree"
                />
              </Col>
              <Col>
                <RadioButtonComponent
                  label="Male"
                  name="gender"
                  checked={gender === "Male"}
                  selectedValue="Male"
                  controlId="Male"
                />
                <RadioButtonComponent
                  label="Female"
                  name="gender"
                  checked={gender === "Female"}
                  selectedValue="Female"
                  controlId="Female"
                />
              </Col>
            </Row>
            <Row>
              <Col md={3}>
                <DatePickerComponent
                  label="Select Date"
                  placeHolder="dd-mm-yyyy"
                />
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <EditorComponent name="textArea" />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </>
    );
  }
}
