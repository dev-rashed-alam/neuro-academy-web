import React, {useContext} from "react";
import "../../../assets/styles/Form.scss";
import {FormContext} from "../../Context/FormContext";
import Select from "react-select";
import {Form} from "react-bootstrap";
import {generateRandomNumber} from "../../Config/HelperUtils";

const customStyles = {
    menu: (base) => ({
        ...base,
        marginTop: "2px",
    }),
    option: (base) => ({
        // ...base,
        padding: "8px 12px",
        "&:hover": {
            backgroundColor: "#000000 !important",
        },
    }),
};

const SelectComponent = ({
                             label,
                             name,
                             required,
                             type,
                             placeHolder,
                             controlId,
                             readOnly,
                             value,
                             loading,
                             options,
                             disable,
                             multiple,
                         }) => {
    const {handleChange} = useContext(FormContext);

    const functionForHandleChange = (val) => {
        if (Array.isArray(val)) {
            let selectedValue = [];
            for (let item of val) {
                selectedValue.push(item.value);
            }
            handleChange({target: {name: name, value: selectedValue}});
        } else if (val) {
            handleChange({target: {name: name, value: val.value}});
        } else {
            handleChange({target: {name: name, value: ""}});
        }
    };

    return (
        <Form.Group controlId={controlId} key={generateRandomNumber()}>
            <Form.Label>{label}</Form.Label>
            <Select
                styles={customStyles}
                options={options}
                defaultValue={value}
                placeholder={placeHolder}
                className="basic-single"
                classNamePrefix="select"
                isDisabled={disable}
                isLoading={loading}
                isMulti={multiple}
                onChange={(val) => functionForHandleChange(val)}
                isClearable={true}
                isSearchable={true}
                name={name}
            />
        </Form.Group>
    );
};

export default SelectComponent;
