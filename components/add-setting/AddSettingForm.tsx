"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getJwtToken } from "@/lib/utils";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BASE_API_URL } from "@/config/constant";

const AddSettingForm: React.FC = () => {
  const options = [
    { Label: "Generation", Value: "GENERATION" },
    { Label: "Room", Value: "ROOM" },
  ];

  const validationSchema = Yup.object({
    settingName: Yup.string().required("Setting Name is required"),
    settingGroup: Yup.string().required("Setting Group is required"),
    status: Yup.string().required("Status is required"),
    description: Yup.string().nullable(),
  });

  const initialValues = {
    settingName: "",
    settingGroup: "",
    status: true,
    description: "",
  };

  const router = useRouter();


  const handleSubmit = async (values: typeof initialValues) => {
    console.log("Form data:", values);

    const token = getJwtToken();
    if (!token) {
      router.push("/authen/login");
      return;
    }

    try {
      const response = await axios.post(`${BASE_API_URL}/settings/create`,
        {
          ...values,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        router.push("/feature/view-system-setting");
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
      alert("Failed to submit form data. Please try again.");
    }

  };

  return (
    <div className="flex-1 ml-[228px] bg-[#EFF5EB] p-24 min-h-screen">
      <div className="flex justify-between items-center py-8">
        <h2 className="text-4xl font-bold">New System Setting</h2>
      </div>
      <div className="bg-white rounded-[40px] p-12 mx-auto">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form className="grid grid-cols-2 gap-12">
              <div className="mb-6">
                <label className="block font-bold mb-1">Setting Name*</label>
                <Field
                  name="settingName"
                  placeholder="Input Setting Name"
                  className="w-full p-2 border border-gray-700 rounded-lg"
                />
                <ErrorMessage name="settingName" component="div" className="text-red-500" />
              </div>

              <div className="mb-6">
                <label className="block font-bold mb-1">Setting Group*</label>
                <Field
                  as="select"
                  name="settingGroup"
                  className="w-full p-2.5 border border-gray-700 rounded-lg"
                >
                  <option value="" label="Select a group" />
                  {options.map((option) => (
                    <option key={option.Value} value={option.Value}>
                      {option.Label}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="settingGroup" component="div" className="text-red-500" />
              </div>

              <div className="mb-6">
                <label className="block font-bold mb-1">Status</label>
                <div className="flex items-center p-3">
                  <label className="mr-10 py-3 px-3">
                    <Field
                      type="radio"
                      name="status"
                      value={true}
                      checked={values.status === true}
                      onChange={() => setFieldValue("status", true)}
                      className="w-4 h-4 mr-3"
                    />
                    Active
                  </label>
                  <label>
                    <Field
                      type="radio"
                      name="status"
                      value={false}
                      checked={values.status === false}
                      onChange={() => setFieldValue("status", false)}
                      className="w-4 h-4 mr-3"
                    />
                    Inactive
                  </label>
                </div>
                <ErrorMessage name="status" component="div" className="text-red-500" />
              </div>

              <div className="mb-6">
                <label className="block font-bold mb-1">Description</label>
                <Field
                  as="textarea"
                  name="description"
                  placeholder="Input Description"
                  className="w-full p-2 border border-gray-700 rounded-lg"
                />
              </div>

              <div className="flex mt-10 col-span-2">
                <button
                  type="submit"
                  className="text-white bg-[#6FBC44] font-bold shadow-md hover:shadow-lg hover:bg-[#5da639] py-3 px-6 rounded mr-10"
                >
                  Add
                </button>
                <button
                  onClick={() => router.back()}
                  type="button"
                  className="text-black bg-[#D5DCD0] font-bold shadow-md hover:shadow-lg hover:bg-gray-400 py-3 px-6 rounded"
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddSettingForm;
