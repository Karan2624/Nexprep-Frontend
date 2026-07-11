import { api } from "./axios";

export const createCompanyReview = async (reviewData) => {
  const res = await api.post("/company-review", reviewData);
  return res.data;
};

export const getReviewsByCompany = async (companyId) => {
  const res = await api.get(`/company-review/company/${companyId}`);
  return res.data;
};
export const getCompanyReviewById = async (reviewId) => {
    const res = await api.get(`/company-review/${reviewId}`);
    return res.data;
  };