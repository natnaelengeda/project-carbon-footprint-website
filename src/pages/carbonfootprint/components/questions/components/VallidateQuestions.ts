export function ValidateQuestions(mode: string | null, my_mode: string) {
  if (mode == "questions" && my_mode == "questions") {
    return false;
  } else if (mode == "answers" && my_mode == "answers") {
    return false;
  } else {
    return true;
  }
}
