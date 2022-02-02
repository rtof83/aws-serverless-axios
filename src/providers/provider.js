import React, { createContext, useCallback, useState } from "react";
import api from "../services/api";

export const Context = createContext({
  loading: false,
  repositories: [],
});

const Provider = ({ children }) => {
  const [ messagesState, setMessagesState ] = useState({
    loading: true,
    repositories: []
  });

  const getMessages = async () => {
    await api.get()
    .then(({ data }) => {
      setMessagesState((prevState) => ({
        ...prevState,
        loading: true,
        repositories: data['Items']
      }));
    })
    .finally(() => {
     setMessagesState((prevState) => ({
      ...prevState,
      loading: !prevState.loading
      }));
    });
  };
  
  const delMessage = async (id) => {
    setMessagesState((prevState) => ({
      ...prevState,
      loading: !prevState.loading
    }));

    await api.delete(id)
      .then(getMessages)
      .catch(e => console.log(e))
  }

  const postMessage = async (id, name, message) => {
    setMessagesState((prevState) => ({
      ...prevState,
      loading: !prevState.loading
    }));

    await api.post(id, { name: name, message: message })
      .then(getMessages)
      .catch(e => console.log(e))
  }

  const putMessage = async (id, name, message) => {
    setMessagesState((prevState) => ({
      ...prevState,
      loading: !prevState.loading
    }));

    await api.put('', { date: id, name: name, message: message })
      .then(getMessages)
      .catch(e => console.log(e))
  }

  const contextValue = {
    messagesState,
    delMessage,
    postMessage,
    putMessage,
    getMessages: useCallback(() => getMessages(), [])
  };

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
};

export default Provider;