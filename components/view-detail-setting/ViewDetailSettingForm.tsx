"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getJwtToken } from "@/lib/utils";
import axios from "axios";
import { BASE_API_URL } from "@/config/constant";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const DetailSettingForm: React.FC = () => {
  const params = useParams();
  const settingId = params.id;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [settingdata, setSettingdata] = useState(null);
  const [error, setError] = useState(null);

  const fetchSettings = async () => {
    const token = getJwtToken();
    if (!token) {
      router.push("/authen/login");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `${BASE_API_URL}/settings/detail/${settingId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const settings = response.data.data;
      if (settings) {
        setSettingdata(settings);
      } else {
        console.error("Data error", settings);
      }
    } catch (err) {
      setError("Error fetching settings");
      console.error("Error fetching settings:", err);
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        router.push("/authen/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const options = [
    { Label: "Generation", Value: "GENERATION" },
    { Label: "Room", Value: "ROOM" },
  ];

  const validationSchema = Yup.object({
    settingName: Yup.string().required("Setting Name is required"),
    settingGroup: Yup.string().required("Setting Group is required"),
    status: Yup.boolean().required("Status is required"),
    description: Yup.string(),
  });

  const handleSubmit = async (values: any) => {
    const token = getJwtToken();
    if (!token) {
      router.push("/authen/login");
      return;
    }
    try {
      setLoading(true);
      await axios.put(
        `${BASE_API_URL}/settings/save`,
        { ...values, id: Number(settingId), status: values.status ? 1 : 0 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      router.push("/feature/view-system-setting");
    } catch (err) {
      console.error("Error updating setting:", err);
      alert("Failed to update setting.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex-1 ml-[228px] bg-[#EFF5EB] p-24 min-h-screen">
      <div className="flex justify-between items-center p-8">
        <h2 className="text-4xl font-bold">Setting Detail</h2>
      </div>
      <div className="bg-white rounded-[40px] p-12 mx-auto">
        {settingdata && (
          <Formik
            initialValues={{
              settingName: settingdata.settingName || "",
              settingGroup: settingdata.settingGroup || options[0].Value,
              status: settingdata.status,
              description: settingdata.description || "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
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
                    <label
                      className={`mr-10 py-3 px-3`}
                    >
                      <Field
                        type="radio"
                        name="status"
                        value={true}
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
                  <ErrorMessage name="description" component="div" className="text-red-500" />
                </div>

                <div className="flex mt-10 col-span-2">
                  <button
                    type="submit"
                    className="text-white bg-[#6FBC44] font-bold shadow-md hover:shadow-lg hover:bg-[#5da639] py-3 px-6 rounded mr-10"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="text-black bg-[#D5DCD0] font-bold shadow-md hover:shadow-lg hover:bg-gray-400 py-3 px-6 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default DetailSettingForm;
