import { applyDecorators } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { apiOperationDescription as description } from './courses-mocks.docs';

export function DeleteCourseDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna uma mensagem de sucesso após deletar de acordo com o ID.',
      description: description + '## Obs: Um curso não pode ser deletado se houver um ou mais alunos matriculados nele.',
    }),

    ApiNotFoundResponse({ description: 'Não foi possível encontrar o curso.' }),

    ApiOkResponse({
      description: 'Curso removido com sucesso.',
    }),
  );
}
