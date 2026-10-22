interface Window {
  umami?: {
    track: (event: string, data?: Record<string, any>) => void;
    identify: (userData: Record<string, any>) => void;
  };
}
