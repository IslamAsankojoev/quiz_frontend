import { ILesson, LessonService } from '@/api/lesson.service';
import { ISection, SectionService } from '@/api/section.service';
import useRole from '@/hooks/useRole';
import { Button, Card, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { useMutation, useQuery } from 'react-query';
import Block from './Block';

const SectionCard: FC<
  ISection & {
    access: boolean;
  }
> = ({ id, name, description, picture, material, status, test, access = true }) => {
  const { isTeacher } = useRole();
  const router = useRouter();

  const { data: lessons } = useQuery('materials', LessonService.findAll, {
    select: (data: ILesson[]) => data,
  });

  const { mutate: deleteSection } = useMutation(
    'deleteSection',
    (id: number) => SectionService.delete(id),
    {
      onSuccess: () => {
        router.reload();
      },
    },
  );
  return (
    <Card
      sx={{
        backgroundColor: '#D9D9D9',
        borderRadius: '20px',
        padding: '20px',
        position: 'relative',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={picture}
        alt={name + picture}
        style={{
          width: '100%',
          height: '150px',
          borderRadius: '20px',
        }}
      />
      <h2>{name}</h2>
      <p>{description}</p>
      <p>{lessons?.find((lesson) => lesson.id === material)?.duration}</p>
      <Stack spacing={1}>
        <Button
          variant="contained"
          size="small"
          onClick={() => {
            router.push(`/lesson/${material}`);
          }}
        >
          {isTeacher ? 'Изменить материал' : 'Посмотреть материал'}
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={() => {
            router.push(`/test/${test}`);
          }}
        >
          {isTeacher ? 'Изменить тест' : 'Пройти тест'}
        </Button>
        {isTeacher && (
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => {
              // @ts-ignore
              deleteSection(id);
            }}
          >
            Удалить
          </Button>
        )}
      </Stack>
      {!isTeacher && !access && <Block />}
    </Card>
  );
};

export default SectionCard;
