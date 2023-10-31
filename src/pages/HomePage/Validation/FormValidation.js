export const taskFormValidationSchema = {
  description: (value) =>
    value.length < 3 ? "Description must have at least 3 characters" : null,
  due_date: (value) =>
    value.length === 0 ? "Due date is a required field." : null,
};
