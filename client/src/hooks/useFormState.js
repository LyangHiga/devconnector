import { useState } from 'react';

const useFormState = (initVal) => {
  const [form, setForm] = useState(initVal);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const reset = () => {
    //  ES 7/2016: Object.entries(): Returns [key,val] from any Object
    // ES 10/2019: The Object.fromEntries() method transforms a list of key-value pairs into an object.
    setForm(Object.fromEntries(Object.entries(form).map(([key]) => [key, ''])));
  };
  const prefill = (prefillData) => {
    setForm(
      Object.fromEntries(
        Object.entries(prefillData).map(([key, val]) => [key, val])
      )
    );
  };
  return [form, handleChange, reset, prefill];
};

export default useFormState;
