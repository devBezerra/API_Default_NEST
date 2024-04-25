import { applyDecorators } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { apiOperationDescription as description, studentMock as example } from './students-mocks.docs';

export function FindOneStudentDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna um aluno de acordo com o id passado.',
      description,
    }),

    ApiNotFoundResponse({ description: 'Não foi possível encontrar o aluno.' }),

    ApiOkResponse({
      schema: { example },
    }),
  );
}
