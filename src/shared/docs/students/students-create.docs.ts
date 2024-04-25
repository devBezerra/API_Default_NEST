import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateStudentDto } from 'src/modules/students/dto/create-student.dto';
import { apiOperationDescription as description, studentMock as example } from './students-mocks.docs';

export function CreateStudentDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna uma mensagem de sucesso e o aluno criado.',
      description,
    }),

    ApiBody({ type: CreateStudentDto }),

    ApiCreatedResponse({
      status: 201,
      description: 'O aluno foi criado com sucesso.',
      schema: { example },
    }),

    ApiBadRequestResponse({ description: 'Não foi possível criar o aluno.' }),
  );
}
