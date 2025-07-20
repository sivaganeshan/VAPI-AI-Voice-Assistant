import { CheckboxCard , Heading, Text} from "@chakra-ui/react";

const topics = [
  {
    title: "Fitness Goals & Planning",
    description:
      "Discuss workout routines, exercise plans, and fitness objectives.",
    image: "../images/fitness-goals.jpg",
  },
  {
    title: "Nutrition & Diet",
    description:
      "Talk about meal planning, dietary choices, and nutritional guidance.",
    image: "../images/nutrition-diet.jpg",
  },
  {
    title: "Progress Review",
    description:
      "Analyze recent data, achievements, and areas for improvement.",
    image: "../images/progress-review.jpg",
  },
  {
    title: "Overall Wellness",
    description:
      "Discuss sleep, stress management, and holistic health approaches.",
    image: "../images/overall-wellness.jpg",
  },
  {
    title: "Motivation & Mindset",
    description: "Work on mental barriers, habits, and staying motivated.",
    image: "../images/motivation-mindset.jpg",
  },
  {
    title: "Activity & Metrics",
    description:
      "Review tracked activities and discuss optimization strategies.",
    image: "../images/activity-metrics.jpg",
  },
];

const TopicSelector = (props) => {
  
  const handleSelect = (topicDetails) => {
    console.log("Selected topic:", topicDetails);
    // eslint-disable-next-line react/prop-types
    props.setTopics(topicDetails);
  };

  return (
    <div className="flex-allign-horizontally">
      {topics.map((topic, index) => (
        <CheckboxCard.Root
          key={index}
          className="flex-items"
          onClick={() => handleSelect(topic.title + topic.description)}
        >
          <CheckboxCard.HiddenInput />
          <CheckboxCard.Control>
            <CheckboxCard.Content>
              {/* <Image
                src={topic.image}
                alt={topic.title}
                className=""
              /> */}
              <Heading  className="">{topic.title}</Heading>
              <Text className="">{topic.description}</Text>
            </CheckboxCard.Content>
          </CheckboxCard.Control>
        </CheckboxCard.Root>
      ))}
    </div>
  );
};

export default TopicSelector;
