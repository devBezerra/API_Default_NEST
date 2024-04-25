export const apiOperationDescription = `
## As interfaces associadas a essa resposta é:

<code>interface StudentInterface {
  id: number;
  name: string;
  courses?: CourseInterface[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}</code>

<code>interface CourseInterface {
  id: number;
  description: string;
  syllabus: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}</code>
`;

export const studentMock = {
  id: 1,
  name: 'Arthuzinho',
  createdAt: '2024-04-25T16:04:51.000Z',
  updatedAt: '2024-04-25T16:30:05.000Z',
  deletedAt: null,
  courses: [
    {
      id: 1,
      description: 'Curso Teste',
    },
  ],
};

export const studentMock2 = {
  id: 2,
  name: "Nathanzinho",
  createdAt: '2024-04-20T20:12:53.000Z',
  updatedAt: '2024-04-20T20:12:53.000Z',
  deletedAt: null,
  courses: []
};
