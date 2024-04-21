import { applyDecorators } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { apiOperationDescription as description } from './courses-mocks.docs';

export function DeleteCourseDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna uma mensagem de sucesso após deletar de acordo com o ID.',
      description,
    }),

    ApiNotFoundResponse({ description: 'Não foi possível encontrar o curso.' }),

    ApiOkResponse({
      description: 'Curso removido com sucesso.'
    }),
  );
}
