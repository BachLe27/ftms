"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getJwtToken } from "@/lib/utils";
import axios from "axios";
import { BASE_API_URL } from "@/config/constant";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Trash2 } from "lucide-react";
import { FormError } from "../custom/form-error";

interface Subject {
  code: string;
  weight: number;
  subjectId?: number;
  subjectCode?: string;
}

const AddCurriculumForm: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [allSubjects, setAllSubjects] = useState<Subject[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchSubjects = async () => {
    const token = getJwtToken();
    if (!token) {
      router.push("/authen/login");
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_API_URL}/subject/search`,
        { page: 0, size: 100, orderBy: 'id', sortDirection: 'asc' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAllSubjects(response.data.data.dataSource || []);
    } catch (err) {
      setError("Error fetching subjects.");
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        router.push("/authen/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const validationSchema = Yup.object({
    curriculumName: Yup.string().required("Curriculum Name is required"),
    status: Yup.boolean().required("Status is required"),
    descriptions: Yup.string().optional(),
    subjects: Yup.array()
      .of(
        Yup.object({
          code: Yup.string().required("Subject code is required"),
          weight: Yup.number()
            .min(1, "Weight must be greater than 0")
            .required("Weight is required"),
        })
      )
      .test(
        "total-weight",
        "Total weight must equal 100",
        (subjects) => {
          const totalWeight = subjects?.reduce((sum, subject) => sum + (subject.weight || 0), 0);
          return totalWeight === 100;
        }
      ),
  });

  const handleSubmit = async (values: any) => {
    const token = getJwtToken();
    if (!token) {
      router.push("/authen/login");
      return;
    }
    try {
      setLoading(true);
      const normalizedSubjects = values.subjects.map((subject: any) => ({
        ...subject,
        percentage: subject.weight / 100,
      }));

      await axios.post(
        `${BASE_API_URL}/curriculums/create`,
        {
          curriculumName: values.curriculumName,
          status: values.status,
          descriptions: values.descriptions,
          subjectList: normalizedSubjects,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      router.push("/feature/view-curriculum-list");
    } catch (err) {
      setError("Error creating curriculum.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 ml-[228px] bg-[#EFF5EB] p-24 min-h-screen">
      <div className="flex justify-between items-center p-8">
        <h2 className="text-4xl font-bold">Add New Curriculum</h2>
      </div>
      {error &&
        <FormError message={error} />
      }
      <div className="bg-white rounded-[40px] p-12 mx-auto">
        <Formik
          initialValues={{
            curriculumName: "",
            status: true,
            descriptions: "",
            subjects: [{ code: "", weight: 0 }],
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, errors }) => (
            <Form className="grid grid-cols-2 gap-x-16 gap-y-8">
              <div>
                <label className="block font-bold text-3xl mb-2">Curriculum Name*</label>
                <Field
                  name="curriculumName"
                  placeholder="Input Curriculum Name"
                  className="p-2.5 w-full border border-[#D4CBCB] h-11 rounded"
                />
                <ErrorMessage name="curriculumName" component="div" className="text-red-500" />
              </div>

              <div>
                <label className="block font-bold text-3xl mb-2">Status</label>
                <div className="flex items-center space-x-4 mt-2">
                  <label className="flex items-center">
                    <Field
                      type="radio"
                      name="status"
                      value="true"
                      checked={values.status === true}
                      onChange={() => setFieldValue("status", true)}
                      className="w-6 h-6 mr-2"
                    />
                    <span className="text-2xl">Active</span>
                  </label>
                  <label className="flex items-center">
                    <Field
                      type="radio"
                      name="status"
                      value="false"
                      checked={values.status === false}
                      onChange={() => setFieldValue("status", false)}
                      className="w-6 h-6 mr-2"
                    />
                    <span className="text-2xl">Inactive</span>
                  </label>
                </div>
                <ErrorMessage name="status" component="div" className="text-red-500" />
              </div>

              <div>
                <label className="block font-bold text-3xl mb-2">Description</label>
                <Field
                  as="textarea"
                  name="descriptions"
                  placeholder="Input Description"
                  className="p-2.5 w-full border border-[#D4CBCB] h-20 rounded"
                />
                <ErrorMessage name="descriptions" component="div" className="text-red-500" />
              </div>

              <div>
                <label className="block font-bold text-3xl mb-2">Subject List</label>
                <FieldArray name="subjects">
                  {({ remove, push }) => (
                    <div>
                      <table className="w-full border border-[#D4CBCB] text-center">
                        <thead>
                          <tr className="bg-[#6FBC44] text-white">
                            <th className="px-4 py-3 uppercase tracking-wider">Subject Code</th>
                            <th className="px-4 py-3 uppercase tracking-wider">Weight(%)</th>
                            <th className="px-4 py-3 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {values.subjects.map((subject, index) => {
                            const selectedCodes = values.subjects.map((s) => s.code);
                            const availableSubjects = allSubjects.filter(
                              subj => subj.subjectCode === subject.code || !selectedCodes.includes(subj.subjectCode)
                            );

                            return (
                              <tr key={index} className="border-b border-[#D4CBCB]">
                                <td className="px-4 py-2">
                                  <Field
                                    as="select"
                                    name={`subjects[${index}].code`}
                                    className="w-full p-2 border border-[#D4CBCB] rounded focus:outline-none"
                                  >
                                    <option value="">Select Subject</option>
                                    {availableSubjects.map((subj) => (
                                      <option key={subj.subjectId} value={subj.subjectCode}>
                                        {subj.subjectCode}
                                      </option>
                                    ))}
                                  </Field>
                                  <ErrorMessage
                                    name={`subjects[${index}].code`}
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                  />
                                </td>
                                <td className="px-4 py-2">
                                  <Field
                                    name={`subjects[${index}].weight`}
                                    type="number"
                                    className="w-full p-2 border border-[#D4CBCB] rounded focus:outline-none"
                                  />
                                  <ErrorMessage
                                    name={`subjects[${index}].weight`}
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                  />
                                </td>
                                <td className="px-4 py-2">
                                  <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <Trash2 className="w-6 h-6" />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      {errors.subjects && typeof errors.subjects === "string" && (
                        <div className="text-red-500 text-center mt-2">
                          {errors.subjects}
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => push({ code: "", weight: 0 })}
                        className="mt-4 bg-[#6FBC44] text-white font-bold py-2 px-4 rounded shadow-md hover:shadow-lg hover:bg-[#5da639]"
                      >
                        + Add Subject
                      </button>
                    </div>
                  )}
                </FieldArray>
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
      </div>
    </div>
  );
};

export default AddCurriculumForm;
