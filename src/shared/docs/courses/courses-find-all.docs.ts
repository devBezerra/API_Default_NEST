import { applyDecorators } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { apiOperationDescription as description, courseMock, courseMock2 } from './courses-mocks.docs';

export function FindAllCoursesDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna um array contendo todos os cursos.',
      description
    }),

    ApiNotFoundResponse({ description: 'Não foi possível encontrar os cursos.' }),

    ApiOkResponse({
      schema: {
        example: [courseMock, courseMock2],
      },
    }),
  );
}
