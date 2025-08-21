import { ENV, Env } from "@/configs/env.config"

export const adamIdlDevnet = {
  address: "7uUdFXs1wXgAR2j9wTNrEaSYdXr4Vt6TZdnEPRSSTEiZ",
  metadata: {
    name: "adam",
    version: "0.1.0",
    spec: "0.1.0",
    description: "Created with Anchor",
  },
  instructions: [
    {
      name: "claim_usdc",
      discriminator: [43, 131, 9, 102, 229, 140, 91, 141],
      accounts: [
        {
          name: "user",
          writable: true,
          signer: true,
        },
        {
          name: "user_claim_info",
          writable: true,
        },
        {
          name: "token_mint",
        },
        {
          name: "vault",
        },
        {
          name: "vault_token_account",
          writable: true,
        },
        {
          name: "user_token_account",
          writable: true,
        },
        {
          name: "ix_sysvar",
        },
        {
          name: "token_program",
        },
        {
          name: "associated_token_program",
        },
        {
          name: "system_program",
        },
      ],
      args: [
        {
          name: "claim_id",
          type: "u64",
        },
        {
          name: "user_id",
          type: "u64",
        },
        {
          name: "expire_time",
          type: "u64",
        },
        {
          name: "sig",
          type: {
            array: ["u8", 64],
          },
        },
        {
          name: "recovery_id",
          type: "u8",
        },
        {
          name: "amount",
          type: "string",
        },
      ],
    },
    {
      name: "create_vault_usdc",
      discriminator: [238, 110, 159, 237, 109, 136, 8, 140],
      accounts: [
        {
          name: "admin",
          writable: true,
          signer: true,
        },
        {
          name: "vault",
          writable: true,
        },
        {
          name: "token_mint",
        },
        {
          name: "vault_token_account",
          writable: true,
        },
        {
          name: "associated_token_program",
        },
        {
          name: "token_program",
        },
        {
          name: "system_program",
        },
      ],
      args: [],
    },
    {
      name: "withdraw_vault",
      discriminator: [135, 7, 237, 120, 149, 94, 95, 7],
      accounts: [
        {
          name: "admin",
          writable: true,
          signer: true,
        },
        {
          name: "vault",
        },
        {
          name: "token_mint",
        },
        {
          name: "vault_token_account",
          writable: true,
        },
        {
          name: "admin_token_account",
          writable: true,
        },
        {
          name: "associated_token_program",
        },
        {
          name: "token_program",
        },
        {
          name: "system_program",
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: "UserClaimInfo",
      discriminator: [105, 24, 201, 165, 120, 149, 204, 94],
    },
    {
      name: "VaultUSDC",
      discriminator: [102, 80, 106, 108, 200, 129, 237, 104],
    },
  ],
  errors: [
    {
      code: 6000,
      name: "AlreadyClaimed",
      msg: "User already claimed!",
    },
    {
      code: 6001,
      name: "ExpiredClaim",
      msg: "Claim expired!",
    },
    {
      code: 6002,
      name: "InvalidAmount",
      msg: "Invalid amount!",
    },
    {
      code: 6003,
      name: "InvalidMint",
      msg: "Invalid mint",
    },
    {
      code: 6004,
      name: "UnauthorizedAccess",
      msg: "Unauthorized access!",
    },
    {
      code: 6005,
      name: "InsufficientVaultBalance",
      msg: "Insufficient vault balance",
    },
  ],
  types: [
    {
      name: "UserClaimInfo",
      type: {
        kind: "struct",
        fields: [
          {
            name: "has_claimed",
            type: "bool",
          },
        ],
      },
    },
    {
      name: "VaultUSDC",
      type: {
        kind: "struct",
        fields: [
          {
            name: "authority",
            type: "pubkey",
          },
          {
            name: "bump",
            type: "u8",
          },
        ],
      },
    },
  ],
}

export const adamIdlMainnet = {
  address: "8iy6MJcW5ZsTRmqDoaDa3TuwfbYMr592NtfNj2uVW6rn",
  metadata: {
    name: "adam",
    version: "0.1.0",
    spec: "0.1.0",
    description: "Created with Anchor",
  },
  instructions: [
    {
      name: "claim_usdc",
      discriminator: [43, 131, 9, 102, 229, 140, 91, 141],
      accounts: [
        {
          name: "user",
          writable: true,
          signer: true,
        },
        {
          name: "user_claim_info",
          writable: true,
        },
        {
          name: "token_mint",
        },
        {
          name: "vault",
        },
        {
          name: "vault_token_account",
          writable: true,
        },
        {
          name: "user_token_account",
          writable: true,
        },
        {
          name: "ix_sysvar",
        },
        {
          name: "token_program",
        },
        {
          name: "associated_token_program",
        },
        {
          name: "system_program",
        },
      ],
      args: [
        {
          name: "claim_id",
          type: "u64",
        },
        {
          name: "user_id",
          type: "u64",
        },
        {
          name: "expire_time",
          type: "u64",
        },
        {
          name: "sig",
          type: {
            array: ["u8", 64],
          },
        },
        {
          name: "recovery_id",
          type: "u8",
        },
        {
          name: "amount",
          type: "string",
        },
      ],
    },
    {
      name: "create_vault_usdc",
      discriminator: [238, 110, 159, 237, 109, 136, 8, 140],
      accounts: [
        {
          name: "admin",
          writable: true,
          signer: true,
        },
        {
          name: "vault",
          writable: true,
        },
        {
          name: "token_mint",
        },
        {
          name: "vault_token_account",
          writable: true,
        },
        {
          name: "associated_token_program",
        },
        {
          name: "token_program",
        },
        {
          name: "system_program",
        },
      ],
      args: [],
    },
    {
      name: "withdraw_vault",
      discriminator: [135, 7, 237, 120, 149, 94, 95, 7],
      accounts: [
        {
          name: "admin",
          writable: true,
          signer: true,
        },
        {
          name: "vault",
        },
        {
          name: "token_mint",
        },
        {
          name: "vault_token_account",
          writable: true,
        },
        {
          name: "admin_token_account",
          writable: true,
        },
        {
          name: "associated_token_program",
        },
        {
          name: "token_program",
        },
        {
          name: "system_program",
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: "UserClaimInfo",
      discriminator: [105, 24, 201, 165, 120, 149, 204, 94],
    },
    {
      name: "VaultUSDC",
      discriminator: [102, 80, 106, 108, 200, 129, 237, 104],
    },
  ],
  errors: [
    {
      code: 6000,
      name: "AlreadyClaimed",
      msg: "User already claimed!",
    },
    {
      code: 6001,
      name: "ExpiredClaim",
      msg: "Claim expired!",
    },
    {
      code: 6002,
      name: "InvalidAmount",
      msg: "Invalid amount!",
    },
    {
      code: 6003,
      name: "InvalidMint",
      msg: "Invalid mint",
    },
    {
      code: 6004,
      name: "UnauthorizedAccess",
      msg: "Unauthorized access!",
    },
    {
      code: 6005,
      name: "InsufficientVaultBalance",
      msg: "Insufficient vault balance",
    },
  ],
  types: [
    {
      name: "UserClaimInfo",
      type: {
        kind: "struct",
        fields: [
          {
            name: "has_claimed",
            type: "bool",
          },
        ],
      },
    },
    {
      name: "VaultUSDC",
      type: {
        kind: "struct",
        fields: [
          {
            name: "authority",
            type: "pubkey",
          },
          {
            name: "bump",
            type: "u8",
          },
        ],
      },
    },
  ],
}

export const adamIdlConfigs = {
  [Env.development]: adamIdlDevnet,
  [Env.staging]: adamIdlDevnet,
  [Env.production]: adamIdlMainnet,
}

export const adamIdl = adamIdlConfigs[ENV]
