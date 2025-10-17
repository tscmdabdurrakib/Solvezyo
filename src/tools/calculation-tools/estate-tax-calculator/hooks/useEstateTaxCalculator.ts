import { useState, useMemo } from 'react';
import { calculateEstateTax } from '../utils/calculation';

export const useEstateTaxCalculator = () => {
  const [financialAssets, setFinancialAssets] = useState('');
  const [realEstate, setRealEstate] = useState('');
  const [personalProperty, setPersonalProperty] = useState('');
  const [businessInterests, setBusinessInterests] = useState('');
  const [lifeInsurance, setLifeInsurance] = useState('');
  const [totalLiabilities, setTotalLiabilities] = useState('');
  const [administrativeExpenses, setAdministrativeExpenses] = useState('');
  const [charitableBequests, setCharitableBequests] = useState('');
  const [maritalDeduction, setMaritalDeduction] = useState('');
  const [exemptionLimit, setExemptionLimit] = useState('13610000'); // Default to $13.61 million

  const grossEstate = useMemo(() => {
    return (
      parseFloat(financialAssets || '0') +
      parseFloat(realEstate || '0') +
      parseFloat(personalProperty || '0') +
      parseFloat(businessInterests || '0') +
      parseFloat(lifeInsurance || '0')
    );
  }, [financialAssets, realEstate, personalProperty, businessInterests, lifeInsurance]);

  const totalDeductions = useMemo(() => {
    return (
      parseFloat(totalLiabilities || '0') +
      parseFloat(administrativeExpenses || '0') +
      parseFloat(charitableBequests || '0') +
      parseFloat(maritalDeduction || '0')
    );
  }, [totalLiabilities, administrativeExpenses, charitableBequests, maritalDeduction]);

  const taxableEstate = useMemo(() => {
    const netEstate = grossEstate - totalDeductions;
    const exemption = parseFloat(exemptionLimit || '0');
    return Math.max(0, netEstate - exemption);
  }, [grossEstate, totalDeductions, exemptionLimit]);

  const { estimatedTax, netInheritance } = useMemo(() => {
    return calculateEstateTax(taxableEstate, grossEstate, totalDeductions);
  }, [taxableEstate, grossEstate, totalDeductions]);

  return {
    financialAssets, setFinancialAssets,
    realEstate, setRealEstate,
    personalProperty, setPersonalProperty,
    businessInterests, setBusinessInterests,
    lifeInsurance, setLifeInsurance,
    totalLiabilities, setTotalLiabilities,
    administrativeExpenses, setAdministrativeExpenses,
    charitableBequests, setCharitableBequests,
    maritalDeduction, setMaritalDeduction,
    exemptionLimit, setExemptionLimit,
    grossEstate,
    totalDeductions,
    taxableEstate,
    estimatedTax,
    netInheritance,
  };
};