const categories = [
  {
    id: "1",
    title: "النون والميم المشددتين",
    image: "../assets/images/favicon.png",
    questions: [
      {
        questionBody: "سؤال رقم ١",
        choices: ["اختيار ١١", "اختيار ١٢", "اختيار ١٣", "اختيار ١٤"],
        correctChoice: "اختيار ١٢",
      },
      {
        questionBody: "سؤال رقم ٢",
        choices: ["اختيار ٢١", "اختيار ٢٢", "اختيار ٢٣", "اختيار ٢٤"],
        correctChoice: "اختيار ٢٢",
      },
      {
        questionBody: "سؤال رقم ٣",
        choices: ["اختيار ٣١", "اختيار ٣٢", "اختيار ٣٣", "اختيار ٣٤"],
        correctChoice: "اختيار ٣٣",
      },
      {
        questionBody: "سؤال رقم ٤",
        choices: ["اختيار ٤١", "اختيار ٤٢", "اختيار ٤٣", "اختيار ٤٤"],
        correctChoice: "اختيار ٤٣",
      },
      {
        questionBody: "سؤال رقم ٥",
        choices: ["اختيار ٥١", "اختيار ٥٢", "اختيار ٥٣", "اختيار ٥٤"],
        correctChoice: "اختيار ٥٤",
      },
      {
        questionBody: "سؤال رقم ٦",
        choices: ["اختيار ٦١", "اختيار ٦٢", "اختيار ٦٣", "اختيار ٦٤"],
        correctChoice: "اختيار ٦١",
      },
      {
        questionBody: "سؤال رقم ٧",
        choices: ["اختيار ٧١", "اختيار ٧٢", "اختيار ٧٣", "اختيار ٧٤"],
        correctChoice: "اختيار ٧٤",
      },
    ],
  },
  {
    id: "2",
    title: "النون الساكنة والتنوين",
    image: require("../assets/images/favicon.png"),
    questions: [
      {
        questionBody: "Question1 in Quiz 2?",
        choices: ["AA", "BB", "CC", "DD"],
        correctChoice: "BB",
      },
      {
        questionBody: "Question 2 in quiz 2?",
        choices: ["Option 11", "Option 21", "Option 31", "Option 41"],
        correctChoice: "Option 21",
      },
    ],
  },
  {
    id: "3",
    title: "الميم الساكنة",
    image: require("../assets/images/favicon.png"),
    questions: [
      {
        questionBody: "Question1 in Quiz 3?",
        choices: ["AAA", "BBB", "CCC", "DDD"],
        correctChoice: "BBB",
      },
      {
        questionBody: "Question 2 in quiz 3?",
        choices: ["Option 11", "Option 21", "Option 31", "Option 41"],
        correctChoice: "Option 21",
      },
    ],
  },
  {
    id: "4",
    title: "المدود",
    image: require("../assets/images/favicon.png"),
    questions: [
      {
        questionBody: "Question1 in Quiz 4?",
        choices: ["AA", "BB", "CC", "DD"],
        correctChoice: "BB",
      },
      {
        questionBody: "Question 2 in quiz 4?",
        choices: ["Option 11", "Option 21", "Option 31", "Option 41"],
        correctChoice: "Option 21",
      },
    ],
  },
  {
    id: "5",
    title: "التقاء الساكنين",
    image: require("../assets/images/favicon.png"),
    questions: [
      {
        questionBody: "Question1 in Quiz 5?",
        choices: ["AA", "BB", "CC", "DD"],
        correctChoice: "BB",
      },
      {
        questionBody: "Question 2 in quiz 5?",
        choices: ["Option 11", "Option 21", "Option 31", "Option 41"],
        correctChoice: "Option 21",
      },
    ],
  },
];

const randomExam = {
  id: "1",
  title: "اختبار عشوائي",
  questions: [
    {
      id: "1",
      questionBody: "ما هو أول حروف اللغة العربية؟",
      correctChoice: "أ",
      choices: ["س", "ب", "ي", "أ"],
      difficulty: "Easy",
    },
    {
      id: "1",
      questionBody: "ما هو آخر حروف اللغة العربية؟",
      correctChoice: "ي",
      choices: ["س", "ب", "ي"],
      difficulty: "Easy",
    },
  ],
};

export { categories, randomExam };
