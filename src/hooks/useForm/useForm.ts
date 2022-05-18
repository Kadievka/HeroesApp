import { useState } from "react";

export const useForm = (initialState: any = {}) => {
  const [values, setValues] = useState(initialState);

  const handleInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setValues(() => ({
      ...values,
      [target.name]: target.value,
    }));
  };

  const resetAllValues = () => {
    setValues(initialState);
  };

  return [values, handleInputChange, resetAllValues];
};
