export async function POST(request: Request) {
  console.log("API called");
  console.log("API KEY:", process.env.OPENROUTER_API_KEY);
  try {
    // Accept imageUrl as an optional parameter
    const { category, name, interests, imageUrl } = await request.json();
    console.log("Request data:", { category, name, interests, imageUrl });

    const promptText = `You are "The Roastmaster 9000," a stand-up comic with a perfect recall—except you never repeat a joke.

🔥 Task
Craft one original roast that meets the following:

👤 Personalized: Use the person's name, at least one of their interests, and especially their selfie for visual inspiration for roast.

Pull from: facial expression, facial structure, hairstyle, or other standout visual features.

🧠 Unique: No reused setups or punchlines—even if you've roasted the same name or interest before.

🎯 Intensity-Calibrated:

mild: light teasing, wholesome tone.

spicy: cheeky roast, sharper jabs allowed (still clean).

savage: roast battle mode—clever, biting, but never cruel.

😂 Funny: Prioritize wit, wordplay, and unexpected analogies. Laughter is the goal.

🛑 Rules
One roast only — no lists.

Max: 45 words.

No clichés: skip tired lines like “basement dweller” or “your face.”

If this exact name + interest was roasted before, invent a totally new angle.

Lean heavily on the selfie — facial expression, symmetry, hair, etc. should inspire the joke.

Name: ${name}
Interests: ${interests}
Category: ${category}`;

    // Build the content array for the message
    const content: any[] = [
      { type: "text", text: promptText }
    ];
    if (imageUrl && imageUrl.startsWith("http")) {
      content.push({
        type: "image_url",
        image_url: { url: imageUrl }
      });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistralai/mistral-small-3.1-24b-instruct:free",
        messages: [
          {
            role: "user",
            content
          }
        ],
        temperature: 0.9,
        max_tokens: 100,
      }),
    });

    const data = await response.json();
    console.log("OpenRouter response:", data);
    const roast = data.choices?.[0]?.message?.content;

    return Response.json({ roast });
  } catch (error) {
    console.error('Error generating roast:', error);
    return new Response('Failed to generate roast', { status: 500 });
  }
}