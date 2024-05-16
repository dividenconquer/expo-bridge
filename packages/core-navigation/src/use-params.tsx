export const useParams = () => {
  return JSON.stringify(window.RNScreenParams ?? "{}");
};
