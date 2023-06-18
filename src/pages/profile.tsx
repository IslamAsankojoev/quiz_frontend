import axiosInstance from '@/api/axios.config';
import { ILesson, LessonService } from '@/api/lesson.service';
import { IResult, ResultService } from '@/api/result.service';
import { ISection, SectionService } from '@/api/section.service';
import { ITesting, TestingService } from '@/api/testing.service';
import { IUser, UserService } from '@/api/user.service';
import Layout from '@/components/Layout';
import useRole from '@/hooks/useRole';
import useTypedSession from '@/hooks/useTypedSession';
import { NextPageAuth } from '@/types/auth.types';
import { Avatar, Box, Button, Grid, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';

const Profile: NextPageAuth = () => {
  const { data: session } = useTypedSession();
  const router = useRouter();
  const { isTeacher } = useRole();
  const [testID, setTestID] = React.useState<any[]>([]);

  const { data: results } = useQuery('results', ResultService.findAll, {
    select: (data: IResult[]) => data,
  });

  const { data: sections } = useQuery('sections', SectionService.findAll, {
    select: (data: ISection[]) => data,
  });

  const { data: lessons } = useQuery('lessons', LessonService.findAll, {
    select: (data: ILesson[]) => data,
  });
  const { data: tests } = useQuery('tests', TestingService.findAll, {
    select: (data: ITesting[]) => data.filter((test) => testID.includes(test.id)),
  });

  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery('user', () => UserService.findOne(session?.user?.id), {
    enabled: !!session?.user?.id,
    select: (data: IUser) => data,
  });

  const { mutate: updateProfile, isLoading: updateLoading } = useMutation(
    'updateProfile',
    (data: IUser) => UserService.update(session?.user?.id, data),
    {
      onSuccess: () => {
        refetch();
      },
    },
  );

  const onSubmit = (e: any) => {
    const File = e.target.files[0];
    const formData = new FormData();
    formData.append('profile_photo', File);
    updateProfile(formData as any);
  };

  useEffect(() => {
    if (sections) {
      setTestID(
        sections
          // @ts-ignore
          ?.filter((section) => results?.map((result) => result?.section).includes(section?.id))
          .map((section) => section?.test),
      );
    }
  }, [sections, results]);

  return (
    <Layout>
      <Grid container>
        <Grid item xs={12} md={8}>
          <Stack direction="row" justifyContent="center" alignItems="center" p={4} spacing={4}>
            <Box>
              <Avatar src={user?.profile_photo} sx={{ width: 100, height: 100 }} />
              <br />
              <Button variant="contained" component="label" size="small">
                Upload File
                <input type="file" hidden onChange={(e) => onSubmit(e)} />
              </Button>
            </Box>
            <Box>
              <Typography variant="h4">Ваш логин: {user?.username}</Typography>
              <Typography variant="h6">Email: {user?.email}</Typography>
            </Box>
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          justifyContent="flex-start"
          alignItems="center"
          display="flex"
        ></Grid>
      </Grid>
      <br />

      {!isTeacher ? (
        <>
          <Typography>Успеваемость</Typography>
          <br />
          <Stack spacing={2}>
            {results?.map((result) => (
              <Box
                key={result?.id}
                sx={{
                  backgroundColor: '#eee',
                  width: '100%',
                  padding: 2,
                  borderRadius: 2,
                }}
              >
                <Stack direction="row" justifyContent="space-between">
                  <Typography>
                    {sections?.find((section) => section?.id === result?.section)?.name}
                  </Typography>
                  <Stack direction="row" spacing={5}>
                    <Typography color={result?.status ? 'green' : 'red'}>
                      {result?.status ? 'Пройдено' : 'Не пройдено'}
                    </Typography>
                    <Typography>{result?.total_correct_answer} / 10</Typography>
                  </Stack>
                </Stack>
              </Box>
            ))}
          </Stack>
        </>
      ) : (
        <>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12} md={6}>
              <Stack
                spacing={2}
                sx={{
                  width: '100%',
                }}
              >
                {results?.map((result) => (
                  <Box
                    key={result?.id}
                    sx={{
                      backgroundColor: '#eee',
                      width: '100%',
                      padding: 2,
                      borderRadius: 2,
                    }}
                  >
                    <Stack direction="row" justifyContent="space-between">
                      <Typography>
                        {sections?.find((section) => section?.id === result?.section)?.name}
                      </Typography>
                      <Stack direction="row" spacing={5}>
                        <Link
                          href={`/lesson/${
                            sections?.find((section) => section?.id === result?.section)?.material
                          }`}
                        >
                          Изменить материал
                        </Link>
                      </Stack>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Stack spacing={2}>
                {tests?.map((test) => (
                  <Box
                    key={test?.id}
                    sx={{
                      backgroundColor: '#eee',
                      width: '100%',
                      padding: 2,
                      borderRadius: 2,
                    }}
                  >
                    <Stack direction="row" justifyContent="space-between">
                      <Typography>
                        {sections?.find((section) => section?.test === test.id)?.name} - Тест
                      </Typography>
                      <Stack direction="row" spacing={5}>
                        <Typography>{test?.total_question}</Typography>
                      </Stack>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </>
      )}

      <br />
      <br />
      <br />
    </Layout>
  );
};

export default Profile;

Profile.is_auth = true;
