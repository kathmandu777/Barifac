import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Heading, Stack, VStack } from '@chakra-ui/layout';
import { Select } from '@chakra-ui/select';
import {
  Department,
  School,
  UserUpdateRequest,
  UserUpdateRequestFactory,
  Grade,
} from 'domains';
import { NextPage } from 'next';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  DepartmentRepository,
  SchoolRepository,
  UserRepository,
} from 'repositories';

const UserPage: NextPage = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDisabledDep, setIsDisabledDep] = useState<boolean>(false);
  const [selectedDepartents, setSelectedDepartments] = useState<Department[]>();
  const [schools, setSchools] = useState<School[]>();
  const [requestBody, setRequestBody] = useState<UserUpdateRequest>(
    UserUpdateRequestFactory.createEmpty(),
  );

  const [username, setUsername] = useState<string>();
  const [schoolValue, setSchoolValue] = useState<string>('');
  const [departmentValue, setDepartmentValue] = useState<string>();
  const [gradeValue, setGradeValue] = useState<number>();

  const fetchData = async () => {
    const user = await UserRepository.getMe();
    if (!user) {
      alert('ログインしてください');
      router.push('/login');
      return;
    }
    setUsername(user.username);
    if (user.school && user.department) {
      setSchoolValue(user.school.uuid);
      setDepartmentValue(user.department.uuid);
      setGradeValue(user.grade);
      setSelectedDepartments(await DepartmentRepository.gets(user.school.uuid));
      setRequestBody(prevState => {
        return {
          ...prevState,
          department_uuid: user.department.uuid,
          grade: user.grade,
          school_uuid: user.school.uuid,
        };
      });
      setIsDisabledDep(false);
    }

    setRequestBody(prevState => {
      return {
        ...prevState,
        username: user.username,
        email: user.email,
        uid: user.uid,
      };
    });
    setSchools(await SchoolRepository.gets());
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit: React.FormEventHandler = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await UserRepository.update(requestBody);
      console.log(res);
      alert('更新が完了しました');
      router.push('/');
    } catch {
      alert('入力情報に誤りがあります');
    }
    setIsSubmitting(false);
    return;
  };

  const handleSchoolChange: React.FormEventHandler = async (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    e.preventDefault();
    setIsDisabledDep(true);
    // School に対応する Department をすべて取得
    try {
      setSelectedDepartments(await DepartmentRepository.gets(e.target.value));
      setRequestBody({ ...requestBody, school_uuid: e.target.value });
      setSchoolValue(e.target.value);
    } catch {
      return;
    }
    setIsDisabledDep(false);
    return;
  };

  return (
    <VStack spacing={10}>
      <Heading
        as='h1'
        size='xl'
        color='whiteAlpha.900'
        fontWeight='bold'
        mt={150}
      >
        ユーザ情報入力
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={10}>
          <VStack spacing={5}>
            <FormControl id='name' isRequired>
              <FormLabel color='whiteAlpha.900'>名前</FormLabel>
              <Input
                isRequired
                color='whiteAlpha.900'
                defaultValue={username}
                placeholder='名前を入力してください'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setRequestBody({ ...requestBody, username: e.target.value })
                }
              />
            </FormControl>
            <FormControl id='school' isRequired>
              <FormLabel color='whiteAlpha.900'>学校名</FormLabel>
              <Select
                color='gray.400'
                onChange={handleSchoolChange}
                value={schoolValue}
                isRequired
                placeholder='学校名を選択してください'
              >
                {schools &&
                  schools.map(school => (
                    <option key={school.uuid} value={school.uuid}>
                      {school.name}
                    </option>
                  ))}
              </Select>
            </FormControl>
            <FormControl id='school' isRequired>
              <FormLabel color='whiteAlpha.900'>学年</FormLabel>
              <Select
                color='gray.400'
                value={gradeValue}
                isRequired
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setRequestBody({
                    ...requestBody,
                    grade: Number(e.target.value) as Grade,
                  });
                  setGradeValue(Number(e.target.value));
                }}
                placeholder='学年を選択してください'
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl id='Department' isRequired>
              <FormLabel color='whiteAlpha.900'>学科名</FormLabel>
              <Select
                color='gray.400'
                value={departmentValue}
                isDisabled={isDisabledDep}
                isRequired
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setRequestBody({
                    ...requestBody,
                    department_uuid: e.target.value,
                  });
                  setDepartmentValue(e.target.value);
                }}
                placeholder='学科名を選択してください'
              >
                {selectedDepartents &&
                  selectedDepartents.map(department => (
                    <option key={department.uuid} value={department.uuid}>
                      {department.name}
                    </option>
                  ))}
              </Select>
            </FormControl>
          </VStack>
          <Button
            type='submit'
            bg='blue.400'
            color='gray.800'
            rounded='full'
            size='md'
            isDisabled={isSubmitting}
          >
            保存する
          </Button>
        </Stack>
      </form>
    </VStack>
  );
};

export default UserPage;
