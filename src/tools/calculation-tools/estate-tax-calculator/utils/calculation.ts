export const calculateEstateTax = (taxableEstate: number, grossEstate: number, totalDeductions: number) => {
  let tax = 0;

  if (taxableEstate > 1000000) {
    tax += (taxableEstate - 1000000) * 0.40;
  }
  if (taxableEstate > 750000) {
    tax += (Math.min(taxableEstate, 1000000) - 750000) * 0.37;
  }
  if (taxableEstate > 500000) {
    tax += (Math.min(taxableEstate, 750000) - 500000) * 0.34;
  }
  if (taxableEstate > 250000) {
    tax += (Math.min(taxableEstate, 500000) - 250000) * 0.32;
  }
  if (taxableEstate > 100000) {
    tax += (Math.min(taxableEstate, 250000) - 100000) * 0.30;
  }
  if (taxableEstate > 50000) {
    tax += (Math.min(taxableEstate, 100000) - 50000) * 0.28;
  }
  if (taxableEstate > 25000) {
    tax += (Math.min(taxableEstate, 50000) - 25000) * 0.26;
  }
  if (taxableEstate > 10000) {
    tax += (Math.min(taxableEstate, 25000) - 10000) * 0.24;
  }
  if (taxableEstate > 0) {
    tax += Math.min(taxableEstate, 10000) * 0.20;
  }

  const estimatedTax = tax;
  const netInheritance = grossEstate - totalDeductions - estimatedTax;

  return {
    estimatedTax: parseFloat(estimatedTax.toFixed(2)),
    netInheritance: parseFloat(netInheritance.toFixed(2)),
  };
};