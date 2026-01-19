export interface DiscipleInput {
  discipleName: string;
  topic: string;
  duration: string;
  status: "receptive" | "non-receptive"
  gender: "male" | "female",
  notes?: string,
};

export interface FollowUpFormValues {
  followUpDate: Date;
  disciples: DiscipleInput[];
};

export interface FollowUp {
  id: string;
  monthKey: string;
  userId: string
  followUpDate: Date,
  discipleName: string;
  topic: string;
  duration: string;
  gender: "male" | "female";
  status: "receptive" | "non-receptive"
  notes?: string;
  createdAt: Date
}


export type UpdateFollowUpPayload = Partial<Omit<FollowUp, "id" | "createdAt" | "userId" | "monthKey">>;
