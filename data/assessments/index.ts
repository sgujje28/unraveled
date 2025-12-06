import type {
  AssessmentCategory,
  AssessmentPerspective,
  Question,
} from "@/types/assessment";
import { romanticSelfQuestions } from "./romantic/self";

// TODO: Import other question sets when created
// import { romanticThemQuestions } from "./romantic/them";
// import { platonicSelfQuestions } from "./platonic/self";
// import { platonicThemQuestions } from "./platonic/them";
// import { professionalQuestions } from "./professional/index";

export function getAssessmentQuestions(
  category: AssessmentCategory,
  perspective?: AssessmentPerspective
): Question[] {
  if (category === "romantic") {
    if (perspective === "self") {
      return romanticSelfQuestions;
    }
    // TODO: Add romantic them questions
    // if (perspective === "them") {
    //   return romanticThemQuestions;
    // }
  }

  if (category === "platonic") {
    // TODO: Add platonic questions
    // if (perspective === "self") {
    //   return platonicSelfQuestions;
    // }
    // if (perspective === "them") {
    //   return platonicThemQuestions;
    // }
  }

  if (category === "professional") {
    // TODO: Add professional questions
    // return professionalQuestions;
  }

  // Fallback - return romantic self for now
  return romanticSelfQuestions;
}

export function getAssessmentTitle(
  category: AssessmentCategory,
  perspective?: AssessmentPerspective
): string {
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  if (perspective) {
    const perspectiveName =
      perspective.charAt(0).toUpperCase() + perspective.slice(1);
    return `${categoryName} Assessment (${perspectiveName})`;
  }

  return `${categoryName} Assessment`;
}
