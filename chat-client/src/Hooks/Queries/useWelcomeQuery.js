import { useQuery } from '@tanstack/react-query';
import { welcomeDashboardApi } from '../../Apis/appApis';

export function useWelcomeQuery(accessToken) {
  const { data, isError } = useQuery({
    queryKey: ['welcome_dashboard_protected_query'],
    queryFn: () => welcomeDashboardApi(accessToken),
    refetchOnWindowFocus: false,
  });

  return { data, isError };
}
