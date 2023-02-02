import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import ActButton from '../atoms/ActButton';
import ActRadioGroup from '../atoms/ActRadioGroup';
import ActEditor from './Editor';
import { request } from '../../utils/axiosClient';
import { api } from '../../repository';
import ActInput from '../atoms/ActInput';
import { faqYup } from '../../utils/yupSchema';

const FaqPost = () => {
  const navigate = useNavigate();
  const answerEditorRef = useRef(null);

  const formOptions = { mode: 'onChange', resolver: yupResolver(faqYup) };
  const {
    control,
    register,
    handleSubmit,
    getValues,
    formState: { isValid, errors },
  } = useForm(formOptions);
  const handleConfirm = () => {
    getValues('question');
    request({
      url: api.faq.post,
      method: 'post',
      data: {
        question: getValues('question'),
        answer: answerEditorRef.current.getContent().replace(/<[^>]*>?/g, ''),
      },
    }).then(() => {
      navigate(-1);
    });
  };
  const renderColumn = () => {
    return (
      <div className="col">
        <div className="bordered">
          <div className="row border-bottom">
            <div className="flex-1 row align-center background-box justify-center">제목</div>
            <div className="flex-3 row -16">
              <ActInput {...register('question')} id="question" placeholder="" errors={errors} control={control} hideBorder={true} />
            </div>
          </div>

          <div className="row border-bottom">
            <div className="flex-1 row align-center background-box justify-center">내용</div>
            <div className="flex-3 row">
              <ActEditor
                onInit={(evt, editor) => (answerEditorRef.current = editor)}
                initialValue=""
                init={{
                  height: 400,
                  menubar: false,
                  plugins: ['advlist', 'anchor', 'autolink', 'help', 'image', 'link', 'lists', 'searchreplace', 'table', 'wordcount'],
                  toolbar: 'undo redo | blocks | ' + 'bold italic forecolor | alignleft aligncenter ' + 'alignright alignjustify | bullist numlist outdent indent | ' + 'removeformat | help',
                  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="col gap-16">
      {renderColumn()}
      <div className="divider-thick-primary-4" />
      <div className="row">
        <div className="flex-1 align-center justify-center">
          <ActButton label={<div className="padding-row-24">확인</div>} handleOnClick={() => handleConfirm()} />
        </div>
      </div>
    </div>
  );
};
export default FaqPost;
