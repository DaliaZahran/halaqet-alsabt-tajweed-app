const categories = [
  {
    id: "1",
    title: "النون والميم المشددتين",
    image: "../assets/images/favicon.png",
  },
  {
    id: "2",
    title: "النون الساكنة والتنوين - الإخفاء",
    image: require("../assets/images/favicon.png"),
  },
  {
    id: "3",
    title: "النون الساكنة والتنوين - الإظهار",
    image: require("../assets/images/favicon.png"),
  },
  {
    id: "4",
    title: "النون الساكنة والتنوين - الإدغام",
    image: require("../assets/images/favicon.png"),
  },
  {
    id: "5",
    title: "النون الساكنة والتنوين - الإقلاب",
    image: require("../assets/images/favicon.png"),
  },
];

const questions = [
  {
    id: "1",
    title: "ما هو أول حروف اللغة العربية؟",
    correct_answer: "أ",
    incorrect_answers: ["س", "ب", "ي"],
    difficulty: "Easy",
  },
  {
    id: "1",
    title: "ما هو آخر حروف اللغة العربية؟",
    correct_answer: "ي",
    incorrect_answers: ["س", "ب", "ي"],
    difficulty: "Easy",
  },
];

export { categories, questions };
