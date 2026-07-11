import { api } from "./axios";

export const getCompanies = async () => {
  const res = await api.get("/company/me");
  return res.data;
};

export const getCompanyById = async (companyId) => {
  const res = await api.get(`/company/me/${companyId}`);
  return res.data;
};

export const createCompany = async (formData) => {
  const res = await api.post(
    "/company/create-company",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};