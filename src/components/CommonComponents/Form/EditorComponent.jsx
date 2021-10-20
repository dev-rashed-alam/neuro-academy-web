import React, { useContext } from "react";
import "../../../assets/styles/Form.scss";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FormContext } from "../../Context/FormContext";

const EditorComponent = ({ name, placeHolder }) => {
  const { handleChange } = useContext(FormContext);
  const functionForOnChange = (data) => {
    handleChange({
      target: { name: name, value: data, type: "text" },
    });
  };
  return (
    <CKEditor
      editor={ClassicEditor}
      data={placeHolder}
      onChange={(event, editor) => {
        functionForOnChange(editor.getData());
      }}
    />
  );
};

export default EditorComponent;
