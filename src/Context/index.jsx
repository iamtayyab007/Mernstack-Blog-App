import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalState = ({ children }) => {
  const [formData, setFormData] = useState({
    title: "",
    descritpion: "",
  });
  const [blogList, setBlogList] = useState([]);
  const [pending, setPending] = useState(false);
  const [edit, setEdit] = useState(false);
  return (
    <GlobalContext.Provider
      value={{
        formData,
        setFormData,
        blogList,
        setBlogList,
        pending,
        setPending,
        edit,
        setEdit,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
