import React, { useContext } from "react";
import "../../../assets/styles/Form.scss";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FormContext } from "../../Context/FormContext";
import { Form } from "react-bootstrap";

const EditorComponent = ({ name, controlId, label, value }) => {
  const { handleChange } = useContext(FormContext);
  const functionForOnChange = (data) => {
    handleChange({
      target: { name: name, value: data, type: "text" },
    });
  };

  return (
    <Form.Group controlId={controlId} key={`editor_box_${name}`}>
      <Form.Label>{label}</Form.Label>
      <CKEditor
        key={controlId}
        editor={ClassicEditor}
        data={value}
        onChange={(event, editor) => {
          functionForOnChange(editor.getData());
        }}
      />
    </Form.Group>
  );
};

export default EditorComponent;
