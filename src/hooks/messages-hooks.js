import { useContext } from "react";
import { Context } from "../providers/provider";

const useMessages = () => {
  const { messagesState, getMessages, delMessage, postMessage, putMessage } = useContext( Context );

  return { messagesState, getMessages, delMessage, postMessage, putMessage };
};

export default useMessages;