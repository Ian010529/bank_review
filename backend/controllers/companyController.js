const Company = require("../model/companyModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllCompanies = catchAsync(async (req, res, next) => {
  const companies = await Company.find().sort({ name: 1 });

  res.status(200).json({
    status: "success",
    results: companies.length,
    data: {
      companies,
    },
  });
});

exports.getAllCompaniesTotalStats = catchAsync(async (req, res, next) => {
  const companies = await Company.find();

  const totalCompanies = companies.length;

  const totalReviews = companies.reduce(
    (acc, company) => acc + (company.totalReviews || 0),
    0
  );

  const totalComplaints = companies.reduce(
    (acc, company) => acc + (company.negativeCount || 0),
    0
  );

  const averageComplaintRate =
    totalReviews === 0
      ? 0
      : ((totalComplaints / totalReviews) * 100).toFixed(2);

  const stats = {
    totalCompanies,
    totalReviews,
    averageComplaintRate: Number(averageComplaintRate),
  };

  res.status(200).json({
    status: "success",
    data: {
      stats,
    },
  });
});

exports.getAllCompaniesAllStats = catchAsync(async (req, res, next) => {
  const { sort, page = 1, limit = 10, search = "" } = req.query;
  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);
  const skip = (pageNumber - 1) * limitNumber;

  let getAllCompanies = await Company.find({
    name: { $regex: search, $options: "i" },
  }).lean();

  allCompanies = getAllCompanies.map((company) => {
    const { negativeCount, totalReviews } = company;
    const complaintRate =
      totalReviews === 0
        ? 0
        : parseFloat(((negativeCount / totalReviews) * 100).toFixed(2));
    return { ...company, complaintRate };
  });

  switch (sort) {
    case "reviews_asc":
      allCompanies.sort((a, b) => a.totalReviews - b.totalReviews);
      break;
    case "reviews_desc":
      allCompanies.sort((a, b) => b.totalReviews - a.totalReviews);
      break;
    case "complaint_asc":
      allCompanies.sort((a, b) => a.complaintRate - b.complaintRate);
      break;
    case "complaint_desc":
      allCompanies.sort((a, b) => b.complaintRate - a.complaintRate);
      break;
    default:
      allCompanies.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      break;
  }

  const totalCompanies = allCompanies.length;
  const totalPages = Math.ceil(totalCompanies / limitNumber);

  const paginatedCompanies = allCompanies.slice(skip, skip + limitNumber);

  res.status(200).json({
    status: "success",
    totalCompanies,
    totalPages,
    currentPage: pageNumber,
    count: paginatedCompanies.length,
    data: {
      companies: paginatedCompanies,
    },
  });
});

exports.getCompaniesById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const company = await Company.findById(id)
    .populate({
      path: "reviews",
    })
    .lean();

  if (!company) {
    return next(new AppError("Company not found", 404));
  }

  const { negativeCount, totalReviews } = company;

  const complaintRate =
    totalReviews === 0
      ? 0
      : parseFloat(((negativeCount / totalReviews) * 100).toFixed(2));

  const companyWithStats = {
    ...company,
    complaintRate,
  };
  res.status(200).json({
    status: "success",
    message: "Company fetched successfully",
    data: {
      company: companyWithStats,
    },
  });
});
