import { IReview, ReviewService } from '@/api/review.service';
import { ISection, SectionService } from '@/api/section.service';
import Layout from '@/components/Layout';
import SectionCard from '@/components/SectionCard';
import useRole from '@/hooks/useRole';
import useTypedSession from '@/hooks/useTypedSession';
import { Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';

export default function Home() {
  const { isTeacher } = useRole();
  const { data: session } = useTypedSession();
  const router = useRouter();
  const { data: sections } = useQuery('sections', SectionService.findAll, {
    select: (data: ISection[]) => data,
  });

  const { data: reviews, refetch } = useQuery('reviews', () => ReviewService.findAll(), {
    select: (data: IReview[]) => data,
  });

  const { mutate: createReview } = useMutation(
    'createReview',
    (data: IReview) => ReviewService.create(data),
    {
      onSuccess: () => {
        refetch();
      },
    },
  );

  const { control, handleSubmit } = useForm({
    defaultValues: {
      review_text: '',
    },
  });

  const onSubmit = (data: IReview) => {
    createReview({
      ...data,
      user: session?.user?.id,
    });
  };

  return (
    <Layout>
      <br />
      <br />
      <Stack>
        <Typography variant="h6">
          Онлайн курс по Информационной безопасности - это обучающая программа, которая поможет вам
          научиться защищать свою конфиденциальную информацию от кибератак и других угроз в
          Интернете. На курсе вы изучите различные виды угроз, методы и технологии защиты
          информации, а также правильное использование паролей и защиту устройств и аккаунтов от
          несанкционированного доступа. Курс доступен на разных языках и предлагает гибкий график
          обучения.
          <Button
            onClick={() => {
              router.push('/section');
            }}
          >
            Пройти курс
          </Button>
        </Typography>

        <br />
        <br />

        <Typography variant="h6">Отзывы о курсе</Typography>
        <br />
        <Stack spacing={2}>
          {reviews?.map((review) => (
            <Stack
              key={review.id}
              sx={{
                backgroundColor: '#eee',
                borderRadius: '20px',
                padding: '10px',
                width: 'fit-content',
              }}
              direction="row"
            >
              <Typography variant="h6">{review.user_username}</Typography>
              <Typography variant="body2">{review.review_text}</Typography>
            </Stack>
          ))}
        </Stack>

        <br />

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack
            sx={{
              width: 400,
              maxWidth: '90%',
            }}
            spacing={2}
          >
            <Controller
              name="review_text"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Отзыв" variant="outlined" multiline rows={4} />
              )}
            />
            <Button type="submit" variant="contained">
              Оставить отзыв
            </Button>
          </Stack>
        </form>
      </Stack>
    </Layout>
  );
}
