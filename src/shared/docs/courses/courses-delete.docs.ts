import { applyDecorators } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export function DeleteCourseDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna uma mensagem de sucesso após deletar o curso de acordo com o ID.',
      description: '## Obs: Um curso não pode ser deletado se houver um ou mais alunos matriculados nele.',
    }),

    ApiNotFoundResponse({ description: 'Não foi possível encontrar o curso.' }),

    ApiOkResponse({
      description: 'Curso removido com sucesso.',
    }),
  );
}
