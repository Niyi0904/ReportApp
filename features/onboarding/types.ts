export interface OnboardUserPayload {
  email: string;
  profile: {
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    gender: "male" | "female";
    dateOfBirth: Date | null;
    churchBranch: string;
    cell: string;
    prayerGroup: string;
    dateJoined: Date | null;
    photoUrl: File | null;
    maritalStatus: string;
    employmentStatus: string;
    discipledBy: {
      uid: string | null;
      name: string;
    };
  };
}
