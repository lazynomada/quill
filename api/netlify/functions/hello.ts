import type { Context } from "@netlify/functions";
import HelloWorld from "@/HelloWorld";

export default async (req: Request, context: Context) => {
  return new Response(HelloWorld())
}