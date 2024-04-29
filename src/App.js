
import './App.css';
import React, { useState } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'bootstrap/dist/css/bootstrap.min.css';
import provincias from './provincias';
import { Formik, Field, Form, ErrorMessage } from 'formik';

function App() {
  const [provincia, setProvincia] = useState([])
  return (
    <><h1>Bienvenidos al registro de desarrolladores </h1>
            <Formik
        initialValues={{
          fullName: '',
          dni: '',
          localidad: '',
          provincia: ''
        }}
        validate={values => {
          const errors = {};

          if (!values.fullName) {
            errors.fullName = 'El nombre completo es requerido';
          }

          if (!values.dni) {
            errors.dni = 'El DNI es requerido';
          }
          return errors;
        }}
        onSubmit={(values, actions) => {
          // Aquí manejas la lógica de envío del formulario
          console.log(values);
          actions.setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field
              type="text"
              name="Nombre completo"
              placeholder="Nombre completo"
            />
            <ErrorMessage name="fullname" component="div" />

            <Field
              type="number"
              name="DNI"
              placeholder="DNI"
            />
            <ErrorMessage name="DNI" component="div" />

            <Typeahead
              id="typeaheadProvincia"
              labelKey="nombre"
              options={provincias}
              placeholder="Provincia"
              selected={provincia}
              onChange={setProvincia}
            />
            
            <Field
              type="text"
              name="Localidad"
              placeholder="Localidad"
            />
            <ErrorMessage name="DNI" component="div" />

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>

    </>
  );
}

export default App;
