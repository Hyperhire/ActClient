import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ActEditor from 'components/organisms/Editor';
import { useReactQuery } from '../../hooks/useReactQuery';
import { api } from '../../repository';
import useModal from '../../hooks/useModal';
import { request } from '../../utils/axiosClient';
import ActButton from '../../components/atoms/ActButton';
import ActRadioGroup from '../../components/atoms/ActRadioGroup';
const FaqDetail = ({ id }) => {
  const navigate = useNavigate();
  if (id === undefined) navigate(-1);
  console.log('OperationDetail', id);

  const { isFetching, isLoading, isSuccess, data, isError, error, refetch } = useReactQuery(`${'faq-detail-'}${id}`, api.faq.detail(id), {
    refetchOnWindowFocus: false,
    staleTime: 2000,
  });
  const { showModal } = useModal();
  const answerEditorRef = useRef(null);
  const [show, setShow] = useState(data.show);

  useEffect(() => {
    setShow(data.show);
  }, [data]);
  const handleConfirm = () => {
    if (answerEditorRef.current) {
      console.log(answerEditorRef.current.getContent().replace(/<[^>]*>?/g, ''));
    }

    request({
      url: api.faq.detail(id),
      method: 'patch',
      data: {
        question: data.question,
        answer: answerEditorRef.current.getContent().replace(/<[^>]*>?/g, ''),
        show,
      },
    }).then(() => {
      navigate(-1);
    });
  };

  const handleDelete = () => {
    showModal({
      open: true,
      message: {
        type: 'text',
        content: '삭제하시겠습니까?',
      },
      handleConfirm: () => {
        console.log('confirm delete ');
      },
      handleCancel: () => {
        console.log('cancel delete ');
      },
    });
  };

  const showOptions = [
    { label: '노출', value: true },
    { label: '비노출', value: false },
  ];
  const renderColumn = () => {
    return (
      <div className="col">
        <div className="bordered">
          <div className="row border-bottom">
            <div className="flex-1 row padding-16 align-center background-box justify-center">등록일시</div>
            <div className="flex-1 row padding-16">2022</div>
            <div className="flex-1 padding-16 row align-center background-box justify-center">노출상태</div>
            <div className="flex-1 row padding-16">
              <ActRadioGroup options={showOptions} state={show} setState={setShow} />
            </div>
          </div>
          <div className="row border-bottom">
            <div className="flex-1 row align-center background-box justify-center">제목</div>
            <div className="flex-3 row -16">
              <div className="padding-16">{data.question}</div>
            </div>
          </div>
          <div className="row border-bottom">
            <div className="flex-1 row align-center background-box justify-center">내용</div>
            <div className="flex-3 row">
              <ActEditor
                onInit={(evt, editor) => (answerEditorRef.current = editor)}
                initialValue={data?.answer || ''}
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
  return isFetching || isLoading ? (
    <div>loading...</div>
  ) : (
    <div className="col gap-16">
      {renderColumn()}
      <div className="divider-thick-primary-4" />
      <div className="row">
        <div className="flex-1 align-center justify-start">
          <ActButton label={<div className="padding-row-24">삭제</div>} handleOnClick={() => handleDelete()} />
        </div>
        <div className="flex-1 align-center justify-center">
          <ActButton label={<div className="padding-row-24">확인</div>} handleOnClick={() => handleConfirm()} />
        </div>
        <div className="flex-1" />
      </div>
    </div>
  );
};
export default FaqDetail;
