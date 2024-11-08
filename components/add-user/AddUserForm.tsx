"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { Home, Users, BookOpen, Settings, LogOut } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

const ViewUserListForm: React.FC = () => {
  const options = [
    { Label: "System Admin", Value: "ROLE_ADMIN" },
    { Label: "Coordinator", Value: "ROLE_COORDINATOR" },
    { Label: "Class Admin", Value: "ROLE_CLASS_ADMIN" },
    { Label: "Trainer", Value: "ROLE_TRAINER" },
    { Label: "Trainee", Value: "ROLE_TRAINEE" },
  ];

  const allowedRoles = options.map(option => option.Value);
  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    account: Yup.string().required("Account is required"),
    password: Yup.string().required("Password is required"),
    roles: Yup.string().oneOf(allowedRoles, "Role is required").required("Role is required"),
    phone: Yup.string().required("Phone number is required"),
  });

  const initialValues = {
    fullName: "",
    email: "",
    account: "",
    password: "",
    roles: "",
    phone: "",
  };
  const router = useRouter();

  const handleSubmit = async (values: typeof initialValues) => {
    console.log("Form data:", values);

    const token = localStorage.getItem("jwtToken");
    if (!token) {
      router.push("/authen/login");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/v1/user/management/add", 
        {
          ...values,
          roles: [values.roles],
        }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        router.push("/feature/view-user-list");
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
      alert("Failed to submit form data. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-[228px] bg-[#6FBC44] fixed h-screen">
        <div className="p-10">
          <Image
            src="/assets/images/fpt-logo.png"
            alt="FPT Logo"
            width={150}
            height={50}
            className="mb-8"
          />
        </div>

        <nav className="text-white">
          <a href="#" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
            <Home className="w-6 h-6 mr-4" />
            <span className="font-bold">Home</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
            <Users className="w-6 h-6 mr-4" />
            <span className="font-bold">User Management</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
            <BookOpen className="w-6 h-6 mr-4" />
            <span className="font-bold">Course Management</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 mt-60 hover:bg-[#5da639]">
            <Settings className="w-6 h-6 mr-4" />
            <span className="font-bold">Setting</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
            <LogOut className="w-6 h-6 mr-4" />
            <span className="font-bold">Sign out</span>
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-[228px] bg-[#EFF5EB] p-24">
        <div className="flex justify-between items-center p-8 border-b">
          <h2 className="text-4xl font-bold">Add New User</h2>
        </div>
        <div className="bg-white rounded-[40px] p-8 max-w-[1200px] mx-auto">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="grid grid-cols-2 gap-6" autoComplete="off">
                <div className="mb-6">
                  <label className="block font-bold mb-1">Full Name</label>
                  <Field
                    autoComplete="off"
                    name="fullName"
                    placeholder="Input your name"
                    className="w-full p-2 border border-gray-700 rounded"
                  />
                  <ErrorMessage name="fullName" component="div" className="text-red-500" />
                </div>

                <div className="mb-6">
                  <label className="block font-bold mb-1">Email</label>
                  <Field
                    autoComplete="off"
                    name="email"
                    type="email"
                    placeholder="Template@gmail.com"
                    className="w-full p-2 border border-gray-700 rounded"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500" />
                </div>

                <div className="mb-6">
                  <label className="block font-bold mb-1">Account</label>
                  <Field
                    autoComplete="new-password"
                    name="account"
                    placeholder="Input Account"
                    className="w-full p-2 border border-gray-700 rounded"
                  />
                  <ErrorMessage name="account" component="div" className="text-red-500" />
                </div>

                <div className="mb-6">
                  <label className="block font-bold mb-1">Password</label>
                  <Field
                    autoComplete="new-password"
                    name="password"
                    type="password"
                    placeholder="Input Password"
                    className="w-full p-2 border border-gray-700 rounded"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500" />
                </div>

                <div className="mb-6">
                  <label className="block font-bold mb-1">Role</label>
                  <Field
                    autoComplete="off"
                    as="select"
                    name="roles"
                    className="w-full p-2.5 border border-gray-700 rounded"
                  >
                    <option value="" label="Select a role" />
                    {options.map((option) => (
                      <option key={option.Value} value={option.Value}>
                        {option.Label}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="role" component="div" className="text-red-500" />
                </div>

                <div className="mb-6">
                  <label className="block font-bold mb-1">phone</label>
                  <Field
                    autoComplete="off"
                    name="phone"
                    placeholder="Input phone"
                    className="w-full p-2 border border-gray-700 rounded"
                  />
                  <ErrorMessage name="phone" component="div" className="text-red-500" />
                </div>

                <div className="flex mt-2 flex-col">
                  <p className="mb-3">
                    Import a list?{" "}
                    <a href="#" className="text-green-600">
                      Click to download
                    </a>
                  </p>

                  <div>
                    <button
                      type="submit"
                      className="text-white bg-[#6FBC44] font-bold shadow-md hover:shadow-lg hover:bg-[#5da639] py-3 px-6 rounded mr-10"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="text-black bg-[#D5DCD0] font-bold shadow-md hover:shadow-lg hover:bg-gray-400 py-3 px-6 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
               
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ViewUserListForm;
