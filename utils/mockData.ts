export const mockRoasts = {
  mild: [
    "Your selfie has more filters than a Brita water pitcher. Your future's probably as carefully edited as your Instagram feed.",
    "Your hobbies say 'interesting person', but your selfie says 'I take 50 versions before posting'. Let's hope your personality has more depth than your photo editing skills.",
    "If your jokes were as polished as your profile picture, maybe people would actually laugh at them intentionally."
  ],
  spicy: [
    "Wow, with those interests, you're about as unique as a pumpkin spice latte in October. Your personality seems as filtered as that selfie.",
    "I've seen more authentic poses from mannequins. At least they don't pretend to be interesting by listing 'travel' as a personality trait.",
    "Your hairstyle screams 'I watched one TikTok tutorial' while your interests whisper 'I googled what cool people like in 2018.'"
  ],
  savage: [
    "That selfie angle is trying so hard to hide your insecurities that it developed its own anxiety disorder. Maybe next time, try photographing your personality... oh wait.",
    "You list your interests as if someone would actually be interested. The most fascinating thing about this picture is wondering why you thought it was worth sharing.",
    "You're trying so hard to look unique that you've become a perfect clone of every other 'different' person. Congratulations on being aggressively average while thinking you're special."
  ]
};

export const generateMockRoast = (category: 'mild' | 'spicy' | 'savage', name: string, interests: string): string => {
  const roasts = mockRoasts[category];
  const randomIndex = Math.floor(Math.random() * roasts.length);
  const baseRoast = roasts[randomIndex];
  
  // Personalize with name and interests if provided
  if (name && interests) {
    return `Oh, ${name}... ${baseRoast} And seriously, ${interests}? That's what you're going with?`;
  } else if (name) {
    return `Oh, ${name}... ${baseRoast}`;
  } else if (interests) {
    return `${baseRoast} And with interests like ${interests}, I'm not surprised.`;
  }
  
  return baseRoast;
};