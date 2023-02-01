import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import ActEditor from 'components/organisms/Editor';
import { useReactQuery } from '../../hooks/useReactQuery';
import { api } from '../../repository';
import { MEMBER_TYPE, ORGANIZATION_MENU_TYPE } from '../../constants/constant';
import useModal from '../../hooks/useModal';
import { request } from '../../utils/axiosClient';
import { downloadFile } from '../../utils/downloadFile';
import ActButton from '../../components/atoms/ActButton';
import ActRadioGroup from '../../components/atoms/ActRadioGroup';

const OrganizationDetail = () => {
  const navigate = useNavigate();
  const { type = undefined, id = undefined } = useParams();
  if (type === undefined || id === undefined) navigate(-1);

  const { isFetching, isLoading, isSuccess, data, isError, error, refetch } = useReactQuery(
    `${type === ORGANIZATION_MENU_TYPE.NEWS ? 'org-news-' : type === ORGANIZATION_MENU_TYPE.NOTICE ? 'org-news-' : 'org-campaign-'}${id}`,
    type === ORGANIZATION_MENU_TYPE.NOTICE ? api.notice.detail(id) : type === ORGANIZATION_MENU_TYPE.NEWS ? api.news.detail(id) : api.campaign.detail(id),
    {
      refetchOnWindowFocus: false,
      staleTime: 2000,
    },
  );

  const { showModal } = useModal();
  const getCampaignStatus = ({ startedAt, endedAt }) => {
    const current = new Date();
    return current > new Date(endedAt) ? 'END' : current > new Date(startedAt) && current < new Date(endedAt) ? 'PROCESSING' : 'PENDING';
  };
  const [postState, setPostState] = useState(data.status);
  const [campaignState, setCampaignState] = useState(getCampaignStatus({ startedAt: data.startedAt, endedAt: data.endedAt }));

  const statusOptions = [
    { label: '대기', value: 'PENDING_APPROVAL' },
    { label: '승인', value: 'APPROVED' },
    { label: '불가', value: 'REJECT' },
  ];

  const campaignStatusOptions = [
    { label: '대기', value: 'PENDING' },
    { label: '진행중', value: 'PROCESSING' },
    { label: '종료', value: 'END' },
  ];

  const descriptionEditorRef = useRef(null);
  const handleConfirm = () => {
    request({
      url: type === ORGANIZATION_MENU_TYPE.NOTICE ? api.notice.detail(id) : type === ORGANIZATION_MENU_TYPE.NEWS ? api.news.detail(id) : api.campaign.detail(id),
      method: 'patch',
      data:
        type === ORGANIZATION_MENU_TYPE.CAMPAIGN
          ? {
              ...data,
              status: postState,
              campaignStatus: campaignState,
              description: descriptionEditorRef.current.getContent().replace(/<[^>]*>?/g, ''),
            }
          : {
              ...data,
              status: postState,
              description: descriptionEditorRef.current.getContent().replace(/<[^>]*>?/g, ''),
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
  const renderItem = ({ title, content }) => {
    return (
      <div className="flex-1">
        <div className="flex-1 padding-16 row align-center background-box justify-center">{title}</div>
        <div className="flex-1 padding-16 row">{content}</div>
      </div>
    );
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
              <div className="padding-16">{data.title}</div>
            </div>
          </div>
          <div className="row border-bottom">
            <div className="flex-1 row align-center background-box justify-center">{`${typeString()} 이미지`}</div>
            <div className="flex-3 row">
              {data.images.length ? (
                data.images.map((image, index) => {
                  return (
                    <div key={index} className="col padding-16">
                      <div className="width-120 height-120 link bordered" onClick={() => showImageModal(image)}>
                        <img className="display-block object-fit-cover width-120 height-120" src={image} />
                      </div>
                      <ActButton label={<div className="padding-row-24">다운로드</div>} handleOnClick={() => onHandleClickDownload(image)} />
                    </div>
                  );
                })
              ) : (
                <div>등록된 이미지가 없습니다.</div>
              )}
            </div>
          </div>
          <div className="row border-bottom">
            <div className="flex-1 row align-center background-box justify-center">{`${typeString()} 소개`}</div>
            <div className="flex-3 row">
              <ActEditor
                onInit={(evt, editor) => (descriptionEditorRef.current = editor)}
                initialValue={data?.description || ''}
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
                {renderItem({ title: '캠페인 기간', content: `${dayjs(data.startedAt).format('YYYY.MM.DD')} - ${dayjs(data.endedAt).format('YYYY.MM.DD')}` })}
                {renderItem({ title: '등록일시', content: dayjs(data.createdAt).format('YYYY.MM.DD') })}
              </div>
              <div className="row">
                <div className="flex-1">
                  <div className="flex-1 row padding-16 align-center background-box justify-center">승인상태</div>
                  <div className="flex-1 row padding-16">
                    <ActRadioGroup options={statusOptions} state={postState} setState={setPostState} />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex-1 row padding-16 align-center background-box justify-center">캠페인상태</div>
                  <div className="flex-1 row padding-16">
                    <ActRadioGroup options={campaignStatusOptions} state={campaignState} setState={setCampaignState} disabled={true} />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="row border-bottom">
              <div className="flex-1 row padding-16 align-center background-box justify-center">승인상태</div>
              <div className="flex-1 row padding-16">
                <ActRadioGroup options={statusOptions} state={postState} setState={setPostState} />
              </div>
              {renderItem({ title: '등록일시', content: dayjs(data.createdAt).format('YYYY.MM.DD') })}
            </div>
          )}
        </div>
      </div>
    );
  };
  return isFetching || isLoading ? (
    <div>loading...</div>
  ) : (
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
