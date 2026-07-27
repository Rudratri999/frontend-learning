import React from 'react'
import { useForm, Controller, useFieldArray } from "react-hook-form"

const App = () => {

  // live values , runs while typing
  const { watch } = useForm();

  const password = watch("password")


  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isDirty,
      dirtyFields,
      touchedFields,
      isValid,
      isSubmitting,
      isSubmitSuccessful,
      submitCount,
    },
    reset,
    setValue,
    control,
    trigger,
    clearErrors

  } = useForm({
    defaultValues: {
      phones: [
        {
          number: "",
        },
      ],
    },
  })


  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control,

    name: "phones"
  })



  const onSubmit = (data) => {
    console.log(data)
    reset();
  }

  // React Hook Form gives you an object called:field 
  // it contain :   value,onChange,onBlur,ref, name


  // <Controller
  //   name="username"
  //   control={control}
  //   render={({ filed }) => {
  //     <TextField
  //       {...filed}
  //     />
  //   }}
  // />

  <Controller
    name="username"
    control={control}
    render={({ filed }) => {
      <Select
        {...field}
        options={countries}
      />
    }}
  />


  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* This is how react-form written , No state , No onchange , No value */}
        {/* Validation pass as second argumaent like below */}

        {/* <input type="text"
          placeholder='Username'
          {...register("username", {
            required: "Username is required",

            minLength: {
              value: 3,
              message: "Username must be at least 3 characters.",
            },

            maxLength: {
              value: 15,
              message: "Username must not exceed 15 characters."
            },
          })} /> */}

        {

          fields.map((field, index) => (

            <div key={field.id}>
              <input
                {...register(`phones.${index}.number`)}
                placeholder='Phone Number'
              />

              <button
                type='button'
                onClick={() => remove(index)}>
                Remove
              </button>
            </div>
          ))


        }

        <button type='button' onClick={() => append({
          number: " ",
        })}>Add Phone</button>




        <input type="text"
          placeholder='Username'
          {...register("username", {

            // Custom Validation
            validate: (value) =>
              value !== "admin" || "username 'admin' is not allowed"

          })} />

        {errors.username && (
          <p>{errors.username.message}</p>
        )}


        <input
          type="number"
          {...register("age", {
            validate: (value) =>
              Number(value) >= 18 || "You must be at least 18 years old",
          })}
        />


        <input type="text"
          placeholder='password'
          {...register("password", {
            validate: (value) =>
              value.includes("@") || "Password Must Contain '@' "
            ,

          })} />

        {password.length < 6 && <p>Weak password</p>}

        <input type="password"
          placeholder='Password'
          {...register("password", {
            required: true,

            minLength: {
              value: 6,
              message: "password must be at least 6 character"
            },
          })} />

        {errors.password && (
          <p>{errors.password.message}</p>
        )}

        <input type="email"
          placeholder='Email'
          {...register("email", {
            required: "Email is required",

            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          })} />

        <input type="text"
          placeholder='email'
          {...register("email", {
            validate: (value) =>
              value.endsWith("@company.com") ||
              "Use your company email",
          })}
        />

        <input type="text"
          placeholder='Username'
          {...register("username", {
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters."
            },
            validate: (value) =>
              !value.includes(" ") || "Space is not allowed in username"

          })} />

        <button type='submit'>Login</button>
        {/* in this without typing anything value becomes rudra */}
        <button onClick={() => setValue("username", "rudra")}>Fill the username</button>

      </form>

    </div>
  )
}

export default App

// // useForm() = retrun below all this

// │
// ├── register
// ├── handleSubmit
// ├── formState
// ├── watch
// ├── reset
// ├── setValue
// ├── getValues
// └── trigger

setValue(
  "username",
  "Rudra",
  {
    shouldValidate: true,
    shouldDirty: true,
    shouldTouch: true,
  }
);

// shouldValidate → Re-run validation after changing the value.
// shouldDirty → Mark the field as modified.
// shouldTouch → Mark the field as touched.


// =============================
// React Hook Form Revision Notes
// =============================

// 1. useForm()
// 2. register()
// 3. handleSubmit()
// 4. Validation
// 5. Custom Validation
// 6. watch()
// 7. formState
// 8. defaultValues
// 9. reset()
// 10. setValue()
// 11. getValues()
// 12. trigger()
// 13. clearErrors()
// 14. setError()
// 15. Controller
// 16. useFieldArray()
