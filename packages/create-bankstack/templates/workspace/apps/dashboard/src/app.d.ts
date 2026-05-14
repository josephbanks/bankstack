declare global {
  namespace App {
    interface Platform {
      env?: {
        API?: {
          fetch(
            request: RequestInfo | URL,
            init?: RequestInit,
          ): Promise<Response>;
        };
      };
    }
  }
}

export {};
