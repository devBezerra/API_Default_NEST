import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { courseMock, apiOperationDescription as description } from './courses-mocks.docs';
import { UpdateCourseDto } from 'src/modules/courses/dto/update-course.dto';

export function UpdateCourseDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna uma mensagem de sucesso e o curso editado.',
      description,
    }),

    ApiBody({ type: UpdateCourseDto }),

    ApiCreatedResponse({
      status: 201,
      description: 'O curso foi atualizado com sucesso.',
      schema: {
        example: courseMock,
      },
    }),

    ApiBadRequestResponse({ description: 'Não foi possível atualizar o curso.' }),
  );
}
