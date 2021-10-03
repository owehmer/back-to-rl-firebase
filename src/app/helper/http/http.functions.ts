export function getApiEndpointFromUrl(url: string): string | undefined {
  const subroutes = url?.toLowerCase()?.split('/') ?? [];

  if (subroutes.length < 3 || subroutes[1] !== 'api') {
    return undefined;
  }

  return subroutes[2] || undefined;
}
