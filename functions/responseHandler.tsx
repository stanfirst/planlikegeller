import { Button } from "@mantine/core";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useEffect, useState } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import { Processing } from "./natural";

export default function Assisstant() {
  const [message, setMessage] = useState("");
  const { speak } = useSpeechSynthesis();
  const [talk, setTalk] = useState(false);
  const [processed, setProcessed] = useState(<div></div>);

  useEffect(() => {
    if (talk && !listening) {
      setTalk(false);
      setProcessed(Processing(transcript, speak));
    }
  });

  const commands = [
    {
      command: "I would like to order *",
      callback: (food: string) => setMessage(`Your order is for: ${food}`),
    },
    {
      command: "The weather is :condition today",
      callback: (condition: string) =>
        setMessage(`Today, the weather is ${condition}`),
    },
    {
      command: "My top sports are * and *",
      callback: (sport1: string, sport2: string) =>
        setMessage(`#1: ${sport1}, #2: ${sport2}`),
    },
    {
      command: "Pass the salt (please)",
      callback: () => setMessage("My pleasure"),
    },
    {
      command: ["Hello", "Hi"],
      callback: ({ command }: { command: string }) =>
        setMessage(`Hi there! You said: "${command}"`),
      matchInterim: true,
    },
    {
      command: "Beijing",
      callback: (
        command: string,
        spokenPhrase: string,
        similarityRatio: number
      ) =>
        setMessage(
          `${command} and ${spokenPhrase} are ${similarityRatio * 100}% similar`
        ),
      // If the spokenPhrase is "Benji", the message would be "Beijing and Benji are 40% similar"
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
    },
    {
      command: ["eat", "sleep", "leave"],
      callback: (command: string) =>
        setMessage(`Best matching command: ${command}`),
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
      bestMatchOnly: true,
    },
    {
      command: "clear",
      callback: ({ resetTranscript }: { resetTranscript: any }) =>
        resetTranscript(),
    },
  ];

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({ commands });

  const handleStartListening = async () => {
    await SpeechRecognition.startListening();
    setTalk(true);
  };

  const handleStopListening = async () => {
    await SpeechRecognition.stopListening();
  };

  return (
    <div>
      <p className="text-xl" style={{ fontSize: "40px" }}>
        Microphone: {listening ? "on" : "off"}
      </p>
      <Button
        onClick={handleStartListening}
        className="bg-black p-2"
        style={{ backgroundColor: "black", margin: "10px" }}
      >
        Start
      </Button>

      <Button
        onClick={handleStopListening}
        className="bg-black p-2"
        style={{ backgroundColor: "black", margin: "10px" }}
      >
        Stop
      </Button>
      <Button
        onClick={resetTranscript}
        className="bg-black p-2"
        style={{ backgroundColor: "black", margin: "10px" }}
      >
        Reset
      </Button>
      <p>{transcript}</p>
      {processed}
    </div>
  );
}
