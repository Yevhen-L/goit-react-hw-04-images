import React, { useState } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { StyledForm, StyledHeader } from './Searchbar.styled';

const SearchbarSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Title is too short')
    .matches(
      /^[a-zA-Zа-яА-Я0-9]+(([' -][a-zA-Zа-яА-Я0-9 ])?[a-zA-Zа-яА-Я0-9]*)*$/,
      'Please enter a valid title'
    )
    .max(18, 'Title is too long')
    .required('Title is required'),
});
export const Searchbar = ({ onSearch }) => {
  const [initialValues, setInitialValues] = useState({ title: '' });

  const handleSubmit = (values, actions) => {
    onSearch(values.title);
    actions.resetForm({ values: initialValues });
  };

  return (
    <StyledHeader>
      <Formik
        initialValues={initialValues}
        validationSchema={SearchbarSchema}
        onSubmit={handleSubmit}
      >
        <StyledForm>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <Field
            className="input"
            type="text"
            name="title"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <ErrorMessage name="title" component="div" className="error" />
        </StyledForm>
      </Formik>
    </StyledHeader>
  );
};
