import { useMutation } from '@tanstack/react-query';
import { uploadDocument } from '../../Apis/chatApis';

export function useFileUploadMutation() {
  const fileUploadMutation = useMutation({
    mutationFn: async function ({ accessToken, formData }) {
      const response = await uploadDocument(accessToken, formData);
      return response;
    },
  });

  return fileUploadMutation;
}
