import { Notify } from 'quasar';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function showError(message: any) {
  if (message) {
    message = !!message.non_field_errors
      ? message.non_field_errors[0]
      : !!message.username
      ? message.username[0]
      : message;
  }
  Notify.create({
    color: 'negative',
    position: 'top',
    message: message,
    icon: 'report_problem',
  });
}

export { showError };
