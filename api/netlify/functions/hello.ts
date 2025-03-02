import type { Context } from "@netlify/functions";
import HelloWorldInterceptor from "@/interceptors/HelloWorldInterceptor";

export default async (req: Request, context: Context) => {
  const interceptor = new HelloWorldInterceptor();

  const result = interceptor.get("Nomada")

  if (result.error) {
    return new Response('response not allowed', { status: 402 })
  }

  return new Response(result.data);
}