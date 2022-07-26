import React from "react";
import { FormHandles } from "@unform/core";

export const useVForm = () => {
  const formRef = React.useRef<FormHandles>(null);
  const isSavingAndNew = React.useRef(false);
  const isSavingAndBack = React.useRef(false);

  const handleSave = React.useCallback(() => {
    isSavingAndNew.current = false;
    isSavingAndBack.current = false;
    formRef.current?.submitForm();
  }, []);

  const handleSaveAndNew = React.useCallback(() => {
    isSavingAndNew.current = true;
    isSavingAndBack.current = false;
    formRef.current?.submitForm();
  }, []);

  const handleSaveAndBack = React.useCallback(() => {
    isSavingAndNew.current = false;
    isSavingAndBack.current = true;
    formRef.current?.submitForm();
  }, []);

  const handleIsSaveAndNew = React.useCallback(
    () => isSavingAndNew.current,
    []
  );

  const handleIsSaveAndBack = React.useCallback(
    () => isSavingAndBack.current,
    []
  );

  return {
    formRef,
    save: handleSave,
    saveAndNew: handleSaveAndNew,
    saveAndBack: handleSaveAndBack,
    isSaveAndNew: handleIsSaveAndNew,
    isSaveAndBack: handleIsSaveAndBack,
  };
};
