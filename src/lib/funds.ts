import { funds } from "@/config/funds";

/** Firm-wide totals, summed from the funds in `src/config/funds.ts`. */
export const fundTotals = () => ({
  capital: funds.reduce((sum, fund) => sum + fund.size, 0),
  funds: funds.length,
  companies: funds.reduce((sum, fund) => sum + fund.companies, 0),
  exits: funds.reduce((sum, fund) => sum + fund.exits, 0),
  largest: Math.max(...funds.map((fund) => fund.size)),
  since: Math.min(...funds.map((fund) => fund.vintage)),
});
