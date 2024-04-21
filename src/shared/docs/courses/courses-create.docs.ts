import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateCourseDto } from 'src/modules/courses/dto/create-course.dto';
import { courseMock, apiOperationDescription as description } from './courses-mocks.docs';

export function CreateCourseDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Retorna uma mensagem de sucesso e o curso criado.',
      description
    }),

    ApiBody({ type: CreateCourseDto }),

    ApiCreatedResponse({
      status: 201,
      description: 'O curso foi criado com sucesso.',
      schema: {
        example: courseMock
      },
    }),

    ApiBadRequestResponse({ description: 'Não foi possível criar o curso.' }),
  );
}
