import React, {createContext, useMemo, useState} from "react";

export const FormContext = createContext();

function FormContextProvider(props) {
    const [values, setValues] = useState({});

    const [youtubeVideos, setYoutubeVideos] = useState([]);

    const [videos, setVideos] = useState([]);

    const [files, setFiles] = useState([]);

    const [tutorials, setTutorials] = useState([]);

    const [attachments, setAttachments] = useState([]);

    const [loader, setLoader] = useState(false);

    const addNewYoutubeVideos = (newVideos) => {
        setYoutubeVideos((prevState) => [...prevState, ...newVideos]);
    };

    const findTutorialById = (identifier) => {
        return tutorials.find((item) => item.identifier === identifier);
    };

    const findAttachmentById = (identifier) => {
        return attachments.find((item) => item.identifier === identifier);
    };

    const addNewTutorial = (identifier, video, description, title) => {
        let existingVideos = tutorials.filter(
            (item) => item.identifier !== identifier
        );
        let allVideos = [...existingVideos];
        let newTutorial = {};
        newTutorial["identifier"] = identifier;
        newTutorial["video"] = video;
        newTutorial["description"] = description;
        newTutorial["title"] = title;
        allVideos.push(newTutorial);
        setTutorials(allVideos);
    };

    const addNewAttachment = (identifier, file, description, title) => {
        let existingAttachments = attachments.filter(
            (item) => item.identifier !== identifier
        );
        let allFiles = [...existingAttachments];
        let newFiles = {};
        newFiles["identifier"] = identifier;
        newFiles["file"] = file;
        newFiles["description"] = description;
        newFiles["title"] = title;
        allFiles.push(newFiles);
        setAttachments(allFiles);
    };

    const removeTutorial = (identifier) => {
        let allVideos = tutorials.filter((item) => item.identifier !== identifier);
        setTutorials(allVideos);
        removeDynamicVideos(identifier);
    };

    const removeAttachment = (identifier) => {
        let allFiles = attachments.filter((item) => item.identifier !== identifier);
        setAttachments(allFiles);
        removeDynamicAttachment(identifier);
    };

    const addDynamicVideos = () => {
        let totalVideos = videos.length;
        setVideos((prevState) => [...prevState, totalVideos + 1]);
    };

    const addDynamicFiles = () => {
        let totalFiles = files.length;
        setFiles((prevState) => [...prevState, totalFiles + 1]);
    };

    const removeDynamicVideos = (identifier) => {
        let listOfVideos = [...videos];
        const index = listOfVideos.indexOf(identifier);
        if (index !== -1) {
            listOfVideos.splice(index, 1);
        }
        setVideos(listOfVideos);
    };

    const removeDynamicAttachment = (identifier) => {
        let listOfFiles = [...files];
        const index = listOfFiles.indexOf(identifier);
        if (index !== -1) {
            listOfFiles.splice(index, 1);
        }
        setFiles(listOfFiles);
    };

    const handleChange = async (evt) => {
        const {name, value: newValue, type} = evt.target;
        const value = type === "number" ? +newValue : newValue;
        await setValues({
            ...values,
            [name]: value,
        });
    };

    const handleFiles = (evt) => {
        const {name, files} = evt.target;
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

    const storeValues = useMemo(() => ({
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
        setYoutubeVideos,
        setVideos,
        findAttachmentById,
        removeAttachment,
        addNewAttachment,
        addDynamicFiles,
        files,
        attachments,
        setFiles
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [values, loader, videos, tutorials, youtubeVideos, files, attachments]);

    return (
        <FormContext.Provider
            value={storeValues}
        >
            {props.children}
        </FormContext.Provider>
    );
}

export default FormContextProvider;
