import { Annotation } from '@langchain/langgraph';

export const InputStateAnnotation = Annotation.Root({
  question: Annotation<string>,
});

export const StateAnnotation = Annotation.Root({
  question: Annotation<string>,
  query: Annotation<string>,
  result: Annotation<string>,
  answer: Annotation<string>,
});
