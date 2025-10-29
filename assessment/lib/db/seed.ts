import { db } from "./index";
import { assessments, questions } from "./schema";

async function seed() {
  console.log("🌱 Seeding database...");

  // Create Verbal Ability Assessment
  const [verbalAssessment] = await db
    .insert(assessments)
    .values({
      title: "Verbal Ability Test",
      description: "Test your verbal reasoning and language skills",
      category: "verbal",
      duration: 15,
      totalQuestions: 10,
    })
    .returning();

  console.log("✓ Created Verbal Ability Assessment");

  // Verbal Ability Questions
  const verbalQuestions = [
    {
      questionText: "Choose the word that is most similar in meaning to 'ABUNDANT':",
      option1: "Scarce",
      option2: "Plentiful",
      option3: "Limited",
      option4: "Rare",
      correctAnswer: 2,
    },
    {
      questionText: "Select the correctly spelled word:",
      option1: "Occurence",
      option2: "Occurance",
      option3: "Occurrence",
      option4: "Occurrance",
      correctAnswer: 3,
    },
    {
      questionText: "Choose the antonym of 'OPTIMISTIC':",
      option1: "Hopeful",
      option2: "Positive",
      option3: "Pessimistic",
      option4: "Cheerful",
      correctAnswer: 3,
    },
    {
      questionText: "Complete the sentence: 'She was ___ to learn that she had won the prize.'",
      option1: "thrilled",
      option2: "boring",
      option3: "angry",
      option4: "sad",
      correctAnswer: 1,
    },
    {
      questionText: "What is the meaning of the idiom 'break the ice'?",
      option1: "To be very cold",
      option2: "To start a conversation",
      option3: "To break something",
      option4: "To stop talking",
      correctAnswer: 2,
    },
    {
      questionText: "Choose the word that best completes: 'The athlete's performance was ___.'",
      option1: "terrible",
      option2: "outstanding",
      option3: "average",
      option4: "poor",
      correctAnswer: 2,
    },
    {
      questionText: "Identify the grammatically correct sentence:",
      option1: "She don't like coffee",
      option2: "She doesn't likes coffee",
      option3: "She doesn't like coffee",
      option4: "She doesn't liking coffee",
      correctAnswer: 3,
    },
    {
      questionText: "What is the synonym of 'BRIEF'?",
      option1: "Long",
      option2: "Short",
      option3: "Extended",
      option4: "Detailed",
      correctAnswer: 2,
    },
    {
      questionText: "Choose the correct plural form of 'analysis':",
      option1: "Analysises",
      option2: "Analysis",
      option3: "Analyses",
      option4: "Analysies",
      correctAnswer: 3,
    },
    {
      questionText: "What does the word 'BENEVOLENT' mean?",
      option1: "Kind and generous",
      option2: "Cruel and harsh",
      option3: "Angry and upset",
      option4: "Sad and depressed",
      correctAnswer: 1,
    },
  ];

  await db.insert(questions).values(
    verbalQuestions.map((q, index) => ({
      assessmentId: verbalAssessment.id,
      ...q,
      order: index + 1,
    }))
  );

  console.log("✓ Added 10 Verbal Ability questions");

  // Create Numerical Ability Assessment
  const [numericalAssessment] = await db
    .insert(assessments)
    .values({
      title: "Numerical Ability Test",
      description: "Test your mathematical and numerical reasoning skills",
      category: "numerical",
      duration: 20,
      totalQuestions: 10,
    })
    .returning();

  console.log("✓ Created Numerical Ability Assessment");

  // Numerical Ability Questions
  const numericalQuestions = [
    {
      questionText: "What is 25% of 200?",
      option1: "25",
      option2: "50",
      option3: "75",
      option4: "100",
      correctAnswer: 2,
    },
    {
      questionText: "If a product costs $80 after a 20% discount, what was the original price?",
      option1: "$96",
      option2: "$100",
      option3: "$120",
      option4: "$160",
      correctAnswer: 2,
    },
    {
      questionText: "What is the next number in the sequence: 2, 4, 8, 16, ?",
      option1: "24",
      option2: "28",
      option3: "32",
      option4: "36",
      correctAnswer: 3,
    },
    {
      questionText: "A train travels 120 km in 2 hours. What is its average speed?",
      option1: "40 km/h",
      option2: "50 km/h",
      option3: "60 km/h",
      option4: "80 km/h",
      correctAnswer: 3,
    },
    {
      questionText: "If 3x + 5 = 20, what is the value of x?",
      option1: "3",
      option2: "5",
      option3: "7",
      option4: "10",
      correctAnswer: 2,
    },
    {
      questionText: "What is 15% of 300?",
      option1: "30",
      option2: "45",
      option3: "60",
      option4: "75",
      correctAnswer: 2,
    },
    {
      questionText: "A rectangle has a length of 12 cm and width of 8 cm. What is its area?",
      option1: "48 cm²",
      option2: "72 cm²",
      option3: "96 cm²",
      option4: "120 cm²",
      correctAnswer: 3,
    },
    {
      questionText: "What is the average of 10, 20, 30, and 40?",
      option1: "20",
      option2: "25",
      option3: "30",
      option4: "35",
      correctAnswer: 2,
    },
    {
      questionText: "If a shirt costs $45 and is on sale for 30% off, what is the sale price?",
      option1: "$13.50",
      option2: "$27.00",
      option3: "$31.50",
      option4: "$35.00",
      correctAnswer: 3,
    },
    {
      questionText: "What is 8² (8 squared)?",
      option1: "16",
      option2: "32",
      option3: "64",
      option4: "128",
      correctAnswer: 3,
    },
  ];

  await db.insert(questions).values(
    numericalQuestions.map((q, index) => ({
      assessmentId: numericalAssessment.id,
      ...q,
      order: index + 1,
    }))
  );

  console.log("✓ Added 10 Numerical Ability questions");
  console.log("✅ Seeding complete!");
}

seed()
  .catch((error) => {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
