import { ILesson, LessonService } from '@/api/lesson.service';
import Layout from '@/components/Layout';
import useRole from '@/hooks/useRole';
import { NextPageAuth } from '@/types/auth.types';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';

const LessonPage: NextPageAuth = () => {
  const router = useRouter();
  const { isTeacher } = useRole();
  const [picture, setPicture] = React.useState('' as string);
  const [photoMaterial, setPhotoMaterial] = React.useState('' as string);
  const [document, setDocument] = React.useState('' as string);
  const [video, setVideo] = React.useState('' as string);
  const [name, setName] = React.useState('' as string);
  const [duration, setDuration] = React.useState('' as string);

  const { data: lesson, refetch } = useQuery(
    'lesson',
    () => LessonService.findOne(Number(router?.query?.id)),
    {
      select: (data: ILesson) => data,
      enabled: !!router?.query?.id,
    },
  );

  const { mutate } = useMutation(
    'updateLesson',
    (data: any) => LessonService.update(Number(router?.query?.id), data),
    {
      onSuccess: () => {
        refetch();
      },
    },
  );

  const { control, handleSubmit, setValue, trigger } = useForm();

  const onSubmit = (data: ILesson) => {
    mutate({
      ...data,
      picture: typeof picture === 'string' ? null : picture,
      photo_material: typeof photoMaterial === 'string' ? null : photoMaterial,
      document: typeof document === 'string' ? null : document,
      video: typeof video === 'string' ? null : video,
    });
  };

  useEffect(() => {
    if (lesson?.picture) {
      setPicture(lesson?.picture);
    }
    if (lesson?.photo_material) {
      setPhotoMaterial(lesson?.photo_material);
    }
    if (lesson?.document) {
      setDocument(lesson?.document);
    }
    if (lesson?.video) {
      setVideo(lesson?.video);
    }
    if (lesson?.name) {
      setName(lesson?.name);
      setValue('name', lesson?.name);
      trigger('name');
    }
    if (lesson?.duration) {
      setDuration(lesson?.duration);
      setValue('duration', lesson?.duration);
      trigger('duration');
    }
  }, [lesson, setValue, trigger]);

  return (
    <Layout>
      {isTeacher ? (
        <>
          <br />
          <Typography variant="h5">Материал</Typography>
          <br />
          {/* @ts-ignore */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={1.5}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    InputProps={{
                      startAdornment: (
                        <Typography pr={1} color="grey">
                          Название:{' '}
                        </Typography>
                      ),
                    }}
                    fullWidth
                    required
                    size="small"
                  />
                )}
              />
              <Controller
                name="duration"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    InputProps={{
                      startAdornment: (
                        <Typography pr={1} color="grey">
                          Время:
                        </Typography>
                      ),
                    }}
                    fullWidth
                    required
                    size="small"
                  />
                )}
              />
              <Box>
                <Button
                  component="label"
                  size="small"
                  sx={{
                    width: 'fit-content',
                  }}
                >
                  Загрузить видео
                  <input
                    type="file"
                    hidden
                    onChange={(e: any) => {
                      const File = e.target.files[0];
                      setVideo(File);
                    }}
                  />
                </Button>
                &nbsp; &nbsp;
                {/* @ts-ignore */}
                {(video && video?.name) || (lesson?.video && 'Есть')}
              </Box>

              <Box>
                <Button
                  component="label"
                  size="small"
                  sx={{
                    width: 'fit-content',
                  }}
                >
                  Загрузить фото
                  <input
                    type="file"
                    hidden
                    onChange={(e: any) => {
                      const File = e.target.files[0];
                      setPicture(File);
                    }}
                  />
                </Button>
                &nbsp; &nbsp;
                {/* @ts-ignore */}
                {(picture && picture?.name) || (lesson?.picture && 'Есть')}
              </Box>
              <Box>
                <Button
                  component="label"
                  size="small"
                  sx={{
                    width: 'fit-content',
                  }}
                >
                  Загрузить фото материал
                  <input
                    type="file"
                    hidden
                    onChange={(e: any) => {
                      const File = e.target.files[0];
                      setPhotoMaterial(File);
                    }}
                  />
                </Button>
                &nbsp; &nbsp;
                {/* @ts-ignore */}
                {(photoMaterial && photoMaterial?.name) || (lesson?.photo_material && 'Есть')}
              </Box>
              <Box>
                <Button
                  component="label"
                  size="small"
                  sx={{
                    width: 'fit-content',
                  }}
                >
                  Загрузить документ
                  <input
                    type="file"
                    hidden
                    onChange={(e: any) => {
                      const File = e.target.files[0];
                      setDocument(File);
                    }}
                  />
                </Button>
                &nbsp; &nbsp;
                {/* @ts-ignore */}
                {(document && document?.name) || (lesson?.document && 'Есть')}
              </Box>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  width: 'fit-content',
                }}
              >
                Сохранить
              </Button>
            </Stack>
          </form>
        </>
      ) : (
        <>
          <br />

          <Typography variant="h5">Изучите материал</Typography>
          <Stack spacing={2}>
            <Typography variant="h6">{lesson?.name}</Typography>
            <Typography variant="body1">{lesson?.duration}</Typography>
            <br />
            <Stack
              sx={{
                padding: '20px',
                backgroundColor: '#eee',
                borderRadius: '10px',
              }}
            >
              <Typography variant="h6">Документ</Typography>
              <a href={lesson?.document} download>
                Скачать документ
              </a>
            </Stack>
            <Stack
              sx={{
                padding: '20px',
                backgroundColor: '#eee',
                borderRadius: '10px',
              }}
            >
              <Typography variant="body1">Видео</Typography>
              <video src={lesson?.video} controls />
            </Stack>
            <br />
            <Stack
              sx={{
                padding: '20px',
                backgroundColor: '#eee',
                borderRadius: '10px',
              }}
            >
              <Typography variant="h6">Фото</Typography>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={lesson?.picture} alt="" />
            </Stack>

            <Stack
              sx={{
                padding: '20px',
                backgroundColor: '#eee',
                borderRadius: '10px',
              }}
            >
              <Typography variant="h6">Фото материал</Typography>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={lesson?.photo_material} alt="" />
            </Stack>
          </Stack>
        </>
      )}
    </Layout>
  );
};

export default LessonPage;

LessonPage.is_auth = true;
