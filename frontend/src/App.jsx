import { useState, useEffect } from "react";
import { vapi, startAssistant, stopAssistant } from "./ai";
import ActiveCallDetails from "./call/ActiveCallDetails";
import TopicSelector from "./components/topicSelector";
import {Text} from "@chakra-ui/react";

function App() {
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [callId, setCallId] = useState("");
  const [callResult, setCallResult] = useState(null);
  const [loadingResult, setLoadingResult] = useState(false);

  const [name, setName] = useState("Alex");
  const [topics, setTopics] = useState("");
  const [userWellnessProfile, setuserWellnessProfile] = useState(`You are a Wellness Voice Assistant from Wellbody. Your tone is supportive, knowledgeable, and motivational. Your primary role is to guide the user through self-reflection and wellness optimization using Socratic questioning and evidence-based suggestions. You are not a medical professional and must not provide medical advice.

Here is the user's wellness profile:

- **Primary Goal**: Improve performance for high school soccer.
- **Facilities Access**: Full gym facilities.
- **Activity Level**: Highly active and disciplined in workout, nutrition, and sleep routines.
- **Secondary Goals**: Increase agility and strength.
- **Fitness Strength**: High endurance.
- **Nutrition**: No restrictions.
- **Current Challenge**: Struggling to balance social life with training schedule.
- **Recent Injury**: Ankle sprain.
- **Weekly Workout Score**: 81/100.
- **Monthly Workout Score**: 75/100.
- **Overall Wellbeing Score (Sleep & Nutrition)**: 40/100.
- **Fitness Experience**: 40/100.
- **Nutrition Knowledge**: 40/100.
- **Average Weekly Calorie Intake**: 1724 kcal/day.

The user has previously asked:
- **Q: How can I improve my speed for soccer?**  
  **A:** "That's a great goal! Improving speed for soccer involves both strength and technique. Plyometric exercises like box jumps and specific sprint drills can be very effective. We can definitely look at how to incorporate those into your routine."

- **Q: What should I eat before and after practice?**  
  **A:** "Excellent question. For pre-practice, focus on easily digestible carbs for quick energy. Post-practice, it's crucial to get a mix of protein to repair muscles and carbs to refuel them. A protein shake and a banana is a classic for a reason!"`);

  useEffect(() => {
    vapi
      .on("call-start", () => {
        setLoading(false);
        setStarted(true);
      })
      .on("call-end", () => {
        setStarted(false);
        setLoading(false);
      })
      .on("speech-start", () => {
        setAssistantIsSpeaking(true);
      })
      .on("speech-end", () => {
        setAssistantIsSpeaking(false);
      })
      .on("volume-level", (level) => {
        setVolumeLevel(level);
      });
  }, []);

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value.replace(/\n/g, ""));
  };

  const handleStart = async () => {
    setLoading(true);
    try {
      const data = await startAssistant(name, topics, userWellnessProfile);
      console.log('data :', data)
      setCallId(data.id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleStop = () => {
    stopAssistant();
    getCallDetails();
  };

  const getCallDetails = (interval = 3000) => {
    setLoadingResult(true);
    fetch("/call-details?call_id=" + callId)
      .then((response) => response.json())
      .then((data) => {
        if (data.analysis && data.summary) {
          console.log(data);
          setCallResult(data);
          setLoadingResult(false);
        } else {
          setTimeout(() => getCallDetails(interval), interval);
        }
      })
      .catch((error) => alert(error));
  };

  const showForm = !loading && !started && !loadingResult && !callResult;
  const allFieldsFilled = name && topics && userWellnessProfile;

  return (
    <div className="app-container">
      {showForm && (
        <>
          <h1>Wellbody AI Wellness coach</h1>
          <br />
          <br />
          <Text>Hey {name} !!! , Select the topics below to connect with our AI wellness assistant</Text>
          {/* <textarea
            type="text"
            placeholder="Enter comma separated topics"
            value={topics}
            className="input-field-topics"
            onChange={handleInputChange(setTopics)}
          /> */}
           <br />
          <br />
          <TopicSelector setTopics={setTopics}></TopicSelector>
          {/* <textarea
            type="text"
            placeholder="user wellness profile including workout , nutrition and slepp pattern"
            value={userWellnessProfile}
            className="input-field-userwellness-profile"
            onChange={handleInputChange(setuserWellnessProfile)}
          /> */}
          {!started && (
            <button
              onClick={handleStart}
              disabled={!allFieldsFilled}
              className="button"
            >
              Start Application Call
            </button>
          )}
        </>
      )}
      {loadingResult && <p>Loading call details... please wait</p>}
      {!loadingResult && callResult && (
        <div className="call-result">
          <p>
            Qualified:{" "}
            {callResult.analysis.structuredData.is_qualified.toString()}
          </p>
          <p>{callResult.summary}</p>
        </div>
      )}
      {(loading || loadingResult) && <div className="loading"></div>}
      {started && (
        <ActiveCallDetails
          assistantIsSpeaking={assistantIsSpeaking}
          volumeLevel={volumeLevel}
          endCallCallback={handleStop}
        />
      )}
    </div>
  );
}

export default App;
