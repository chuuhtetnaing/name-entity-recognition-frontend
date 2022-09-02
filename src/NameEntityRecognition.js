import {
  Button,
  CircularProgress,
  Container,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import Parser from "html-react-parser";

// https://huggingface.co/Jean-Baptiste/camembert-ner?text=I+live+in+US+but+I+was+born+in+UK.+Greenwich+is+one+of+the+best+place+to+study.
function NameEntityRecognition() {
  const [inputText, setInputText] = useState(
    "This is 5 Star Restaurant in my beautiful hometown. I love their Thai food. The restaurant name is Bob Shop. They have free-wifi. Don't worry, they are not very expensive. Let's meet at there at 5PM. Oh, they also have chicken-potato curry."
  );
  const [submittedText, setSubmittedText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSubmitNer = () => {
    setLoading(true);
    // setOutputText('')
    setSubmittedText(
      inputText
        .split(".")
        .map((sent) => sent.trim())
        .filter((sent) => !!sent.length)
    );
    axios
      .post("http://127.0.0.1:8000/ner", { text: inputText })
      .then((res) => res.data)
      .then((data) => setResult(data))
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if (!!!result.length) return;

    let total = "";
    setLoading(false);
    result.forEach((res, i) => {
      let last = 0;
      res.forEach((ner) => {
        total += submittedText[i].substring(last, ner.start);
        // console.log(submittedText.substring(ner.start, ner.end))

        if (ner.entity === "Cuisine") {
          total += ` <span style="border-radius: 0.25rem; padding-left: 0.25rem; padding-right: 0.25rem; color: rgba(157,23,77,1); background-color: rgba(252,231,243,1); padding-bottom: 0.125rem; padding-top: 0.125rem;"}}>${submittedText[
            i
          ]
            .substring(ner.start, ner.end)
            .trim()}<span style="font-weight: 600; font-size: .75rem; line-height: 1rem; padding-left: 0.125rem; padding-right: 0.125rem; border-radius: 0.25rem; color: rgba(252,231,243,1); background-color: rgba(236,72,153,1); margin-left: 0.25rem;">${
            ner.entity
          }</span></span>`;
        } else if (ner.entity === "Location") {
          total += ` <span style="border-radius: 0.25rem; padding-left: 0.25rem; padding-right: 0.25rem; color: rgb(61,23,157); background-color: rgb(234,231,252); padding-bottom: 0.125rem; padding-top: 0.125rem;"}}>${submittedText[
            i
          ]
            .substring(ner.start, ner.end)
            .trim()}<span style="font-weight: 600; font-size: .75rem; line-height: 1rem; padding-left: 0.125rem; padding-right: 0.125rem; border-radius: 0.25rem; color: rgba(252,231,243,1); background-color: rgb(102,72,236); margin-left: 0.25rem;">${
            ner.entity
          }</span></span>`;
        } else if (ner.entity === "Amenity") {
          total += ` <span style="border-radius: 0.25rem; padding-left: 0.25rem; padding-right: 0.25rem; color: rgb(23,157,153); background-color: rgb(231,252,252); padding-bottom: 0.125rem; padding-top: 0.125rem;"}}>${submittedText[
            i
          ]
            .substring(ner.start, ner.end)
            .trim()}<span style="font-weight: 600; font-size: .75rem; line-height: 1rem; padding-left: 0.125rem; padding-right: 0.125rem; border-radius: 0.25rem; color: rgba(252,231,243,1); background-color: rgb(72,217,236); margin-left: 0.25rem;">${
            ner.entity
          }</span></span>`;
        } else if (ner.entity === "Hours") {
          total += ` <span style="border-radius: 0.25rem; padding-left: 0.25rem; padding-right: 0.25rem; color: rgb(23,157,90); background-color: rgb(231,252,238); padding-bottom: 0.125rem; padding-top: 0.125rem;"}}>${submittedText[
            i
          ]
            .substring(ner.start, ner.end)
            .trim()}<span style="font-weight: 600; font-size: .75rem; line-height: 1rem; padding-left: 0.125rem; padding-right: 0.125rem; border-radius: 0.25rem; color: rgba(252,231,243,1); background-color: rgb(72,236,94); margin-left: 0.25rem;">${
            ner.entity
          }</span></span>`;
        } else if (ner.entity === "Restaurant_Name") {
          total += ` <span style="border-radius: 0.25rem; padding-left: 0.25rem; padding-right: 0.25rem; color: rgb(157,110,23); background-color: rgb(252,249,231); padding-bottom: 0.125rem; padding-top: 0.125rem;"}}>${submittedText[
            i
          ]
            .substring(ner.start, ner.end)
            .trim()}<span style="font-weight: 600; font-size: .75rem; line-height: 1rem; padding-left: 0.125rem; padding-right: 0.125rem; border-radius: 0.25rem; color: rgba(252,231,243,1); background-color: rgb(236,159,72); margin-left: 0.25rem;">${
            ner.entity
          }</span></span>`;
        } else if (ner.entity === "Price") {
          total += ` <span style="border-radius: 0.25rem; padding-left: 0.25rem; padding-right: 0.25rem; color: rgb(157,63,23); background-color: rgb(252,238,231); padding-bottom: 0.125rem; padding-top: 0.125rem;"}}>${submittedText[
            i
          ]
            .substring(ner.start, ner.end)
            .trim()}<span style="font-weight: 600; font-size: .75rem; line-height: 1rem; padding-left: 0.125rem; padding-right: 0.125rem; border-radius: 0.25rem; color: rgba(252,231,243,1); background-color: rgb(236,102,72); margin-left: 0.25rem;">${
            ner.entity
          }</span></span>`;
        } else if (ner.entity === "Dish") {
          total += ` <span style="border-radius: 0.25rem; padding-left: 0.25rem; padding-right: 0.25rem; color: rgb(97,23,157); background-color: rgb(247,231,252); padding-bottom: 0.125rem; padding-top: 0.125rem;"}}>${submittedText[
            i
          ]
            .substring(ner.start, ner.end)
            .trim()}<span style="font-weight: 600; font-size: .75rem; line-height: 1rem; padding-left: 0.125rem; padding-right: 0.125rem; border-radius: 0.25rem; color: rgba(252,231,243,1); background-color: rgb(162,72,236); margin-left: 0.25rem;">${
            ner.entity
          }</span></span>`;
        } else {
          total += ` <span style="border-radius: 0.25rem; padding-left: 0.25rem; padding-right: 0.25rem; color: rgba(134,25,143,1); background-color: rgba(250,232,255,1); padding-bottom: 0.125rem; padding-top: 0.125rem;"}}>${submittedText[
            i
          ]
            .substring(ner.start, ner.end)
            .trim()}<span style="font-weight: 600; font-size: .75rem; line-height: 1rem; padding-left: 0.125rem; padding-right: 0.125rem; border-radius: 0.25rem; color: rgba(250,232,255,1); background-color: rgba(217,70,239,1); margin-left: 0.25rem;">${
            ner.entity
          }</span></span>`;
        }

        last = ner.end;
      });
      total += submittedText[i].substring(last, submittedText[i].length);
      total += ". ";
      setOutputText(total);
      // console.log(total);
    });
  }, [result]);

  return (
    <Container maxWidth="sm">
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        // sx={{maxWidth: "50%"}}
      >
        <h1>TheWalnut.AI</h1>
        <h5>Name Entity Recognition</h5>
        <TextField
          id="outlined-multiline-static"
          label="Write your story!"
          multiline
          rows={8}
          sx={{ width: 400 }}
          onChange={(e) => setInputText(e.target.value)}
          value={inputText}
        />
        {loading ? (
          <CircularProgress />
        ) : (
          <Button variant="contained" onClick={onSubmitNer}>
            Submit
          </Button>
        )}
      </Stack>
      {outputText && (
        <Stack
          sx={{ mt: 5 }}
          direction="column"
          justifyContent="center"
          alignItems="flex-start"
          spacing={2}
        >
          <Paper elevation={5} sx={{ p: 2, lineHeight: 1.8 }}>
            {Parser(outputText)}
          </Paper>
        </Stack>
      )}
    </Container>
  );
}

export default NameEntityRecognition;
