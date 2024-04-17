/* eslint-disable react/prop-types */
import { useEffect, useReducer, useState } from "react";
import { CustomDropdown } from "./CustomDropdown";
import { InputData } from "./InputData";
import { ButtonSearch } from "./ButtonSearch";
import { getDataReg, getERAseg } from "../utils";

const feedback = { onKey: false, isReady: false, isAuthReady: false, dataResponse: null, ERAsegData: null, statusCode: null, isERAsegReady: false, LoadingLabel: "...", allReady: false, authERAdata: null };

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, LoadingLabel: "Cargando información de usuario ...", isReady: false };
    case 'DATA_LOADED':
      return { ...state, ...action.payload, LoadingLabel: "Cargando ERAseg ...", isReady: true };
    case 'NO_CONTENT':
      return { ...state, statusCode: 204, LoadingLabel: "No se encontró contenido", isERAsegReady: true, allReady: true };
    case 'ERAseg_LOADED':
      return { ...state, ...action.payload, isERAsegReady: true, allReady: true };
    case 'ERROR':
      return { ...state, ...action.payload, isReady: true, allReady: true };
    default:
      return state;
  }
};

export const SearchBar = ({ onUserData }) => {
  const [tid, setTid] = useState("");
  const [docNumber, setDocNumber] = useState("");
  const [onKey, setOnKey] = useState(false);
  const [state, dispatch] = useReducer(reducer, feedback);

  useEffect(() => {
    if (onKey) {
      dispatch({ type: 'FETCH_START' });
      (async function () {
        try {
          const { dataResponse, statusCode } = await getDataReg(tid, docNumber);
          if (statusCode === 200) {
            dispatch({ type: 'DATA_LOADED', payload: { dataResponse, statusCode } });
            const { data } = await getERAseg(dataResponse);
            dispatch({ type: 'ERAseg_LOADED', payload: { ERAsegData: data } });
          } else if (statusCode === 204) {
            dispatch({ type: 'NO_CONTENT', playload: {statusCode} });
            console.log(state);
          }
          const { data } = await getERAseg(dataResponse);
          dispatch({ type: 'ERAseg_LOADED', payload: { ERAsegData: data } });
        } catch (error) {
          console.error("error fetching data:", error);
          dispatch({ type: 'ERROR', payload: { dataResponse: null, statusCode: null } });
        }
      })();
    }
    setOnKey(false);
  }, [onKey]);

  // Efecto para llamar a onUserData siempre que el estado se actualice
  useEffect(() => {
    onUserData(state);
  }, [onKey]);

  const handleKey = (value) => {
    if (tid && docNumber && !isNaN(docNumber)) {
      setOnKey(value);
    }
  }; // ---> manejador de alerta para llenar los campos

  return (
    <div className="flex justify-center">
      <div className="flex translate-y-[-10px] bg-[#F6F6F6] h-[48px] rounded-[8px] w-[350px] sm:w-[400px]">
        <CustomDropdown onChange={setTid} enterKey={handleKey} />
        <InputData onChange={setDocNumber} enterKey={handleKey} />
        <ButtonSearch enterKey={handleKey} />
      </div>
    </div>
  );
};
