import React, {createContext, useState} from "react";

export const FormContext = createContext();

function FormContextProvider(props) {
    const [values, setValues] = useState({});

    const [errors, setErrors] = useState({});

    const [touched, setTouched] = useState({});

    const [videos, setVideos] = useState([]);

    const addDynamicVideos = () => {
        let totalVideos = videos.length;
        setVideos((prevState => [...prevState, totalVideos + 1]));
    }

    const removeDynamicVideos = (identifier) => {
        let listOfVideos = [...videos]
        const index = listOfVideos.indexOf(identifier);
        if (index !== -1) {
            listOfVideos.splice(index, 1);
        }
        setVideos(listOfVideos);
    }

    // change event handler
    const handleChange = (evt) => {
        const {name, value: newValue, type} = evt.target;

        console.log(name, newValue);

        // keep number fields as numbers
        const value = type === "number" ? +newValue : newValue;

        // save field values
        setValues({
            ...values,
            [name]: value,
        });

        // was the field modified
        setTouched({
            ...touched,
            [name]: true,
        });
    };

    const handleBlur = (evt) => {
        const {name, value} = evt.target;

        // // remove whatever error was there previously
        // const { [name]: removedError, ...rest } = errors;
        //
        // // check for a new error
        // const error = validate[name](value);
        //
        // // // validate the field if the value has been touched
        // setErrors({
        //   ...rest,
        //   ...(error && { [name]: touched[name] && error }),
        // });
    };

    // form submit handler
    const handleSubmit = (evt) => {
        evt.preventDefault();

        // // validate the form
        // const formValidation = Object.keys(values).reduce(
        //   (acc, key) => {
        //     const newError = validate[key](values[key]);
        //     const newTouched = { [key]: true };
        //     return {
        //       errors: {
        //         ...acc.errors,
        //         ...(newError && { [key]: newError }),
        //       },
        //       touched: {
        //         ...acc.touched,
        //         ...newTouched,
        //       },
        //     };
        //   },
        //   {
        //     errors: { ...errors },
        //     touched: { ...touched },
        //   }
        // );
        // setErrors(formValidation.errors);
        // setTouched(formValidation.touched);
        //
        // if (
        //   !Object.values(formValidation.errors).length && // errors object is empty
        //   Object.values(formValidation.touched).length ===
        //     Object.values(values).length && // all fields were touched
        //   Object.values(formValidation.touched).every((t) => t === true) // every touched field is true
        // ) {
        //   alert(JSON.stringify(values, null, 2));
        // }
    };

    const resetContext = () => {
        setValues({});
        setErrors({});
        setTouched({});
        setVideos([]);
    };

    return (
        <FormContext.Provider
            value={{
                inputData: values,
                handleChange,
                handleBlur,
                handleSubmit,
                resetContext,
                videos,
                addDynamicVideos,
                removeDynamicVideos
            }}
        >
            {props.children}
        </FormContext.Provider>
    );
}

export default FormContextProvider;
