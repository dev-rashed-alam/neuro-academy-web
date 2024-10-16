import React from "react";
import {ModalComponent} from "../../CommonComponents/ModalComponent";
import CourseMCQ from "./CourseMCQ";

const McqSubmissionModal = ({
                                mcq,
                                triggerModal,
                                modalShow,
                                studentResponse
                            }) => {

    const closeModal = () => {
        triggerModal();
    };

    return (
        <ModalComponent
            show={modalShow}
            onHide={closeModal}
            size="lg"
            title={`${studentResponse.userId.firstName} ${studentResponse.userId.lastName}`}
            scrollable={false}
            buttons={[]}
        >
            <CourseMCQ isReadOnly={true} dataSet={{mcq, studentResponse}}/>
        </ModalComponent>
    );
};

export default McqSubmissionModal;
