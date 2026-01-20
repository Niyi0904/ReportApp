export interface SoulInput {
  name: string;
  phone?: string;
  address?: string;
  status: "saved" | "saved and filled" | "filled",
  gender: "male" | "female",
  notes?: string,
};

export interface EvangelismFormValues {
  evangelismDate: Date;
  souls: SoulInput[];
};

export interface Soul {
  id: string;
  name: string;
  phone?: string;
  address?: string;
  evangelizedAt?: Date;
  gender: "male" | "female";
  status: "saved" | "saved and filled" | "filled";
  notes?: string;
  createdAt: Date
}

export interface Evangelism {
  id: string;
  evangelismDate: Date;
  monthKey: string;
  souls: Soul[];
}

export type UpdateSoulPayload = Partial<Omit<Soul, "id" | "createdAt">>;
