import { useState } from 'react';

const useFormState = (initVal) => {
  const [formData, setForm] = useState(initVal);
  const handleChange = (e) => {
    setForm({ ...formData, [e.target.name]: e.target.value });
  };
  const handleChangeCheckbox = (e) => {
    setForm({
      ...formData,
      [e.target.name]: e.target.checked,
    });
  };
  const resetForm = () => {
    //  ES 7/2016: Object.entries(): Returns [key,val] from any Object
    // ES 10/2019: The Object.fromEntries() method transforms a list of key-value pairs into an object.
    setForm(
      Object.fromEntries(Object.entries(formData).map(([key]) => [key, '']))
    );
  };
  const prefill = (prefillData) => {
    setForm(
      Object.fromEntries(
        Object.entries(prefillData).map(([key, val]) => [key, val])
      )
    );
  };
  return { formData, handleChange, resetForm, prefill, handleChangeCheckbox };
};

export default useFormState;
