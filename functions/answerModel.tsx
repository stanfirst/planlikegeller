// import * as tf from "@tensorflow/tfjs";
import * as qna from "@tensorflow-models/qna";
import { Input, Loader, Rating, Textarea } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
// import "@tensorflow/tfjs-backend-webgl";
import { Services } from "@/constants/services";

// tf.setBackend("webgl");

interface answerType {
  text: string;
  score: number;
  startIndex: number;
  endIndex: number;
}

export function AnswerModel() {
  const dataRef = useRef<HTMLTextAreaElement>(null);
  const questionRef = useRef<HTMLTextAreaElement>(null);
  let paragraph = "";
  Services.service_providers.map((s, key) => {
    paragraph.concat(
      `${s.name} is a ${s.service_type} from the city of ${s.city} in ${s.state} with a rating of ${s.rating} and who charges ${s.price}`
    );
  });

  const [answer, setAnswer] = useState<string>("");
  const [model, setModel] = useState<any>(null);

  const loadModel = async () => {
    const loadedmodel = await qna.load();
    setModel(loadedmodel);
    console.log("Model Loaded");
  };

  useEffect(() => {
    loadModel();
  }, []);

  const answerQuestion = async (e: any) => {
    if (e.which === 13 && e.model !== null) {
      console.log("Question Submitted");
      const data = dataRef.current?.value;

      const question = questionRef.current?.value;

      const answer = await model.findAnswers(question, paragraph);
      setAnswer(answer == "" ? "No Answer" : answer[0].text);
      console.log(answer);
    }
  };

  return (
    <div>
      {model == null ? (
        <div>
          <h1>Loading Model</h1>
          <Loader />
        </div>
      ) : (
        <div>
          <h1>Date</h1>
          <Textarea
            placeholder="Enter Data"
            autosize
            ref={dataRef}
            minRows={2}
            maxRows={4}
            onKeyDown={answerQuestion}
          />
          <h1>Question</h1>
          <Textarea
            placeholder="Enter Question"
            ref={questionRef}
            onKeyDown={answerQuestion}
          />
          <h1>Answer</h1>
          <p>{answer ? answer : <Loader />}</p>
        </div>
      )}
    </div>
  );
}
