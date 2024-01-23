import Prompt from "@models/prompt";
import { connectToDb } from "@utils/database";

export const revalidate = 1; //revalidate api every 1 second
export const dynamic = "force-dynamic";
export const GET = async (request) => {
  try {
    await connectToDb();

    const prompts = await Prompt.find({}).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
