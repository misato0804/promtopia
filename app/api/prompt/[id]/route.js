import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()
        const prompt = await Prompt.findById(params.id).populate('creator')
        if(!prompt) return new Response("Prompt not found", { status: 404 })
        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
}

export const PATCH = async (request, { params }) => {
    const {prompt, tag} = await request.json()
    await connectToDB()
    try {
        const exitingPrompt = await Prompt.findById(params.id)
        if (!prompt) return new Response("Prompt not found", {status: 404})
        exitingPrompt.prompt = prompt;
        exitingPrompt.tag = tag;
        await exitingPrompt.save()
        return new Response(JSON.stringify(exitingPrompt), {status: 200})
    } catch (e) {
        return new Response("Failed to update prompt", { status: 500 })
    }
}

export const DELETE = async (request, { params }) => {
    await connectToDB()
    try {
        await Prompt.findByIdAndRemove(params.id)
        return new Response("Prompt successfully removed", {status: 200})
    } catch (e) {
        return new Response("Failed to remove prompt", { status: 500 })
    }
}