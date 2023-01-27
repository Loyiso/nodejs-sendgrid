import * as Yup from 'yup';

const EmailSchema = Yup.object().shape({
    from: Yup.string().required(),
    subject: Yup.string().required(),
    text: Yup.string().required(),
});

export default EmailSchema; 