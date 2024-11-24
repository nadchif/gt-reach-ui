const errorsMap: Record<string, string> = {
  STREAM_CLOSED: 'The stream has been closed',
  BROADCAST_NOT_FOUND: 'The stream you are looking for does not exist',
};
export const formatErrorMessage = (message: string): string => errorsMap[message] || message;
