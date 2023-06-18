import { ILesson, LessonService } from '@/api/lesson.service';
import { ISection, SectionService } from '@/api/section.service';
import Layout from '@/components/Layout';
import SectionCard from '@/components/SectionCard';
import useRole from '@/hooks/useRole';
import { NextPageAuth } from '@/types/auth.types';
import { Button, Grid, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { useQuery } from 'react-query';

const Course: NextPageAuth = () => {
  const { isTeacher } = useRole();
  const router = useRouter();
  const { data: sections } = useQuery('sections', SectionService.findAll, {
    select: (data: ISection[]) => data,
  });

  return (
    <Layout>
      <br />
      <br />
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <h1>Список разделов</h1>
        {isTeacher && (
          <Button
            variant="contained"
            onClick={() => {
              router.push('/section/create');
            }}
          >
            Добавить раздел
          </Button>
        )}
      </Stack>
      <Grid container spacing={2}>
        {sections?.map((section, index) => (
          <Grid item key={section.id} xs={12} sm={12} md={3}>
            <SectionCard {...section} access={sections[index - 1]?.status as any} />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default Course;

Course.is_auth = true;
