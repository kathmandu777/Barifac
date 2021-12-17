import {
  Button,
  FormControl,
  FormLabel,
  Select,
  Textarea,
} from '@chakra-ui/react';
import React, { useState } from 'react';

export enum CommentType {
  SubjectComment,
  TeacherComment,
  EditRequest,
}

export enum EditRequestType {
  Evaluation,
  Subject,
}

type CommentSubmitFormProps = {
  onCommentSubmit: (
    commentType: CommentType,
    comment: string,
    uuid: string,
  ) => void;
  onEditRequestSubmit: (
    editRequestType: EditRequestType,
    comment: string,
    uuid: string,
  ) => void;

  evaluations: { name: string; uuid: string }[];
  subjectUuid: string;
  teacherUuid: string;
};

const CommentSubmitForm: React.FC<CommentSubmitFormProps> = ({
  onCommentSubmit,
  onEditRequestSubmit,
  evaluations,
  subjectUuid,
  teacherUuid,
}) => {
  const [commentType, setCommentType] = useState(CommentType.SubjectComment);
  const [editRequestType, setEditRequestType] = useState(
    EditRequestType.Subject,
  );
  const [comment, setComment] = useState('');
  const [evaluationUuid, setEvaluationUuid] = useState('');

  const handleSubmit = () => {
    if (commentType == CommentType.SubjectComment) {
      onCommentSubmit(commentType, comment, subjectUuid);
    }
    if (commentType == CommentType.TeacherComment) {
      onCommentSubmit(commentType, comment, teacherUuid);
    }
    if (commentType == CommentType.EditRequest) {
      if (editRequestType == EditRequestType.Subject) {
        onEditRequestSubmit(editRequestType, comment, subjectUuid);
      }
      if (editRequestType == EditRequestType.Evaluation) {
        onEditRequestSubmit(editRequestType, comment, evaluationUuid);
      }
    }
  };

  return (
    <>
      <FormControl>
        <FormLabel>投稿の種類</FormLabel>
        <Select
          value={commentType}
          onChange={({ target }) => {
            setCommentType(target.value as unknown as CommentType);
          }}
        >
          <option value={CommentType.SubjectComment}>教科へのコメント</option>
          <option value={CommentType.TeacherComment}> 教員へのコメント</option>
          <option value={CommentType.EditRequest}>編集リクエスト</option>
        </Select>
      </FormControl>
      {commentType == CommentType.EditRequest && (
        <FormControl>
          <FormLabel>報告の種類</FormLabel>
          <Select
            value={editRequestType}
            onChange={({ target }) => {
              setEditRequestType(target.value as unknown as EditRequestType);
            }}
          >
            <option value={EditRequestType.Subject}>教科</option>
            <option value={EditRequestType.Evaluation}>評価割合</option>
          </Select>
        </FormControl>
      )}
      {editRequestType == EditRequestType.Evaluation && (
        <FormControl>
          <FormLabel>報告する評価項目</FormLabel>
          <Select
            placeholder='評価項目を選択'
            onChange={({ target }) => {
              setEvaluationUuid(target.value);
            }}
          >
            {evaluations.map(e => {
              return (
                <option value={e.uuid} key={e.uuid}>
                  {e.name}
                </option>
              );
            })}
          </Select>
        </FormControl>
      )}
      <FormControl isRequired>
        <FormLabel>コメント</FormLabel>
        <Textarea
          placeholder='コメント'
          onChange={({ target }) => setComment(target.value)}
        />
      </FormControl>
      <Button w='100%' onClick={handleSubmit} bg='blue.400' mt='10px'>
        投稿する
      </Button>
    </>
  );
};

export default CommentSubmitForm;
