'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Select from 'react-select';

import axios from 'axios';

import { handleRequest } from '../utils/apiRequest';

import { CompanyType } from '@/type.d';
import { BASE_API_URL } from '@/server';

const ShareStory = () => {
  //state variables
  const [isLoading, setIsLoading] = useState(false);
  const [companies, setCompanies] = useState<CompanyType[]>([]);

  //formdata for backend request
  const [formData, setFormData] = useState({
    vibe: 'neutral',
    companyName: '',
    isAnonymous: false,
    name: '',
    userType: '',
    title: '',
    story: '',
  });

  //router instance
  const router = useRouter();

  //prepare company options for select dropdown
  const companyOptions = companies.map((c) => ({
    value: c.name,
    label: c.name,
  }));

  //vibe options for select dropdown
  const vibeOptions = [
    { value: 'positive', label: 'Positive' },
    { value: 'neutral', label: 'Neutral' },
    { value: 'negative', label: 'Negative' },
  ];

  //user type options for select dropdown
  const userTypeOptions = [
    { value: 'individual customer', label: 'Individual Customer' },
    { value: 'business customer', label: 'Business Customer' },
    { value: 'bank employee', label: 'Bank Employee' },
    { value: 'former employee', label: 'Former Employee' },
    { value: 'investor', label: 'Investor' },
    { value: 'other', label: 'Other' },
  ];

  //fetch companise from backend
  useEffect(() => {
    const fetchCompanies = async () => {
      const companyReq = async () =>
        await axios.get(`${BASE_API_URL}/companies/all`);
      const result = await handleRequest(companyReq, setIsLoading);

      if (result?.data.status === 'success') {
        setCompanies(result.data.data.companies);
      }
    };

    fetchCompanies();
  }, []);

  console.log('COMPANIES', companies);

  return <div></div>;
};

export default ShareStory;
