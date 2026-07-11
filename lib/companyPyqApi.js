import { api } from "./axios";

export const createCompanyPyq = async (pyqData) => {
  const res = await api.post("/company-pyq/create-pyq", pyqData);
  return res.data;
};

export const getCompanyPyqs = async (companyId) => {
  const res = await api.get(`/company-pyq/${companyId}`);
  return res.data;
};

export const getCompanyPyqById = async (pyqId) => {
  const res = await api.get(`/company-pyq/me/${pyqId}`);
  return res.data;
};

export const updateCompanyPyq = async (pyqId, data) => {
  const res = await api.patch(`/company-pyq/update/${pyqId}`, data);
  return res.data;
};

export const deleteCompanyPyq = async (pyqId) => {
  const res = await api.delete(`/company-pyq/delete/${pyqId}`);
  return res.data;
};