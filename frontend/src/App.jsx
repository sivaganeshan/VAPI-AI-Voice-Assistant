import { useState, useEffect } from "react";
import { vapi, startAssistant, stopAssistant } from "./ai";
import ActiveCallDetails from "./call/ActiveCallDetails";

function App() {
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [callId, setCallId] = useState("");
  const [callResult, setCallResult] = useState(null);
  const [loadingResult, setLoadingResult] = useState(false);

  const [name, setName] = useState("");
  const [topics, setTopics] = useState("");
  const [userWellnessProfile, setuserWellnessProfile] = useState("");

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
          <h1>Wellbody AI Voice Assistant</h1>
          <input
            type="text"
            placeholder="Name"
            value={name}
            className="input-field"
            onChange={handleInputChange(setName)}
          />
          <textarea
            type="text"
            placeholder="Enter comma separated topics"
            value={topics}
            className="input-field-topics"
            onChange={handleInputChange(setTopics)}
          />
          <textarea
            type="text"
            placeholder="user wellness profile including workout , nutrition and slepp pattern"
            value={userWellnessProfile}
            className="input-field-userwellness-profile"
            onChange={handleInputChange(setuserWellnessProfile)}
          />
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
