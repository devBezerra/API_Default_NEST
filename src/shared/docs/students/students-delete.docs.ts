import { applyDecorators } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export function DeleteStudentDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna uma mensagem de sucesso após deletar o aluno de acordo com o ID.',
    }),

    ApiNotFoundResponse({ description: 'Não foi possível encontrar o aluno.' }),

    ApiOkResponse({
      description: 'Aluno removido com sucesso.',
    }),
  );
}
