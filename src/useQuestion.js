import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getQuestionsData = () => {
  return axios.get(
    "https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple"
  );
};

export function useQuestions() {
  return useQuery({
    queryKey: ["questions"],
    queryFn: getQuestionsData,
    refetchOnWindowFocus: false,
  });
}
