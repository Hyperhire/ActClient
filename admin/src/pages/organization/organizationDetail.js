import React, { useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ActEditor from 'components/organisms/Editor';
import { useReactQuery } from '../../hooks/useReactQuery';
import { api } from '../../repository';
import { MEMBER_TYPE, ORGANIZATION_MENU_TYPE } from '../../constants/constant';
import useModal from '../../hooks/useModal';
import { request } from '../../utils/axiosClient';
import { downloadFile } from '../../utils/downloadFile';
import ActButton from '../../components/atoms/ActButton';

const OrganizationDetail = () => {
  const navigate = useNavigate();
  const { type = undefined, id = undefined } = useParams();
  if (type === undefined || id === undefined) navigate(-1);

  const { isLoading, isSuccess, data, isError, error, refetch } = useReactQuery(
    `${type === ORGANIZATION_MENU_TYPE.NEWS ? 'org-news-' : type === ORGANIZATION_MENU_TYPE.NOTICE ? 'org-news-' : 'org-campaign-'}${id}`,
    type === ORGANIZATION_MENU_TYPE.NEWS ? api.notice.detail(id) : type === ORGANIZATION_MENU_TYPE.NOTICE ? api.news.detail(id) : api.campaign.detail(id),
    {
      staleTime: 2000,
    },
  );

  const { showModal } = useModal();

  const shortDescriptionEditorRef = useRef(null);
  const handleConfirm = () => {
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
  const renderColumn = postType => {
    const typeString = () => {
      return postType === ORGANIZATION_MENU_TYPE.NEWS ? '소식 관리' : postType === ORGANIZATION_MENU_TYPE.NOTICE ? '공시' : '캠페인';
    };
    return (
      <div className="col">
        <div className="bordered">
          <div className="row border-bottom">
            <div className="flex-1 row align-center background-box justify-center">{`${typeString()} 제목`}</div>
            <div className="flex-3 row -16">
              <div className="padding-16">제목</div>
            </div>
          </div>
          <div className="row border-bottom">
            <div className="flex-1 row align-center background-box justify-center">{`${typeString()} 이미지`}</div>
            <div className="flex-3 row">
              <div className="col padding-16">
                <div
                  className="width-120 height-120 link bordered"
                  onClick={() => showImageModal('http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcSLO4eV_Mv3f5PZ5-SH-P6QKGQMnqE9rIypVQFC5jYjJVx92Jml9t-8iay3Vq-eDCrK')}
                >
                  <img
                    className="display-block object-fit-cover width-120 height-120"
                    src="http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcSLO4eV_Mv3f5PZ5-SH-P6QKGQMnqE9rIypVQFC5jYjJVx92Jml9t-8iay3Vq-eDCrK"
                  />
                </div>
                <ActButton
                  label={<div className="padding-row-24">다운로드</div>}
                  handleOnClick={() => onHandleClickDownload('http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcSLO4eV_Mv3f5PZ5-SH-P6QKGQMnqE9rIypVQFC5jYjJVx92Jml9t-8iay3Vq-eDCrK')}
                />
              </div>
              <div className="col padding-16">
                <div
                  className="width-120 height-120 link bordered"
                  onClick={() => showImageModal('http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcSLO4eV_Mv3f5PZ5-SH-P6QKGQMnqE9rIypVQFC5jYjJVx92Jml9t-8iay3Vq-eDCrK')}
                >
                  <img
                    className="display-block object-fit-cover width-120 height-120"
                    src="http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcSLO4eV_Mv3f5PZ5-SH-P6QKGQMnqE9rIypVQFC5jYjJVx92Jml9t-8iay3Vq-eDCrK"
                  />
                </div>
                <ActButton
                  label={<div className="padding-row-24">다운로드</div>}
                  handleOnClick={() => onHandleClickDownload('http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcSLO4eV_Mv3f5PZ5-SH-P6QKGQMnqE9rIypVQFC5jYjJVx92Jml9t-8iay3Vq-eDCrK')}
                />
              </div>
              <div className="col padding-16 align-center justify-center">
                <div
                  className="width-120 height-120 link bordered"
                  onClick={() => showImageModal('http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcSLO4eV_Mv3f5PZ5-SH-P6QKGQMnqE9rIypVQFC5jYjJVx92Jml9t-8iay3Vq-eDCrK')}
                >
                  <img
                    className="display-block object-fit-cover width-120 height-120"
                    src="http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcSLO4eV_Mv3f5PZ5-SH-P6QKGQMnqE9rIypVQFC5jYjJVx92Jml9t-8iay3Vq-eDCrK"
                  />
                </div>
                <ActButton
                  label={<div className="padding-row-24">다운로드</div>}
                  handleOnClick={() => onHandleClickDownload('http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcSLO4eV_Mv3f5PZ5-SH-P6QKGQMnqE9rIypVQFC5jYjJVx92Jml9t-8iay3Vq-eDCrK')}
                />
              </div>
            </div>
          </div>
          <div className="row border-bottom">
            <div className="flex-1 row align-center background-box justify-center">{`${typeString()} 소개`}</div>
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
          {postType === ORGANIZATION_MENU_TYPE.CAMPAIGN ? (
            <>
              <div className="row">
                <div className="flex-1">
                  <div className="flex-1">캠페인 기간</div>
                  <div className="flex-1">기간</div>
                </div>
                <div className="flex-1">
                  <div className="flex-1">등록일시</div>
                  <div className="flex-1">일시</div>
                </div>
              </div>
              <div className="row">
                <div className="flex-1">
                  <div className="flex-1">승인상태</div>
                  <div className="flex-1">대기승인불가</div>
                </div>
                <div className="flex-1">
                  <div className="flex-1">캠페인상태</div>
                  <div className="flex-1">대기진행중불가</div>
                </div>
              </div>
            </>
          ) : (
            <div className="row border-bottom">
              <div className="flex-1 row padding-16 align-center background-box justify-center">승인상태</div>
              <div className="flex-1 row padding-16">대기 승인 불가</div>
              <div className="flex-1 padding-16 row align-center background-box justify-center">등록일시</div>
              <div className="flex-1 row padding-16">2022</div>
            </div>
          )}
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
export default OrganizationDetail;
