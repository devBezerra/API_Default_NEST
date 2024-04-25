import { applyDecorators } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { apiOperationDescription as description, studentMock, studentMock2 } from './students-mocks.docs';

export function FindAllStudentsDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna um array contendo todos os alunos.',
      description
    }),

    ApiNotFoundResponse({ description: 'Não foi possível encontrar os alunos.' }),

    ApiOkResponse({
      schema: {
        example: [studentMock, studentMock2],
      },
    }),
  );
}
