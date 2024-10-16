import React, {useEffect, useState} from 'react';
import {Form, Button, Row, Col, Container} from 'react-bootstrap';
import {FaRegTrashAlt} from "react-icons/fa";
import {IoIosAddCircle} from "react-icons/io";
import {v4 as uuidv4} from 'uuid';
import "../../../assets/styles/Mcq.scss"

const uId = uuidv4();
const CourseMCQ = ({onSave, errors, setErrors, isReadOnly = false, dataSet = null}) => {
    const [questionInfo, setQuestionInfo] = useState({
        title: "",
        description: ""
    });
    const [questionList, setQuestionList] = useState([
        {questionText: "", options: [{text: "", isCorrect: false}], uId: uId}
    ]);

    useEffect(() => {
        if (dataSet !== null) {
            setQuestionInfo({
                title: dataSet.mcq.title,
                description: dataSet.mcq.description
            })
            if (dataSet?.studentResponse?.responses) {
                let tmpList = [];
                for (let item of dataSet?.studentResponse?.responses) {
                    const selectedQuestion = dataSet.mcq.questions.find(question => question.id === item.questionId)
                    const tmpOptions = selectedQuestion.options.map(option => ({
                        ...option,
                        selectedByUser: [...item.selectedOptionIds].includes(option.id)
                    }))
                    tmpList.push({
                        questionText: selectedQuestion.questionText,
                        options: tmpOptions,
                        uId: item.id
                    })
                }
                setQuestionList(tmpList)
            }
        }
    }, [dataSet]);

    const handleOptionChange = (e, optionIdx, questionId) => {
        let value = e.target.value;
        let modifiedQuestions = questionList.map(item => {
            if (item.uId === questionId) {
                item.options[optionIdx].text = value
            }
            return item
        })
        setQuestionList(modifiedQuestions)
    };

    const handleIsCorrect = (questionId, optionIdx, e) => {
        let isChecked = e.target.checked
        let modifiedQuestions = questionList.map(item => {
            if (item.uId === questionId) {
                item.options[optionIdx].isCorrect = isChecked
            }
            return item
        })
        setQuestionList(modifiedQuestions)
    };

    const addQuestion = () => {
        let newId = uuidv4();
        setQuestionList(prev => [...prev, {questionText: "", options: [{text: "", isCorrect: false}], uId: newId}])
    }

    const RemoveOptions = (options, questionId) => {
        let modifiedQuestions = questionList.map(item => {
            if (item.uId === questionId) {
                item.options = options
            }
            return item
        })
        setQuestionList(modifiedQuestions)
    }

    const addQuestionText = (e, questionId) => {
        let value = e.target.value
        let modifiedQuestions = questionList.map(item => {
            if (item.uId === questionId) {
                item.questionText = value
            }
            return item
        })
        setQuestionList(modifiedQuestions)
    }

    const addOption = (questionId) => {
        let modifiedQuestions = questionList.map(item => {
            if (item.uId === questionId) {
                item.options = [...item.options, {text: "", isCorrect: false}]
            }
            return item
        })
        setQuestionList(modifiedQuestions)
    }

    const renderQuestionList = () => {
        return questionList?.map(item => {
            return (
                <div className="question-container" key={`question_${item.uId}`}>
                    <Form.Group controlId="formQuestion" className="mb-4">
                        <Form.Control
                            type="text"
                            placeholder="Untitled Question"
                            className="form-style"
                            value={item.questionText}
                            onChange={(e) => addQuestionText(e, item.uId)}
                            readOnly={isReadOnly}
                        />
                        {errors?.[`question_${item.uId}`] && <Form.Control.Feedback type="invalid">
                            {errors[`question_${item.uId}`]}
                        </Form.Control.Feedback>}
                    </Form.Group>
                    {item.options.map((option, index) => (
                        <Row key={`option_${index}`} className="align-items-center mb-3 mcq-question">
                            <Col xs="auto">
                                <Form.Check
                                    type="checkbox"
                                    name={`question_option_${index}`}
                                    checked={option.isCorrect}
                                    onChange={(e) => handleIsCorrect(item.uId, index, e)}
                                    disabled={isReadOnly}
                                />
                            </Col>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder={`Option ${index + 1}`}
                                    className={`form-style ${option?.selectedByUser ? 'highlight-border' : ''}`}
                                    value={option.text}
                                    onChange={(e) => handleOptionChange(e, index, item.uId)}
                                    readOnly={isReadOnly}
                                />
                            </Col>
                            {!isReadOnly && <Col xs="auto">
                                {item.options.length > 1 && <Button
                                    variant="outline-light"
                                    className="delete-option-btn"
                                    size="sm"
                                    onClick={() => {
                                        let newOptions = item.options.filter((_, optIndex) => optIndex !== index)
                                        RemoveOptions(newOptions, item.uId)
                                    }}
                                >
                                    <FaRegTrashAlt/>
                                </Button>}
                                <Button
                                    variant="outline-light"
                                    className="delete-option-btn"
                                    size="sm"
                                    onClick={() => addOption(item.uId)}
                                >
                                    <IoIosAddCircle/>
                                </Button>
                            </Col>}
                        </Row>
                    ))}
                    {errors?.[`option_${item.uId}`] && <Form.Control.Feedback type="invalid">
                        {errors[`option_${item.uId}`]}
                    </Form.Control.Feedback>}
                </div>
            )
        })
    }

    const isValid = () => {
        const tmpErrors = {};
        if (!questionInfo?.title) {
            tmpErrors['title'] = 'Title is required'
        }
        if (!questionInfo?.description) {
            tmpErrors['description'] = 'Description is required'
        }

        for (let item of questionList) {
            if (!item?.questionText) {
                tmpErrors[`question_${item.uId}`] = 'Question is required'
            }
            const isOptionExist = item.options.filter(option => option.text !== '')
            if (isOptionExist.length === 0) {
                tmpErrors[`option_${item.uId}`] = 'Option is required'
            } else {
                let isQuestionAnswerExist = item.options.filter(option => option.isCorrect === true)
                if (isQuestionAnswerExist.length === 0) {
                    tmpErrors[`option_${item.uId}`] = 'At least one answer is required'
                }
            }
        }
        setErrors(tmpErrors)
        return Object.keys(tmpErrors).length === 0
    }

    const handleDraft = () => {
        if (isValid()) {
            onSave({...questionInfo, questions: questionList})
        }
    }

    console.log(isReadOnly)

    return (
        <Container className="form-container mt-4 mb-4">
            <Form>
                <Form.Group controlId="formTitle" className="mb-4">
                    <Form.Control
                        readOnly={isReadOnly}
                        type="text"
                        placeholder="Untitled form"
                        className="form-style mb-2"
                        value={questionInfo.title}
                        onChange={(e) => {
                            e.preventDefault();
                            let value = e.target.value
                            setQuestionInfo(prev => ({
                                ...prev,
                                title: value
                            }))
                        }}
                    />
                    {errors?.title && <Form.Control.Feedback type="invalid">
                        {errors.title}
                    </Form.Control.Feedback>}
                    <Form.Control
                        readOnly={isReadOnly}
                        as="textarea"
                        placeholder="Form description"
                        className="form-style"
                        value={questionInfo.description}
                        onChange={(e) => {
                            e.preventDefault();
                            let value = e.target.value
                            setQuestionInfo(prev => ({
                                ...prev,
                                description: value
                            }))
                        }}
                    />
                    {errors?.description && <Form.Control.Feedback type="invalid">
                        {errors.description}
                    </Form.Control.Feedback>}
                </Form.Group>
                {renderQuestionList()}
                {!isReadOnly && <Col className="text-center">
                    <Button className="btn btn-primary" onClick={addQuestion}>
                        Add question
                    </Button>
                    &nbsp;
                    <Button className="btn btn-primary" onClick={handleDraft}>
                        Draft question
                    </Button>
                </Col>}
            </Form>
        </Container>
    );
};

export default CourseMCQ;
