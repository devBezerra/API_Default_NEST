import { applyDecorators } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { apiOperationDescription as description, courseMock as example } from './courses-mocks.docs';

export function FindOneCourseDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna um curso de acordo com o id passado.',
      description,
    }),

    ApiNotFoundResponse({ description: 'Não foi possível encontrar o curso.' }),

    ApiOkResponse({
      schema: { example },
    }),
  );
}
