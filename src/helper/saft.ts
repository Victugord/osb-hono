import { z } from "zod";

const HeaderSchema = z.object({
  AuditFileVersion: z.string(),
  TaxRegistrationNumber: z.string(),
  CurrencyCode: z.string(),
  StartDate: z.string(),
  EndDate: z.string(),
  FiscalYear: z.string(),
});

const AccountSchema = z.object({
  AccountID: z.string(),
  GroupingCode: z.string().optional().default(""),
  TaxonomyCode: z.string().optional().default("0"),
  GroupingCategory: z.string(),
  AccountDescription: z.string(),
  ClosingDebitBalance: z.string(),
  OpeningDebitBalance: z.string(),
  ClosingCreditBalance: z.string(),
  OpeningCreditBalance: z.string(),
});

const GeneralLedgerAccountsSchema = z.object({
  TaxonomyReference: z.string(),
  Account: z.array(AccountSchema),
});

const MasterFilesSchema = z.object({
  GeneralLedgerAccounts: GeneralLedgerAccountsSchema,
});

const GeneralLedgerEntriesSchema = z.object({
  Journal: z.array(
    z.object({
      Transaction: z
        .array(
          z.object({
            TransactionID: z.string(),
            TransactionType: z.string(),
            TransactionDate: z.string(),
            GLPostingDate: z.string(),
            Lines: z.object({
              DebitLine: z.array(
                z.object({
                  AccountID: z.string(),
                  DebitAmount: z.string(),
                  Description: z.string(),
                })
              ),
              CreditLine: z.array(
                z.object({
                  AccountID: z.string(),
                  CreditAmount: z.string(),
                  Description: z.string(),
                })
              ),
            }),
          })
        )
        .optional(),
    })
  ),
});
const AuditFileSchema = z.object({
  Header: HeaderSchema,
  GeneralLedgerEntries: GeneralLedgerEntriesSchema,
  MasterFiles: MasterFilesSchema,
});
export const AccountinSaftSchema = z
  .object({
    "?xml": z.string(),
    AuditFile: AuditFileSchema,
  })
  .strict();
export type AccountinSaft = z.infer<typeof AccountinSaftSchema>;