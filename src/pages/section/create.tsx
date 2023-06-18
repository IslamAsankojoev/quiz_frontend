import { ILesson, LessonService } from '@/api/lesson.service';
import { ISection, SectionService } from '@/api/section.service';
import { ITesting, TestingService } from '@/api/testing.service';
import ButtonC from '@/components/Button';
import Layout from '@/components/Layout';
import { NextPageAuth } from '@/types/auth.types';
import { Box, Button, Stack, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

const AddSection: NextPageAuth = () => {
  const router = useRouter();
  const [picture, setPicture] = React.useState('' as string);

  const { mutate, isLoading } = useMutation(
    'addSection',
    (data: ISection) => SectionService.create(data),
    {
      onSuccess: () => {},
    },
  );

  const { mutateAsync: createLesson } = useMutation('createLesson', (data: any) =>
    LessonService.create(data),
  );

  const { mutateAsync: createTest } = useMutation(
    'createTest',
    (data: any) => TestingService.create(),
    {},
  );

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const onSubmit = async (data: ISection) => {
    let material = 0;
    let test = 0;
    if (picture) {
      await createLesson(
        {
          name: 'Материал',
          duration: 'Расчитано на 3-4 часа',
          picture: '',
          photo_material: '',
          video: '',
          document: '',
        },
        {
          onSuccess: (data: ILesson) => {
            // @ts-ignore
            material = data?.id;
          },
        },
      );
      await createTest(
        {},
        {
          onSuccess: (data: ITesting) => {
            test = data?.id;
          },
        },
      );
    }

    mutate(
      {
        ...data,
        picture: picture ? picture : '',
        material: material,
        test: test,
      },
      {
        onSuccess: () => {
          router.push('/');
        },
      },
    );
  };
  return (
    <Layout>
      <h1>Добавить раздел</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Название раздела" variant="filled" fullWidth required />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Описание раздела"
                variant="filled"
                fullWidth
                required
                multiline
                rows={4}
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
              {picture ? 'Изменить картинку' : 'Загрузить картинку'}
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
            {picture && picture?.name}
          </Box>
          <Button
            type="submit"
            sx={{
              width: 'fit-content',
            }}
            variant="contained"
          >
            Создать
          </Button>
        </Stack>
      </form>
    </Layout>
  );
};

export default AddSection;

AddSection.is_auth = true;
