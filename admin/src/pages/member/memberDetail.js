import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import ActEditor from 'components/organisms/Editor';
import { useReactQuery } from '../../hooks/useReactQuery';
import { api } from '../../repository';
import { MEMBER_TYPE } from '../../constants/constant';
import useModal from '../../hooks/useModal';
import { request } from '../../utils/axiosClient';
import { downloadFile } from '../../utils/downloadFile';
import ActButton from '../../components/atoms/ActButton';
import ActRadioGroup from '../../components/atoms/ActRadioGroup';

const MemberDetail = () => {
  const navigate = useNavigate();
  const { type = undefined, id = undefined } = useParams();
  if (type === undefined || id === undefined) navigate(-1);
  const { isLoading, isSuccess, data, isError, error, refetch } = useReactQuery(
    `${type === MEMBER_TYPE.INDIVIDUAL ? 'user-detail-' : 'org-detail-'}${id}`,
    type === MEMBER_TYPE.INDIVIDUAL ? api.user.detail(id) : api.organization.detail(id),
    {
      refetchOnWindowFocus: false,
      staleTime: 2000,
    },
  );
  const { showModal } = useModal();

  const shortDescriptionEditorRef = useRef(null);
  const longDescriptionEditorRef = useRef(null);
  const [orgMemberState, setOrgMemberState] = useState(data.status);
  const orgMemberStateOptions = [
    { label: '전체', value: 'all' },
    { label: '대기', value: 'PENDING' },
    { label: '승인', value: 'AUTHORIZED' },
    { label: '불가', value: 'UNAVAILABLE' },
    { label: '탈퇴', value: 'DELETED' },
  ];
  useEffect(() => {
    if (type === MEMBER_TYPE.ORGANIZATION) {
      setOrgMemberState(data.status);
    }
  }, [data]);
  const handleConfirm = type => {
    const params = {
      ...data,
      shortDescription: shortDescriptionEditorRef.current.getContent().length > 0 ? shortDescriptionEditorRef.current.getContent().replace(/<[^>]*>?/g, '') : '',
      longDescription: longDescriptionEditorRef.current.getContent().length > 0 ? longDescriptionEditorRef.current.getContent().replace(/<[^>]*>?/g, '') : '',
    };
    console.log('params', params);
    type === MEMBER_TYPE.INDIVIDUAL
      ? navigate(-1)
      : request({
          url: api.organization.patch(id),
          method: 'patch',
          data: {
            ...data,
            shortDescription: shortDescriptionEditorRef.current.getContent().length > 0 ? shortDescriptionEditorRef.current.getContent().replace(/<[^>]*>?/g, '') : '',
            longDescription: longDescriptionEditorRef.current.getContent().length > 0 ? longDescriptionEditorRef.current.getContent().replace(/<[^>]*>?/g, '') : '',
          },
        });
  };
  const handleDelete = type => {
    showModal({
      open: true,
      message: {
        type: 'text',
        content: '삭제하시겠습니까?',
      },
      handleConfirm: () => {
        request({
          url: type === MEMBER_TYPE.INDIVIDUAL ? api.user.delete(id) : api.organization.delete(id),
          method: 'delete',
        });
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
  const renderColumn = memberType => {
    return memberType === MEMBER_TYPE.INDIVIDUAL ? (
      <div className="col">
        <div>계정정보</div>
        <div className="bordered">
          <div className="row max-width border-bottom">
            <div className="flex-1">
              <div className="flex-1 row align-center background-box justify-center">사진</div>
              <div className="flex-1 row align-center justify-around">
                <div
                  className="width-120 height-120 link"
                  onClick={() => showImageModal('http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcSLO4eV_Mv3f5PZ5-SH-P6QKGQMnqE9rIypVQFC5jYjJVx92Jml9t-8iay3Vq-eDCrK')}
                >
                  <img
                    className="display-block object-fit-cover width-120 height-120"
                    src="http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcSLO4eV_Mv3f5PZ5-SH-P6QKGQMnqE9rIypVQFC5jYjJVx92Jml9t-8iay3Vq-eDCrK"
                  />
                </div>
                <ActButton
                  label="다운로드"
                  handleOnClick={() => onHandleClickDownload('http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcSLO4eV_Mv3f5PZ5-SH-P6QKGQMnqE9rIypVQFC5jYjJVx92Jml9t-8iay3Vq-eDCrK')}
                />
              </div>
            </div>
            <div className="flex-1 col">
              <div className="row border-bottom">
                <div className="flex-1 row padding-16 align-center background-box justify-center">가입일시</div>
                <div className="flex-1 row padding-16">{dayjs(data.createdAt).format('YYYY.MM.DD')}</div>
              </div>
              <div className="row">
                <div className="flex-1 row padding-16 align-center background-box justify-center">닉네임</div>
                <div className="flex-1 padding-16">{data.nickname}</div>
              </div>
            </div>
          </div>
          <div className="row border-bottom">
            <div className="flex-1">
              <div className="flex-1 padding-16 row align-center background-box justify-center">ID</div>
              <div className="flex-1 row padding-16">{data._id}</div>
            </div>
            <div className="flex-1">
              <div className="flex-1 padding-16 row align-center background-box justify-center">실명</div>
              <div className="flex-1 row padding-16">{data.indInfo?.name || ''}</div>
            </div>
          </div>
          <div className="row border-bottom">
            <div className="flex-1">
              <div className="flex-1 padding-16 row align-center background-box justify-center">계정유형</div>
              <div className="flex-1 padding-16 row">{data.loginType}</div>
            </div>
            <div className="flex-1">
              <div className="flex-1 padding-16 row align-center background-box justify-center">생년월일</div>
              <div className="flex-1 padding-16 row">{data.indInfo?.dateOfBirth || ''}</div>
            </div>
          </div>
          <div className="row border-bottom">
            <div className="flex-1">
              <div className="flex-1 padding-16 row align-center background-box justify-center">이메일</div>
              <div className="flex-1 padding-16 row">{data.email}</div>
            </div>
            <div className="flex-1">
              <div className="flex-1 padding-16 row align-center background-box justify-center">성별</div>
              <div className="flex-1 padding-16 row">{data.indInfo?.sex || ''}</div>
            </div>
          </div>
          <div className="row border-bottom">
            <div className="flex-1">
              <div className="flex-1 padding-16 row align-center background-box justify-center">회원상태</div>
              <div className="flex-1 padding-16 row">{data.status}</div>
            </div>
            <div className="flex-1">
              <div className="flex-1 padding-16 row align-center background-box justify-center">휴대폰번호</div>
              <div className="flex-1 padding-16 row">{data.indInfo?.mobile || ''}</div>
            </div>
          </div>
          <div className="row">
            <div className="flex-1">
              <div className="flex-1 padding-16 row align-center background-box justify-center">탈퇴일</div>
              <div className="flex-1 padding-16 row">{data.deleteAt || ''}</div>
            </div>
            <div className="flex-1">
              <div className="flex-1 padding-16 row align-center background-box justify-center" />
              <div className="flex-1 padding-16 row" />
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="col">
        <div>계정정보</div>
        <div className="bordered">
          <div className="row max-width">
            <div className="flex-1">
              <div className="flex-1">
                <div className="flex-1 row align-center background-box justify-center">단체로고</div>
                <div className="flex-1 row align-center justify-around">
                  {data?.logoUrl ? (
                    <div className="flex-1 row align-center justify-around">
                      <div className="width-120 height-60 link" onClick={() => showImageModal(data.logoUrl)}>
                        <img className="display-block object-fit-contain width-120 height-60" src={data.logoUrl} />
                      </div>
                      <ActButton label="다운로드" handleOnClick={() => onHandleClickDownload(data.logoUrl)} />
                    </div>
                  ) : (
                    <div>등록된 로고가 없습니다.</div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex-1 col">
              <div className="row border-bottom">
                <div className="flex-1 row padding-16 align-center background-box justify-center">가입일</div>
                <div className="flex-1 row padding-16">{dayjs(data.createdAt).format('YYYY.MM.DD')}</div>
              </div>
            </div>
          </div>
          <div className="row border-bottom">
            <div className="flex-1">
              <div className="flex-1 padding-16 row align-center background-box justify-center">ID</div>
              <div className="flex-1 padding-16 row">{data._id}</div>
            </div>
            <div className="flex-1">
              <div className="flex-1 padding-16 row align-center background-box justify-center">닉네임</div>
              <div className="flex-1 padding-16 row">{data.indInfo?.name || ''}</div>
            </div>
          </div>
          <div className="row border-bottom">
            <div className="flex-1">
              <div className="flex-1 padding-16 row align-center background-box justify-center">이메일</div>
              <div className="flex-1 padding-16 row">{data.email}</div>
            </div>
            <div className="flex-1">
              <div className="flex-1 padding-16 row align-center background-box justify-center">단체정보</div>
              <div className="flex-1 padding-16 row">{data.name || ''}</div>
            </div>
          </div>
          <div className="row border-bottom">
            <div className="flex-1">
              <div className="flex-1 padding-16 row align-center background-box justify-center">은행명</div>
              <div className="flex-1 padding-16 row">{data.bankDetail?.bankName || ''}</div>
            </div>
            <div className="flex-1">
              <div className="flex-1 padding-16 row align-center background-box justify-center">담당자 성함</div>
              <div className="flex-1 padding-16 row">{data.name || ''}</div>
            </div>
          </div>
          <div className="row border-bottom">
            <div className="flex-1">{renderItem({ title: '은행통장사본', content: data.status })}</div>
            <div className="flex-1">{renderItem({ title: '담당자 연락처', content: data.manager?.mobile || '' })}</div>
          </div>
          <div className="row border-bottom">
            <div className="flex-1">{renderItem({ title: '통장번호', content: data.bankDetail?.bankaccount })}</div>
            <div className="flex-1">{renderItem({ title: '단체홈페이지', content: data.homepageUrl || '' })}</div>
          </div>
          <div className="row">
            <div className="flex-1">{renderItem({ title: '예금주', content: data.bankDetail?.accountHolder })}</div>
            <div className="flex-1">{renderItem({ title: '탈퇴일', content: data.manager?.mobile || '' })}</div>
          </div>
        </div>
        <div>단체정보</div>
        <div className="bordered">
          <div className="row border-bottom">
            <div className="flex-1 row align-center background-box justify-center">단체 이미지</div>
            <div className="flex-3 row">
              {data.imageUrls.length ? (
                data.imageUrls.map((imageUrl, index) => {
                  return (
                    <div key={index} className="col padding-16">
                      <div className="width-120 height-120 link bordered" onClick={() => showImageModal(imageUrl)}>
                        <img className="display-block object-fit-cover width-120 height-120" src={imageUrl} />
                      </div>
                      <ActButton label={<div className="padding-row-24">다운로드</div>} handleOnClick={() => onHandleClickDownload(imageUrl)} />
                    </div>
                  );
                })
              ) : (
                <div className="row padding-16 align-center">등록된 이미지가 없습니다.</div>
              )}
            </div>
          </div>
          <div className="row border-bottom">
            <div className="flex-1 row align-center background-box justify-center">단체 간략 소개</div>
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
                disabled={true}
              />
            </div>
          </div>
          <div className="row border-bottom">
            <div className="flex-1 row align-center background-box justify-center">단체 상세 소개</div>
            <div className="flex-3 row">
              <ActEditor
                onInit={(evt, editor) => (longDescriptionEditorRef.current = editor)}
                initialValue={data?.shortDescription || ''}
                init={{
                  height: 400,
                  menubar: false,
                  plugins: ['advlist', 'anchor', 'autolink', 'help', 'image', 'link', 'lists', 'searchreplace', 'table', 'wordcount'],
                  toolbar: 'undo redo | blocks | ' + 'bold italic forecolor | alignleft aligncenter ' + 'alignright alignjustify | bullist numlist outdent indent | ' + 'removeformat | help',
                  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                }}
                disabled={true}
              />
            </div>
          </div>
          <div className="row border-bottom">
            <div className="flex-1 row align-center background-box justify-center">회원상태</div>
            <div className="flex-3 row">
              <ActRadioGroup options={orgMemberStateOptions} state={orgMemberState} setState={setOrgMemberState} />
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
          <ActButton label={<div className="padding-row-24">삭제</div>} handleOnClick={() => handleDelete(type)} />
        </div>
        <div className="flex-1 align-center justify-center">
          {/*<ActButton label={<div className="padding-row-24">{type === MEMBER_TYPE.INDIVIDUAL ? '확인' : '저장'}</div>} handleOnClick={() => handleConfirm(type)} />*/}
        </div>
        <div className="flex-1" />
      </div>
    </div>
  );
};
export default MemberDetail;
