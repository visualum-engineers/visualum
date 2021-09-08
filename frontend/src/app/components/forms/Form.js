import React from "react";
import SignUpOptions from './SignUpOptions';
import ManualSignUp from './ManualSignUp';
import StudentVerifyEmail from './StudentVerifyEmail';
import StudentClassCode from './StudentClassCode';
import TeacherExposureToUs from './TeacherExposureToUs';
//import SubscriptionType from './SubscriptionType';
import PaymentPage from './PaymentPage';
import Enterprise from './Enterprise';

export default function Form(props) {
    const { stage, type } = props;
    if (type === 'student') {
        switch (stage) {
            case 1:
                return <SignUpOptions {...props} />
            case 2:
                return <ManualSignUp {...props} />
            case 3:
                return <StudentVerifyEmail {...props} />
            case 4:
                return <StudentClassCode {...props} />
            default:
                return <SignUpOptions {...props} />
        }
    }
    else if (type === 'teacher') {
        switch (stage) {
            case 1:
                return <SignUpOptions {...props} />
            case 2:
                return <ManualSignUp {...props} />
            case 3:
                return <TeacherExposureToUs {...props} />
            case 4:
                return <Enterprise {...props} />
            case 5:
                return <PaymentPage {...props} />
            default:
                return <SignUpOptions {...props} />
        }
    }
    return <SignUpOptions {...props} />
}