import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { apiOperationDescription as description, studentMock as example } from './students-mocks.docs';
import { UpdateStudentDto } from 'src/modules/students/dto/update-student.dto';

export function UpdateStudentDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna uma mensagem de sucesso e o aluno editado.',
      description,
    }),

    ApiBody({ type: UpdateStudentDto }),

    ApiCreatedResponse({
      status: 201,
      description: 'O aluno foi atualizado com sucesso.',
      schema: { example },
    }),

    ApiBadRequestResponse({ description: 'Não foi possível atualizar o aluno.' }),
  );
}
