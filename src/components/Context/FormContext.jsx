import React, { createContext, useState } from "react";

export const FormContext = createContext();

function FormContextProvider(props) {
  const [values, setValues] = useState({});

  const [youtubeVideos, setYoutubeVideos] = useState([]);

  const [videos, setVideos] = useState([]);

  const [tutorials, setTutorials] = useState([]);

  const [loader, setLoader] = useState(false);

  const addNewYoutubeVideos = (newVideos) => {
    setYoutubeVideos((prevState) => [...prevState, ...newVideos]);
  };

  const findTutorialById = (identifier) => {
    return tutorials.find((item) => item.identifier === identifier);
  };

  const addNewTutorial = (identifier, video, serial, title) => {
    let existingVideos = tutorials.filter(
      (item) => item.identifier !== identifier
    );
    let allVideos = [...existingVideos];
    let newTutorial = {};
    newTutorial["identifier"] = identifier;
    newTutorial["video"] = video;
    newTutorial["serial"] = serial;
    newTutorial["title"] = title;
    allVideos.push(newTutorial);
    setTutorials(allVideos);
  };

  const removeTutorial = (identifier) => {
    let allVideos = tutorials.filter((item) => item.identifier !== identifier);
    setTutorials(allVideos);
    removeDynamicVideos(identifier);
  };

  const addDynamicVideos = () => {
    let totalVideos = videos.length;
    setVideos((prevState) => [...prevState, totalVideos + 1]);
  };

  const removeDynamicVideos = (identifier) => {
    let listOfVideos = [...videos];
    const index = listOfVideos.indexOf(identifier);
    if (index !== -1) {
      listOfVideos.splice(index, 1);
    }
    setVideos(listOfVideos);
  };

  const handleChange = async (evt) => {
    console.log("----------", evt);
    const { name, value: newValue, type } = evt.target;
    const value = type === "number" ? +newValue : newValue;
    await setValues({
      ...values,
      [name]: value,
    });
  };

  const handleFiles = (evt) => {
    const { name, files } = evt.target;
    const formData = new FormData();
    formData.append("myFile", files[0], files[0].name);
    setValues({
      ...values,
      [name]: files[0],
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
        setInputData: setValues,
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
        addNewYoutubeVideos,
        loader,
        setLoader,
        handleFiles,
      }}
    >
      {props.children}
    </FormContext.Provider>
  );
}

export default FormContextProvider;
