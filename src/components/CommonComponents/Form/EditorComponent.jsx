import React, { useContext } from "react";
import "../../../assets/styles/Form.scss";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FormContext } from "../../Context/FormContext";
import { Form } from "react-bootstrap";
import { capitalizeFirstLetter } from "../../Config/HelperUtils";

const EditorComponent = ({ name, controlId, label, value, errors }) => {
  const { handleChange } = useContext(FormContext);
  const functionForOnChange = (data) => {
    handleChange({
      target: { name: name, value: data, type: "text" },
    });
  };

  let dataValue = value ? value : "";
  return (
    <Form.Group controlId={controlId} key={`editor_box_${name}`}>
      <Form.Label>{label}</Form.Label>
      <CKEditor
        key={controlId}
        editor={ClassicEditor}
        data={dataValue}
        onChange={(event, editor) => {
          functionForOnChange(editor.getData());
        }}
        onReady={(editor) => {
          editor.setData(dataValue);
        }}
      />
      {errors && Object.keys(errors).length > 0 && errors[name] && (
        <Form.Control.Feedback type="invalid">
          {capitalizeFirstLetter(errors[name])}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default EditorComponent;
