import { useQuery } from '@tanstack/react-query';
import { welcomeDashboardApi } from '../../Apis/appApis';

export function useWelcomeQuery(accessToken) {
  const { data, isError, error, isSuccess } = useQuery({
    queryKey: ['welcome_dashboard_protected_query'],
    queryFn: () => welcomeDashboardApi(accessToken),
    refetchOnWindowFocus: false,
    retry: false,
  });

  return { data, isError, error, isSuccess };
}
