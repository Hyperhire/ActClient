import React, { useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ActEditor from 'components/organisms/Editor';
import { useReactQuery } from '../../hooks/useReactQuery';
import { api } from '../../repository';
import { MEMBER_TYPE, OPERATION_MENU_TYPE } from '../../constants/constant';
import useModal from '../../hooks/useModal';
import { request } from '../../utils/axiosClient';
import { downloadFile } from '../../utils/downloadFile';
import ActButton from '../../components/atoms/ActButton';
const OperationDetail = () => {
  const navigate = useNavigate();
  const { type = undefined, id = undefined } = useParams();
  if (type === undefined || id === undefined) navigate(-1);
  const { isLoading, isSuccess, data, isError, error, refetch } = useReactQuery(
    `${type === OPERATION_MENU_TYPE.FAQ ? 'faq-detail-' : 'banner-detail-'}${id}`,
    type === OPERATION_MENU_TYPE.FAQ ? api.faq.detail(id) : api.banner.detail(id),
    {
      refetchOnWindowFocus: false,
      staleTime: 2000,
    },
  );
  const { showModal } = useModal();

  const shortDescriptionEditorRef = useRef(null);

  const handleConfirm = () => {
    if (shortDescriptionEditorRef.current) {
      console.log(shortDescriptionEditorRef.current.getContent().replace(/<[^>]*>?/g, ''));
    }

    request({
      url: type === MEMBER_TYPE.INDIVIDUAL ? api.user.detail(id) : api.organization.detail(id),
      method: 'patch',
      data: {
        ...data,
        shortDescription: shortDescriptionEditorRef.current.getContent().replace(/<[^>]*>?/g, ''),
      },
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

  const showImageModal = address => {
    showModal({
      open: true,
      message: {
        type: 'image',
        content: (
          <div className="max-width max-height">
            <img className="display-block object-fit-cover max-width auto-height" src={address} />
          </div>
        ),
      },
    });
  };

  const onHandleClickDownload = async url => {
    await downloadFile(url);
  };
  const renderColumn = operationType => {
    return (
      <div className="col">
        <div className="bordered">
          <div className="row border-bottom">
            <div className="flex-1 row padding-16 align-center background-box justify-center">등록일시</div>
            <div className="flex-1 row padding-16">2022</div>
            <div className="flex-1 padding-16 row align-center background-box justify-center">노출상태</div>
            <div className="flex-1 row padding-16">노출 비노출</div>
          </div>
          <div className="row border-bottom">
            <div className="flex-1 row align-center background-box justify-center">제목</div>
            <div className="flex-3 row -16">
              <div className="padding-16">제목</div>
            </div>
          </div>
          <div className="row border-bottom">
            <div className="flex-1 row align-center background-box justify-center">내용</div>
            <div className="flex-3 row">
              <ActEditor
                onInit={(evt, editor) => (shortDescriptionEditorRef.current = editor)}
                initialValue={data?.shortDescription || ''}
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
      {renderColumn(type)}
      <div className="divider-thick-primary-4" />
      <div className="row">
        <div className="flex-1 align-center justify-start">
          <ActButton label={<div className="padding-row-24">삭제</div>} handleOnClick={() => handleDelete()} />
        </div>
        <div className="flex-1 align-center justify-center">
          <ActButton label={<div className="padding-row-24">확인</div>} handleOnClick={() => handleConfirm(type)} />
        </div>
        <div className="flex-1" />
      </div>
    </div>
  );
};
export default OperationDetail;
