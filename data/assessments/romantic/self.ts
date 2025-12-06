import type { Question } from "@/types/assessment";

export const romanticSelfQuestions: Question[] = [
  // Boundaries
  {
    block: "Boundaries",
    question:
      "I look through my partner's private belongings without them knowing.",
    answers: [
      { text: "Strongly Agree", value: -3 },
      { text: "Somewhat Agree", value: -2 },
      { text: "Somewhat Disagree", value: 0 },
      { text: "Strongly Disagree", value: 2 },
    ],
  },
  {
    block: "Boundaries",
    question:
      "I am comfortable telling my partner that I don't like something or that I don't like being spoken to in a certain way.",
    answers: [
      { text: "Strongly Agree", value: 3 },
      { text: "Somewhat Agree", value: 2 },
      { text: "Somewhat Disagree", value: -1 },
      { text: "Strongly Disagree", value: -2 },
    ],
  },
  {
    block: "Boundaries",
    question:
      "I set sexual boundaries and understand when my partner doesn't want to have sex.",
    answers: [
      { text: "Strongly Agree", value: 3 },
      { text: "Somewhat Agree", value: 1 },
      { text: "Somewhat Disagree", value: -2 },
      { text: "Strongly Disagree", value: -3 },
    ],
  },
  {
    block: "Boundaries",
    question: "When my partner needs time alone...",
    answers: [
      { text: "I get angry.", value: -3 },
      { text: "I encourage them to take the time they need.", value: 3 },
      { text: "I try to make them jealous.", value: -3 },
      { text: "I try to keep spending time with them.", value: -3 },
    ],
  },
  {
    block: "Boundaries",
    question: "I value my partner's wants and needs.",
    answers: [
      { text: "Strongly Agree", value: 2 },
      { text: "Somewhat Agree", value: 1 },
      { text: "Somewhat Disagree", value: -1 },
      { text: "Strongly Disagree", value: -2 },
    ],
  },
  // Communication
  {
    block: "Communication",
    question:
      "When I am upset with my partner, I raise my voice or call them names.",
    answers: [
      { text: "Strongly Agree", value: -3 },
      { text: "Somewhat Agree", value: -2 },
      { text: "Somewhat Disagree", value: 0 },
      { text: "Strongly Disagree", value: 2 },
    ],
  },
  {
    block: "Communication",
    question: "When I disagree with my partner, I criticize their perspective.",
    answers: [
      { text: "Strongly Agree", value: -2 },
      { text: "Somewhat Agree", value: -1 },
      { text: "Somewhat Disagree", value: 1 },
      { text: "Strongly Disagree", value: 2 },
    ],
  },
  {
    block: "Communication",
    question:
      "I can have an open and honest conversation with my partner when we are in disagreement.",
    answers: [
      { text: "Strongly Agree", value: 2 },
      { text: "Somewhat Agree", value: 1 },
      { text: "Somewhat Disagree", value: -1 },
      { text: "Strongly Disagree", value: -2 },
    ],
  },
  {
    block: "Communication",
    question:
      "When my partner does something that upsets me, I don't say anything because I would rather not get into an argument.",
    answers: [
      { text: "Strongly Agree", value: -2 },
      { text: "Somewhat Agree", value: -1 },
      { text: "Somewhat Disagree", value: 1 },
      { text: "Strongly Disagree", value: 2 },
    ],
  },
  {
    block: "Communication",
    question:
      "I interrupt my partner or try to finish their sentences for them.",
    answers: [
      { text: "Strongly Agree", value: -2 },
      { text: "Somewhat Agree", value: -1 },
      { text: "Somewhat Disagree", value: 0 },
      { text: "Strongly Disagree", value: 2 },
    ],
  },
  // Trust
  {
    block: "Trust",
    question:
      "If my partner shares something private with me, I make sure to keep it between us unless I have permission to share.",
    answers: [
      { text: "Strongly Agree", value: 3 },
      { text: "Somewhat Agree", value: 1 },
      { text: "Somewhat Disagree", value: -2 },
      { text: "Strongly Disagree", value: -3 },
    ],
  },
  {
    block: "Trust",
    question:
      "Sometimes I am scared of telling my partner things because I don't want to be judged by them.",
    answers: [
      { text: "Strongly Agree", value: -2 },
      { text: "Somewhat Agree", value: -1 },
      { text: "Somewhat Disagree", value: 1 },
      { text: "Strongly Disagree", value: 2 },
    ],
  },
  {
    block: "Trust",
    question: "I make promises that I later don't follow through with.",
    answers: [
      { text: "Strongly Agree", value: -2 },
      { text: "Somewhat Agree", value: -1 },
      { text: "Somewhat Disagree", value: 1 },
      { text: "Strongly Disagree", value: 2 },
    ],
  },
  {
    block: "Trust",
    question: "I am faithful to my partner when they're not around.",
    answers: [
      { text: "Strongly Agree", value: 3 },
      { text: "Somewhat Agree", value: 1 },
      { text: "Somewhat Disagree", value: -2 },
      { text: "Strongly Disagree", value: -3 },
    ],
  },
  {
    block: "Trust",
    question: "My words match with my actions, and vice versa.",
    answers: [
      { text: "Strongly Agree", value: 2 },
      { text: "Somewhat Agree", value: 1 },
      { text: "Somewhat Disagree", value: -1 },
      { text: "Strongly Disagree", value: -2 },
    ],
  },
  // Freedom
  {
    block: "Freedom",
    question: "If my partner ends the relationship, I would...",
    answers: [
      { text: "Try to understand or see if there's a resolution.", value: 1 },
      {
        text: "Threaten them, hurt them/myself, or damage their property.",
        value: -4,
      },
      { text: "Keep trying to gain access to them.", value: -2 },
      { text: "Stop talking to them", value: 0 },
    ],
  },
  {
    block: "Freedom",
    question:
      "My partner needs to ask me permission in order to see their friends and family, or go somewhere.",
    answers: [
      { text: "Strongly Agree", value: -3 },
      { text: "Somewhat Agree", value: -2 },
      { text: "Somewhat Disagree", value: 0 },
      { text: "Strongly Disagree", value: 3 },
    ],
  },
  {
    block: "Freedom",
    question:
      "I support my partner to explore their interests even if they differ from mine.",
    answers: [
      { text: "Strongly Agree", value: 2 },
      { text: "Somewhat Agree", value: 1 },
      { text: "Somewhat Disagree", value: -1 },
      { text: "Strongly Disagree", value: -2 },
    ],
  },
  {
    block: "Freedom",
    question: "My partner can spend their money as they wish.",
    answers: [
      { text: "Strongly Agree", value: 2 },
      { text: "Somewhat Agree", value: 0 },
      { text: "Somewhat Disagree", value: -1 },
      { text: "Strongly Disagree", value: -2 },
    ],
  },
  {
    block: "Freedom",
    question: "I keep track of who my partner communicates with.",
    answers: [
      { text: "Strongly Agree", value: -2 },
      { text: "Somewhat Agree", value: -1 },
      { text: "Somewhat Disagree", value: 0 },
      { text: "Strongly Disagree", value: 2 },
    ],
  },
  // Conflict Resolution
  {
    block: "Conflict Resolution",
    question:
      "My partner and I are arguing about where to go for date night. How do you resolve this issue?",
    answers: [
      { text: "I argue until I win.", value: -2 },
      {
        text: "I let my partner decide, but I am not happy with the decision.",
        value: -2,
      },
      {
        text: "I'm okay with going where my partner wants this time and saving my option for another time.",
        value: 1,
      },
      { text: "I cancel date night.", value: -2 },
    ],
  },
  {
    block: "Conflict Resolution",
    question:
      "When my partner and I disagree about something, I am more likely to yell at them rather than have a calm discussion.",
    answers: [
      { text: "Strongly Agree", value: -2 },
      { text: "Somewhat Agree", value: -1 },
      { text: "Somewhat Disagree", value: 0 },
      { text: "Strongly Disagree", value: 2 },
    ],
  },
  {
    block: "Conflict Resolution",
    question:
      "I try to understand my partner's perspective without getting defensive.",
    answers: [
      { text: "Strongly Agree", value: 2 },
      { text: "Somewhat Agree", value: 1 },
      { text: "Somewhat Disagree", value: -1 },
      { text: "Strongly Disagree", value: -2 },
    ],
  },
  {
    block: "Conflict Resolution",
    question:
      "After a conflict, I check in with my partner to see how they're feeling.",
    answers: [
      { text: "Strongly Agree", value: 2 },
      { text: "Somewhat Agree", value: 1 },
      { text: "Somewhat Disagree", value: -1 },
      { text: "Strongly Disagree", value: -2 },
    ],
  },
  {
    block: "Conflict Resolution",
    question: "When my partner says that I hurt them,...",
    answers: [
      {
        text: "I acknowledge the impact of my actions, apologize, and try to never hurt them again.",
        value: 3,
      },
      {
        text: "I say that I understand, but that I had good intentions.",
        value: 1,
      },
      { text: "I tell them that they're being sensitive.", value: -3 },
      {
        text: "I quickly apologize to move away from the conflict.",
        value: -2,
      },
    ],
  },
  // Compatibility
  {
    block: "Compatibility",
    question: "I am attracted to my partner.",
    answers: [
      { text: "Strongly Agree", value: 2 },
      { text: "Somewhat Agree", value: 1 },
      { text: "Somewhat Disagree", value: -2 },
      { text: "Strongly Disagree", value: -3 },
    ],
  },
  {
    block: "Compatibility",
    question:
      "I support my partner's relationships with their friends and family.",
    answers: [
      { text: "Strongly Agree", value: 2 },
      { text: "Somewhat Agree", value: 1 },
      { text: "Somewhat Disagree", value: -1 },
      { text: "Strongly Disagree", value: -2 },
    ],
  },
  {
    block: "Compatibility",
    question:
      "I respect my partner's core values, even if I don't agree with them",
    answers: [
      { text: "Strongly Agree", value: 2 },
      { text: "Somewhat Agree", value: 1 },
      { text: "Somewhat Disagree", value: -1 },
      { text: "Strongly Disagree", value: -2 },
    ],
  },
  {
    block: "Compatibility",
    question: "I enjoy learning about my partner and their passions.",
    answers: [
      { text: "Strongly Agree", value: 2 },
      { text: "Somewhat Agree", value: 1 },
      { text: "Somewhat Disagree", value: -1 },
      { text: "Strongly Disagree", value: -2 },
    ],
  },
  {
    block: "Compatibility",
    question:
      "I help my partner grow and am a positive influence on their behavior.",
    answers: [
      { text: "Strongly Agree", value: 3 },
      { text: "Somewhat Agree", value: 2 },
      { text: "Somewhat Disagree", value: -2 },
      { text: "Strongly Disagree", value: -3 },
    ],
  },
  // Respect
  {
    block: "Respect",
    question:
      "I appreciate my partner's efforts and I constantly show them my appreciation.",
    answers: [
      { text: "Strongly Agree", value: 2 },
      { text: "Somewhat Agree", value: 1 },
      { text: "Somewhat Disagree", value: -1 },
      { text: "Strongly Disagree", value: -2 },
    ],
  },
  {
    block: "Respect",
    question:
      "I understand my own value and will not let my partner treat me or speak to me in a way that is demeaning.",
    answers: [
      { text: "Strongly Agree", value: 3 },
      { text: "Somewhat Agree", value: 1 },
      { text: "Somewhat Disagree", value: -2 },
      { text: "Strongly Disagree", value: -3 },
    ],
  },
  {
    block: "Respect",
    question: "I view my partner as my equal.",
    answers: [
      { text: "Strongly Agree", value: 2 },
      { text: "Somewhat Agree", value: 0 },
      { text: "Somewhat Disagree", value: -1 },
      { text: "Strongly Disagree", value: -2 },
    ],
  },
  {
    block: "Respect",
    question:
      "I understand when my partner is busy and I try to lighten their load.",
    answers: [
      { text: "Strongly Agree", value: 2 },
      { text: "Somewhat Agree", value: 1 },
      { text: "Somewhat Disagree", value: -1 },
      { text: "Strongly Disagree", value: -2 },
    ],
  },
  {
    block: "Respect",
    question: "I neglect my partner when I'm around my friends.",
    answers: [
      { text: "Strongly Agree", value: -3 },
      { text: "Somewhat Agree", value: -2 },
      { text: "Somewhat Disagree", value: 0 },
      { text: "Strongly Disagree", value: 2 },
    ],
  },
  // Honesty
  {
    block: "Honesty",
    question: "I clearly express my intentions and feelings to my partner",
    answers: [
      { text: "Strongly Agree", value: 3 },
      { text: "Somewhat Agree", value: 2 },
      { text: "Somewhat Disagree", value: -1 },
      { text: "Strongly Disagree", value: -2 },
    ],
  },
  {
    block: "Honesty",
    question:
      "I encourage my partner to be honest about their feelings rather than sugarcoat them in order to protect my feelings.",
    answers: [
      { text: "Strongly Agree", value: 2 },
      { text: "Somewhat Agree", value: 1 },
      { text: "Somewhat Disagree", value: -1 },
      { text: "Strongly Disagree", value: -2 },
    ],
  },
  {
    block: "Honesty",
    question: "I lie/have lied to my partner.",
    answers: [
      { text: "Strongly Agree", value: -2 },
      { text: "Somewhat Agree", value: -1 },
      { text: "Somewhat Disagree", value: 1 },
      { text: "Strongly Disagree", value: 2 },
    ],
  },
  {
    block: "Honesty",
    question: "If you cheat on your partner, how do you tell them?",
    answers: [
      { text: "I tell them as soon as I can.", value: 2 },
      { text: "I wait until it's the right time to tell them.", value: 1 },
      {
        text: "I don't tell them because I don't want them to leave me.",
        value: -2,
      },
      {
        text: "I don't tell them because I'm scared they will hurt me.",
        value: -3,
      },
    ],
  },
  {
    block: "Honesty",
    question:
      "I make excuses when I say/do things that make my partner upset/uncomfortable.",
    answers: [
      { text: "Strongly Agree", value: -3 },
      { text: "Somewhat Agree", value: -2 },
      { text: "Somewhat Disagree", value: 1 },
      { text: "Strongly Disagree", value: 2 },
    ],
  },
  // Safety
  {
    block: "Safety",
    question: "I let my partner know that I like/love them.",
    answers: [
      { text: "Strongly Agree", value: 2 },
      { text: "Somewhat Agree", value: 1 },
      { text: "Somewhat Disagree", value: -1 },
      { text: "Strongly Disagree", value: -2 },
    ],
  },
  {
    block: "Safety",
    question: "I allow my partner to be their most authentic self.",
    answers: [
      { text: "Strongly Agree", value: 3 },
      { text: "Somewhat Agree", value: 1 },
      { text: "Somewhat Disagree", value: -1 },
      { text: "Strongly Disagree", value: -3 },
    ],
  },
  {
    block: "Safety",
    question: "I have...",
    answers: [
      { text: "Hit my partner once.", value: -4 },
      { text: "Hit my partner multiple times.", value: -4 },
      { text: "Never hit my partner.", value: 3 },
      { text: "Almost hit my partner.", value: -2 },
    ],
  },
  {
    block: "Safety",
    question: "I always want the best for my partner.",
    answers: [
      { text: "Strongly Agree", value: 3 },
      { text: "Somewhat Agree", value: 1 },
      { text: "Somewhat Disagree", value: -2 },
      { text: "Strongly Disagree", value: -3 },
    ],
  },
  {
    block: "Safety",
    question:
      "I criticize my partner or try to change them to fit my image of beauty.",
    answers: [
      { text: "Strongly Agree", value: -3 },
      { text: "Somewhat Agree", value: -2 },
      { text: "Somewhat Disagree", value: 1 },
      { text: "Strongly Disagree", value: 2 },
    ],
  },
  // Understanding
  {
    block: "Understanding",
    question:
      "I share my feelings with my partner and encourage my partner to do the same.",
    answers: [
      { text: "Strongly Agree", value: 2 },
      { text: "Somewhat Agree", value: 1 },
      { text: "Somewhat Disagree", value: -1 },
      { text: "Strongly Disagree", value: -2 },
    ],
  },
  {
    block: "Understanding",
    question:
      "I am there for my partner when they feel sad, anxious, confused, etc.",
    answers: [
      { text: "Strongly Agree", value: 2 },
      { text: "Somewhat Agree", value: 1 },
      { text: "Somewhat Disagree", value: -1 },
      { text: "Strongly Disagree", value: -2 },
    ],
  },
  {
    block: "Understanding",
    question: "I ask my partner what they want or need instead of assuming.",
    answers: [
      { text: "Strongly Agree", value: 3 },
      { text: "Somewhat Agree", value: 2 },
      { text: "Somewhat Disagree", value: -1 },
      { text: "Strongly Disagree", value: -2 },
    ],
  },
  {
    block: "Understanding",
    question:
      "I try to put myself in my partner's shoes to better understand what they are feeling.",
    answers: [
      { text: "Strongly Agree", value: 3 },
      { text: "Somewhat Agree", value: 2 },
      { text: "Somewhat Disagree", value: -2 },
      { text: "Strongly Disagree", value: -3 },
    ],
  },
  {
    block: "Understanding",
    question:
      "I don't make conclusions about my partner until I completely understand them and their feelings.",
    answers: [
      { text: "Strongly Agree", value: 2 },
      { text: "Somewhat Agree", value: 1 },
      { text: "Somewhat Disagree", value: -1 },
      { text: "Strongly Disagree", value: -2 },
    ],
  },
];
