import React, {createContext, useState} from "react";

export const FormContext = createContext();

function FormContextProvider(props) {
    const [values, setValues] = useState({});

    const [youtubeVideos, setYoutubeVideos] = useState([]);

    const addNewYoutubeVideos = (videos) => {
        setYoutubeVideos((prevState => ([...prevState, ...videos])))
    }

    const [tutorials, setTutorials] = useState([]);

    const [videos, setVideos] = useState([]);

    const findTutorialById = (identifier) => {
        return tutorials.find(item => item.identifier === identifier);
    }

    const addNewTutorial = (identifier, video, serial, title) => {
        let existingVideos = tutorials.filter(item => item.identifier !== identifier)
        let allVideos = [...existingVideos];
        let newTutorial = {};
        newTutorial["identifier"] = identifier;
        newTutorial["video"] = video;
        newTutorial["serial"] = serial;
        newTutorial["title"] = title;
        allVideos.push(newTutorial)
        setTutorials(allVideos)
    }

    const removeTutorial = (identifier) => {
        let allVideos = tutorials.filter(item => item.identifier !== identifier)
        setTutorials(allVideos);
        removeDynamicVideos(identifier);
    }

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

    const handleChange = (evt) => {
        const {name, value: newValue, type} = evt.target;
        const value = type === "number" ? +newValue : newValue;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleBlur = (evt) => {
        evt.preventDefault();
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
    };

    const resetContext = () => {
        setValues({});
        setVideos([]);
        setTutorials([]);
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
                removeDynamicVideos,
                tutorials,
                addNewTutorial,
                removeTutorial,
                findTutorialById,
                youtubeVideos,
                addNewYoutubeVideos
            }}
        >
            {props.children}
        </FormContext.Provider>
    );
}

export default FormContextProvider;
