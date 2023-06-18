import { IQuestion, QuestionService } from '@/api/question.service';
import { ISection, SectionService } from '@/api/section.service';
import { ITesting, TestingService } from '@/api/testing.service';
import Layout from '@/components/Layout';
import useRole from '@/hooks/useRole';
import { NextPageAuth } from '@/types/auth.types';
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';

function shuffleArray(array: any) {
  for (let i = array?.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const TestPage: NextPageAuth = () => {
  const router = useRouter();
  const { isTeacher } = useRole();
  const { data: test } = useQuery('test', () => TestingService.findOne(Number(router?.query?.id)), {
    enabled: !!router?.query?.id,
    select: (data: ITesting) => data,
  });

  const { data: sections } = useQuery('sections', () => SectionService.findAll(), {
    select: (data: ISection[]) => data,
  });

  const { data: questions, refetch } = useQuery('questions', () => QuestionService.findAll(), {
    // @ts-ignore
    select: (data: IQuestion[]) => data.filter((el: IQuestion) => el?.test === test?.id),
  });

  const { mutate: updateQuestion } = useMutation(
    'updateQuestion',
    (data: IQuestion) => QuestionService.update(Number(data?.id), data),
    {
      onSuccess: () => {
        router.push('/profile');
      },
    },
  );
  const { mutate: createQuestion } = useMutation(
    'createQuestion',
    (data: IQuestion) => QuestionService.create(data),
    {
      onSuccess: () => {
        refetch();
      },
    },
  );

  const { mutate: deleteQuestion } = useMutation(
    'deleteQuestion',
    (id: number) => QuestionService.delete(id),
    {
      onSuccess: () => {
        refetch();
      },
    },
  );

  const { control, handleSubmit } = useForm({
    defaultValues: {
      question_text: '',
      choice1: '',
      choice2: '',
      choice3: '',
      correct_answer: '',
    },
  });

  const { control: control2, handleSubmit: handleSubmit2, setValue, trigger } = useForm();

  const onSubmitTest = async (data: any) => {
    const dataArray = Object.entries(data).map(([key, value]) => ({
      key: key.replace('question_', ''),
      value,
    }));

    const testings = dataArray?.map(async ({ key, value }) => {
      updateQuestion({
        user_answer: value,
        id: key,
      } as any);
    });

    await Promise.all(testings);

    router.push('/profile');
  };

  const onSubmit = (data: IQuestion) => {
    // @ts-ignore
    if (questions?.length >= 10) {
      alert('Максимальное количество вопросов 10');
      return;
    }
    createQuestion({
      ...data,
      // @ts-ignore
      test: test?.id,
    });
  };

  return (
    <Layout>
      {isTeacher && (
        <>
          <br />
          <Typography variant="h5">Тест</Typography>
          <br />
          <br />
          <Typography>Добавить вопрос</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={1}>
              <Controller
                name="question_text"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Вопрос"
                    variant="filled"
                    {...field}
                    multiline
                    rows={4}
                    size="small"
                  />
                )}
              />
              <Controller
                name="choice1"
                control={control}
                render={({ field }) => (
                  <TextField label="Вариант 1" variant="filled" size="small" {...field} />
                )}
              />
              <Controller
                name="choice2"
                control={control}
                render={({ field }) => (
                  <TextField label="Вариант 2" variant="filled" size="small" {...field} />
                )}
              />
              <Controller
                name="choice3"
                control={control}
                render={({ field }) => (
                  <TextField label="Вариант 3" variant="filled" size="small" {...field} />
                )}
              />
              <Controller
                name="correct_answer"
                control={control}
                render={({ field }) => (
                  <TextField label="Правильный ответ" variant="filled" {...field} />
                )}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  width: 'fit-content',
                }}
              >
                Создать вопрос
              </Button>
            </Stack>
          </form>
          <br />
          <Typography>Все вопросы</Typography>
          <br />
          <Stack spacing={2}>
            {questions?.map((el: IQuestion) => (
              <Stack
                key={el?.id}
                spacing={2}
                sx={{
                  backgroundColor: '#f5f5f5',
                  padding: '20px',
                  borderRadius: '20px',
                }}
              >
                <Typography>{el?.question_text}</Typography>
                <Stack direction="row" spacing={2}>
                  <Typography
                    sx={{
                      padding: '5px 10px',
                      backgroundColor: '#d7d7d7',
                      borderRadius: '10px',
                      fontWeight: el?.correct_answer === el?.choice1 ? 'bold' : 'normal',
                      color: el?.correct_answer === el?.choice1 ? 'green' : 'black',
                    }}
                  >
                    {el?.choice1}
                  </Typography>
                  <Typography
                    sx={{
                      padding: '5px 10px',
                      backgroundColor: '#d7d7d7',
                      borderRadius: '10px',
                      fontWeight: el?.correct_answer === el?.choice2 ? 'bold' : 'normal',
                      color: el?.correct_answer === el?.choice2 ? 'green' : 'black',
                    }}
                  >
                    {el?.choice2}
                  </Typography>
                  <Typography
                    sx={{
                      padding: '5px 10px',
                      backgroundColor: '#d7d7d7',
                      borderRadius: '10px',
                      fontWeight: el?.correct_answer === el?.choice3 ? 'bold' : 'normal',
                      color: el?.correct_answer === el?.choice3 ? 'green' : 'black',
                    }}
                  >
                    {el?.choice3}
                  </Typography>
                  <Button
                    color="error"
                    onClick={() => {
                      // @ts-ignore
                      deleteQuestion(el?.id);
                    }}
                  >
                    удалить
                  </Button>
                </Stack>
              </Stack>
            ))}
          </Stack>
          <br />
        </>
      )}
      <br />

      {!isTeacher && (
        <>
          <br />
          <Typography variant="h5">
            Пройти тест - {sections?.find((el: ISection) => el?.test === test?.id)?.name}
          </Typography>
          <br />
          <Stack>
            <form onSubmit={handleSubmit2(onSubmitTest)}>
              <Stack direction="column" spacing={4}>
                {shuffleArray(questions)?.map((question: IQuestion) => (
                  <Stack
                    key={question.id}
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-start"
                  >
                    <FormControl>
                      <FormLabel id={question.question_text}>
                        <Typography variant="h6">{question.question_text}</Typography>
                      </FormLabel>
                      <Controller
                        control={control2}
                        name={`question_${question.id}`} // Уникальное имя для каждого вопроса
                        rules={{ required: true }} // Добавьте правила валидации, если необходимо
                        render={({ field }) => (
                          <RadioGroup
                            row
                            aria-labelledby={question.question_text}
                            name="row-radio-buttons-group"
                          >
                            <FormControlLabel
                              value={question.choice1}
                              control={<Radio />}
                              label={question.choice1}
                              required
                              onChange={(e: any) => {
                                setValue(`question_${question.id}`, e?.target?.value);
                                trigger(`question_${question.id}`);
                              }}
                            />
                            <FormControlLabel
                              value={question.choice2}
                              control={<Radio />}
                              label={question.choice2}
                              required
                              onChange={(e: any) => {
                                setValue(`question_${question.id}`, e?.target?.value);
                                trigger(`question_${question.id}`);
                              }}
                            />
                            <FormControlLabel
                              value={question.choice3}
                              control={<Radio />}
                              label={question.choice3}
                              required
                              onChange={(e: any) => {
                                setValue(`question_${question.id}`, e?.target?.value);
                                trigger(`question_${question.id}`);
                              }}
                            />
                          </RadioGroup>
                        )}
                      />
                    </FormControl>
                  </Stack>
                ))}
              </Stack>
              <br />
              <Button type="submit" variant="contained">
                Оправить
              </Button>
            </form>
          </Stack>
        </>
      )}
    </Layout>
  );
};

export default TestPage;

TestPage.is_auth = true;
