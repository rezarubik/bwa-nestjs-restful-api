import { z, ZodObject } from 'zod';

const CreateNewsSchema = z.object({
  title: z
    .string({
      required_error: 'Title is required',
      invalid_type_error: 'Title must be a string',
    })
    .min(1, {
      message: 'Title is required (minimal 1 character)',
    }),
  content: z.string({
    required_error: 'content is required',
    invalid_type_error: 'content must be a string',
  }),
  author_id: z
    .number({
      required_error: 'Author ID is required',
      invalid_type_error: 'Author ID must be a string',
    })
    .min(1, {
      message: 'Name is required (minimal 1 character)',
    }),
});
export class CreateNewsDto {
  static schema: ZodObject<any> = CreateNewsSchema;

  constructor(
    public readonly title: string,
    public readonly content: string,
    public readonly author_id: number,
  ) {}
}
